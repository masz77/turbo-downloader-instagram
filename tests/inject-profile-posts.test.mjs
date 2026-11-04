import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const injectSource = fs.readFileSync(path.join(root, "js/inject.js"), "utf8");

// Loads the real js/inject.js in a vm context with stubs for the page globals.
function loadInject({ execute = async () => ({}), claim = () => "hmac.abc" } = {}) {
  const listeners = [];
  const executeCalls = [];
  const timers = { queue: [], scheduled: 0 };
  const store = new Map();
  const sessionStorage = {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
  };
  const relayEnv = {
    getNetwork: () => ({
      execute: (params, vars, opts) => {
        executeCalls.push(vars);
        return { toPromise: () => execute(vars) };
      },
    }),
  };
  const modules = {
    PolarisRelayEnvironment: relayEnv,
    "PolarisProfilePostsQuery.graphql": { params: { name: "PolarisProfilePostsQuery" } },
    PolarisWWWClaim: { getWWWClaim: () => claim() },
    PolarisConfig: { getIGAppID: () => "1" },
  };
  const context = {
    location: { hash: "" },
    history: { pushState() {}, replaceState() {} },
    sessionStorage,
    setTimeout: (fn) => {
      timers.scheduled++;
      timers.queue.push(fn);
      return 0;
    },
    Error,
    console,
  };
  context.window = context;
  context.addEventListener = (type, fn) => {
    if (type === "message") listeners.push(fn);
  };
  context.dispatchEvent = () => true;
  context.require = (name) => modules[name] || {};
  context.Event = class {};
  context.MutationObserver = class {
    observe() {}
    disconnect() {}
  };
  context.document = {
    addEventListener() {},
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }),
    head: { appendChild() {} },
    body: { appendChild() {} },
  };
  vm.createContext(context);
  vm.runInContext(injectSource, context);
  return { listeners, executeCalls, store, timers };
}

// Sends one loadProfilePosts message and returns the single reply the port got.
async function askProfilePosts(env, data) {
  const replies = [];
  const port = { postMessage: (m) => replies.push(m) };
  for (const listener of env.listeners) {
    await listener({
      origin: "https://www.instagram.com",
      ports: [port],
      data: { procedure: "loadProfilePosts", ...data },
    });
  }
  // vm objects come from another realm; a JSON round-trip makes deepStrictEqual compare plain data.
  return JSON.parse(JSON.stringify(replies));
}

const page1 = {
  data: {
    xdt_api__v1__feed__user_timeline_graphql_connection: {
      edges: [{ node: { id: "n1" } }, { node: { id: "n2" } }],
      page_info: { end_cursor: "C1", has_next_page: true },
    },
  },
};

test("page 1 replies with nodes and page info, without an after variable", async () => {
  const env = loadInject({ execute: async () => page1 });
  const replies = await askProfilePosts(env, { username: "someone" });
  assert.deepEqual(replies, [
    {
      nodes: [{ id: "n1" }, { id: "n2" }],
      pageInfo: { endCursor: "C1", hasNextPage: true },
    },
  ]);
  assert.equal(env.executeCalls.length, 1);
  assert.equal(env.executeCalls[0].username, "someone");
  assert.equal("after" in env.executeCalls[0], false);
});

test("page 2 sends first:12 and after:<cursor> as query variables", async () => {
  const env = loadInject({ execute: async () => page1 });
  await askProfilePosts(env, { username: "someone", after: "C1" });
  assert.equal(env.executeCalls[0].first, 12);
  assert.equal(env.executeCalls[0].after, "C1");
});

test("a rejected query replies with a non-empty error", async () => {
  const env = loadInject({
    execute: async () => {
      throw new Error("network down");
    },
  });
  const replies = await askProfilePosts(env, { username: "someone" });
  assert.equal(replies.length, 1);
  assert.equal(typeof replies[0].error, "string");
  assert.notEqual(replies[0].error, "");
});

test("a GraphQL error response without data replies with a non-empty error", async () => {
  const env = loadInject({
    execute: async () => ({ errors: [{ message: "rate limited" }] }),
  });
  const replies = await askProfilePosts(env, { username: "someone" });
  assert.equal(replies.length, 1);
  assert.equal(typeof replies[0].error, "string");
  assert.notEqual(replies[0].error, "");
  assert.equal("nodes" in replies[0], false);
});

test("an invalid username replies with an error and never runs the query", async () => {
  for (const username of ["a b", "x".repeat(31), "../x", ""]) {
    const env = loadInject({ execute: async () => page1 });
    const replies = await askProfilePosts(env, { username });
    assert.equal(replies.length, 1, `reply for ${JSON.stringify(username)}`);
    assert.equal(typeof replies[0].error, "string");
    assert.equal(env.executeCalls.length, 0, `execute for ${JSON.stringify(username)}`);
  }
});

test("a null www claim is never stored as the string null", () => {
  let claim = null;
  const env = loadInject({ claim: () => claim });
  assert.equal(env.store.get("__ig_www_claim"), undefined);
  assert.notEqual(env.store.get("__ig_www_claim"), "null");
});

test("a www claim is stored once it is available", () => {
  const env = loadInject({ claim: () => "hmac.abc" });
  assert.equal(env.store.get("__ig_www_claim"), "hmac.abc");
});

test("a claim that stays null stops retrying after about 300 attempts", () => {
  let attempts = 0;
  const env = loadInject({
    claim: () => {
      attempts++;
      return null;
    },
  });
  // Fire queued timers; the cap catches an unbounded claim retry. Other inject.js retries also queue timers.
  for (let i = 0; i < 1000 && env.timers.queue.length; i++) env.timers.queue.shift()();
  assert.ok(attempts <= 301, `claim attempts ${attempts}`);
  assert.notEqual(env.store.get("__ig_www_claim"), "null");
});
