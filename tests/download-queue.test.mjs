import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const extensionSource = fs.readFileSync(path.join(root, "js/extension.js"), "utf8");

// Extracts the real `function Oe(...) {...}` source by brace matching.
function extractOe(source) {
  const start = source.indexOf("function Oe(e, n, r, o");
  if (start < 0) throw new Error("function Oe(e, n, r, o not found in js/extension.js");
  const open = source.indexOf("{", start);
  let depth = 0;
  for (let i = open; i < source.length; i++) {
    if (source[i] === "{") depth++;
    else if (source[i] === "}" && --depth === 0) return source.slice(start, i + 1);
  }
  throw new Error("unterminated function Oe in js/extension.js");
}

// Loads the real Oe in a vm context. Anchor path (r = true) is used, so `o` is never needed.
function loadOe() {
  const progress = [];
  const pageUrls = [];
  const toasts = [];
  const context = {
    // Equivalent of the __awaiter helper used in js/extension.js (line 11874).
    t: (self, _a, _b, gen) =>
      new Promise((resolve, reject) => {
        const it = gen.call(self);
        const step = (fn, arg) => {
          let res;
          try {
            res = fn.call(it, arg);
          } catch (err) {
            return reject(err);
          }
          if (res.done) return resolve(res.value);
          Promise.resolve(res.value).then((v) => step(it.next, v), (err) => step(it.throw, err));
        };
        step(it.next, undefined);
      }),
    Pe: function (url) {
      pageUrls.push(url);
      return Promise.resolve({ url });
    },
    Re: () => {},
    Me: (item) => item.id,
    Ne: function () {
      return { updateProgress: (p) => progress.push(p) };
    },
    s: { createAndAddForDownloadComplete: (...args) => toasts.push(args) },
    setTimeout,
  };
  vm.createContext(context);
  vm.runInContext(extractOe(extensionSource), context);
  return { Oe: context.Oe, progress, pageUrls, toasts };
}

const item = (id) => ({ id, url: `https://cdn.example/${id}.jpg` });
const account = { username: "someone" };
const deferred = () => {
  let resolve, reject;
  const promise = new Promise((res, rej) => ((resolve = res), (reject = rej)));
  return { promise, resolve, reject };
};

test("A: downloads items pushed while discovery is still pending", async () => {
  const { Oe, progress, pageUrls } = loadOe();
  const queue = [item(1)];
  const discovery = deferred();
  const done = Oe(queue, account, true, undefined, discovery.promise);
  await new Promise((r) => setTimeout(r, 20));
  queue.push(item(2), item(3));
  await new Promise((r) => setTimeout(r, 20));
  discovery.resolve();
  await done;

  assert.deepEqual(pageUrls, [
    "https://cdn.example/1.jpg",
    "https://cdn.example/2.jpg",
    "https://cdn.example/3.jpg",
  ]);
  const lastCalls = progress.filter((p) => p.isLast === true);
  assert.equal(lastCalls.length, 1);
  const last = progress[progress.length - 1];
  assert.equal(last.isLast, true);
  assert.equal(last.completed, 3);
  assert.equal(last.total, 3);
  assert.equal(progress[0].isFirst, true);
  assert.equal(progress[0].completed, 1);
});

test("B: control, no promise, behaves as before", async () => {
  const { Oe, progress, pageUrls } = loadOe();
  await Oe([item(1), item(2)], account, true);

  assert.equal(pageUrls.length, 2);
  const lastCalls = progress.filter((p) => p.isLast === true);
  assert.equal(lastCalls.length, 1);
  assert.equal(lastCalls[0].completed, 2);
  assert.equal(lastCalls[0].total, 2);
});

test("C: discovery ends with zero items, nothing is downloaded or toasted", async () => {
  const { Oe, progress, pageUrls, toasts } = loadOe();
  await Oe([], account, true, undefined, Promise.resolve());

  assert.equal(pageUrls.length, 0);
  assert.equal(progress.length, 0);
  assert.equal(toasts.length, 0);
});

test("D: rejected discovery still finishes downloads with one isLast", async () => {
  const { Oe, progress, pageUrls } = loadOe();
  const discovery = deferred();
  const done = Oe([item(1)], account, true, undefined, discovery.promise);
  setTimeout(() => discovery.reject(new Error("page failed")), 10);
  await done;

  assert.equal(pageUrls.length, 1);
  const lastCalls = progress.filter((p) => p.isLast === true);
  assert.equal(lastCalls.length, 1);
});
