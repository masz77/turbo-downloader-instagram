# Turbo Downloader for Instagram (privacy fork)

A fork of **Turbo Downloader for Instagram** v4.12.16. It downloads photos, videos and Reels from Instagram. This fork removes telemetry and unused code.

## Credit

All download features come from the original extension, **Turbo Downloader for Instagram**, by its original author(s).
Original author: **<ORIGINAL AUTHOR / PUBLISHER — add name and link>**.
This fork is not affiliated with or endorsed by the original author. All rights to the original code remain with them.
Bundled third-party code (React, localForage) keeps its licenses. See `js/extension.js.LICENSE.txt`.

## What changed in this fork

**Removed (privacy)**
- Sentry error reporting. The init, all `captureException`/`captureMessage` calls and the SDK are gone.
- Google Analytics. The original sent `Installed`, `Updated`, `Download`, `AccountDownload` and `InstagramVisit` events with a persistent client ID. Download events included the Instagram username and counts.
- Page-HTML capture. The original attached the full Instagram page HTML to error reports.
- `update_url` and `key` in `manifest.json`. The extension can no longer be auto-updated back to the original, and it gets its own ID.

**Smaller and faster**

| File | Before | After |
|---|---|---|
| `js/background.js` | 192 KB | 31 KB |
| `js/extension.js` | 681 KB | 510 KB |
| `js/options.js` | 437 KB | 5.5 KB |

- Dead Sentry code was pruned from `background.js` and `extension.js`. Debug-ID stubs were removed from `inject.js` and `options_listener_inject.js`.
- The React options page was replaced by static HTML plus about 100 lines of vanilla JS. It uses the same IndexedDB store and keys as before.

**Fixed / added**
- Profile post handling in `js/inject.js`, with tests in `tests/inject-profile-posts.test.mjs`.

**Kept**
- A local download counter in `storage.local`. It sends nothing out.

## Install (unpacked)

1. Open `chrome://extensions` and enable Developer mode.
2. Click **Load unpacked** and select this folder.
3. Open Instagram. Settings are at `instagram.com/#__ig_downloader_options`.

The extension ID differs from the original. Saved options and the download-folder choice start fresh.

## Test

```bash
node --test tests/inject-profile-posts.test.mjs
```
