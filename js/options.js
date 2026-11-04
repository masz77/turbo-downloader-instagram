// Options UI: static HTML + small vanilla JS (replaces the React bundle).
// why: values go into IndexedDB db "IG Downloader #<extId>", store "settings", raw key/value.
// That is the layout localForage (used by extension.js) reads, so existing settings keep working.
(() => {
  const ROOT_ID = "__ig_downloader_options_root";
  const HASH = "#__ig_downloader_options";
  const KEY_CAROUSEL = "always-show-carousel-icon";
  const KEY_DIR = "download-directory-handle";
  const STORE = "settings";

  // why: the options page must run on instagram.com; the folder handle lives in that origin's IndexedDB.
  if (location.origin.startsWith("chrome-extension://")) {
    location.href = "https://www.instagram.com/" + HASH;
    return;
  }
  if (location.hash !== HASH) return;

  const val = (id) => document.querySelector(id)?.getAttribute("value") ?? "";
  const extId = val("#extension_id");
  const version = val("#extension_version");
  const DB_NAME = "IG Downloader #" + extId;

  const openDb = () =>
    new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME);
      req.onupgradeneeded = () => {
        if (!req.result.objectStoreNames.contains(STORE))
          req.result.createObjectStore(STORE);
      };
      req.onerror = () => reject(req.error);
      req.onsuccess = () => {
        const db = req.result;
        if (db.objectStoreNames.contains(STORE)) return resolve(db);
        // DB exists without our store (created by something else): bump version to add it.
        const next = db.version + 1;
        db.close();
        const up = indexedDB.open(DB_NAME, next);
        up.onupgradeneeded = () => up.result.createObjectStore(STORE);
        up.onerror = () => reject(up.error);
        up.onsuccess = () => resolve(up.result);
      };
    });

  const run = async (mode, fn) => {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, mode);
      const req = fn(tx.objectStore(STORE));
      tx.oncomplete = () => (db.close(), resolve(req.result));
      tx.onerror = tx.onabort = () => (db.close(), reject(tx.error));
    });
  };
  const getItem = (k) => run("readonly", (s) => s.get(k));
  const setItem = (k, v) => run("readwrite", (s) => s.put(v, k));

  const root = document.getElementById(ROOT_ID);
  if (!root) return;
  root.innerHTML = `
    <div class="Container">
      ${extId ? `<img src="chrome-extension://${extId}/icons/igdl2.png" style="max-width:24px;padding:16px" />` : ""}
      <div class="Menu">
        <div class="ListItem" id="dir-item">
          <div>
            <div class="Title">Accounts download folder</div>
            <div class="Subtitle">
              <div>Account folders will be created inside this folder.</div>
              <div class="Directory" id="dir-name">Folder not set.</div>
              <div id="brave-help" hidden>
                <p>Could not browse for folder. If you are using <em>Brave</em>, please make sure the "File System Access API" experiment is <em>enabled</em> before trying again.</p>
                <div class="Button" id="brave-btn">Experiments</div>
              </div>
            </div>
          </div>
          <div class="Children"><div class="Button">Browse</div></div>
        </div>
        <div class="ListItem" id="carousel-item">
          <div>
            <div class="Title">Always show download icon in carousel</div>
            <div class="Subtitle">If this is turned off, the download icon over posts with multiple images and videos will only appear when hovering your cursor.</div>
          </div>
          <div class="Children"><div class="Toggle Active" id="toggle"><div class="Thumb"></div></div></div>
        </div>
      </div>
      <p id="changed" style="padding:0 16px" hidden>Settings changed. Refresh any relevant open tabs to use these new settings.</p>
      <p style="padding:0 16px" id="version"></p>
    </div>`;

  const $ = (id) => root.querySelector(id);
  $("#version").textContent = version;

  const setToggle = (on) => $("#toggle").classList.toggle("Active", on);
  const setDir = (h) => {
    $("#dir-name").textContent = h ? "📁" + h.name : "Folder not set.";
  };

  let carousel = true;
  Promise.all([getItem(KEY_CAROUSEL), getItem(KEY_DIR)])
    .then(([c, d]) => {
      if (c != null) carousel = c;
      setToggle(carousel);
      if (d != null) setDir(d);
    })
    .catch((e) => console.error("Turbo Downloader: failed to load settings", e));

  $("#carousel-item").onclick = async () => {
    carousel = !carousel;
    setToggle(carousel);
    $("#changed").hidden = false;
    try {
      await setItem(KEY_CAROUSEL, carousel);
    } catch (e) {
      console.error("Turbo Downloader: failed to save setting", e);
    }
  };

  $("#brave-btn").onclick = (ev) => {
    ev.stopPropagation();
    document.querySelector("#open_brave_flag_file_system_access_api_button")?.click();
  };

  $("#dir-item").onclick = async () => {
    const picker = window.showDirectoryPicker;
    try {
      const handle = await picker({ id: "__igdl", mode: "readwrite", startIn: "downloads" });
      await setItem(KEY_DIR, handle);
      setDir(handle);
      $("#brave-help").hidden = true;
    } catch (e) {
      if (e?.name === "AbortError") return; // user closed the picker
      if (typeof picker !== "function" && (await navigator.brave?.isBrave?.()))
        $("#brave-help").hidden = false;
      else console.error("Turbo Downloader: folder pick failed", e);
    }
  };
})();
