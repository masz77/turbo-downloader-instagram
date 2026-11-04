/*! For license information please see background.js.LICENSE.txt */
(() => {
    var __webpack_modules__ = {
        150: function (e, t) {
          var n, r;
          ("undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof self && self,
            (n = function (e) {
              "use strict";
              if (!globalThis.chrome?.runtime?.id)
                throw new Error(
                  "This script should only be loaded in a browser extension.",
                );
              if (
                void 0 === globalThis.browser ||
                Object.getPrototypeOf(globalThis.browser) !== Object.prototype
              ) {
                const t =
                    "The message port closed before a response was received.",
                  n = (e) => {
                    const n = {
                      alarms: {
                        clear: { minArgs: 0, maxArgs: 1 },
                        clearAll: { minArgs: 0, maxArgs: 0 },
                        get: { minArgs: 0, maxArgs: 1 },
                        getAll: { minArgs: 0, maxArgs: 0 },
                      },
                      bookmarks: {
                        create: { minArgs: 1, maxArgs: 1 },
                        get: { minArgs: 1, maxArgs: 1 },
                        getChildren: { minArgs: 1, maxArgs: 1 },
                        getRecent: { minArgs: 1, maxArgs: 1 },
                        getSubTree: { minArgs: 1, maxArgs: 1 },
                        getTree: { minArgs: 0, maxArgs: 0 },
                        move: { minArgs: 2, maxArgs: 2 },
                        remove: { minArgs: 1, maxArgs: 1 },
                        removeTree: { minArgs: 1, maxArgs: 1 },
                        search: { minArgs: 1, maxArgs: 1 },
                        update: { minArgs: 2, maxArgs: 2 },
                      },
                      browserAction: {
                        disable: {
                          minArgs: 0,
                          maxArgs: 1,
                          fallbackToNoCallback: !0,
                        },
                        enable: {
                          minArgs: 0,
                          maxArgs: 1,
                          fallbackToNoCallback: !0,
                        },
                        getBadgeBackgroundColor: { minArgs: 1, maxArgs: 1 },
                        getBadgeText: { minArgs: 1, maxArgs: 1 },
                        getPopup: { minArgs: 1, maxArgs: 1 },
                        getTitle: { minArgs: 1, maxArgs: 1 },
                        openPopup: { minArgs: 0, maxArgs: 0 },
                        setBadgeBackgroundColor: {
                          minArgs: 1,
                          maxArgs: 1,
                          fallbackToNoCallback: !0,
                        },
                        setBadgeText: {
                          minArgs: 1,
                          maxArgs: 1,
                          fallbackToNoCallback: !0,
                        },
                        setIcon: { minArgs: 1, maxArgs: 1 },
                        setPopup: {
                          minArgs: 1,
                          maxArgs: 1,
                          fallbackToNoCallback: !0,
                        },
                        setTitle: {
                          minArgs: 1,
                          maxArgs: 1,
                          fallbackToNoCallback: !0,
                        },
                      },
                      browsingData: {
                        remove: { minArgs: 2, maxArgs: 2 },
                        removeCache: { minArgs: 1, maxArgs: 1 },
                        removeCookies: { minArgs: 1, maxArgs: 1 },
                        removeDownloads: { minArgs: 1, maxArgs: 1 },
                        removeFormData: { minArgs: 1, maxArgs: 1 },
                        removeHistory: { minArgs: 1, maxArgs: 1 },
                        removeLocalStorage: { minArgs: 1, maxArgs: 1 },
                        removePasswords: { minArgs: 1, maxArgs: 1 },
                        removePluginData: { minArgs: 1, maxArgs: 1 },
                        settings: { minArgs: 0, maxArgs: 0 },
                      },
                      commands: { getAll: { minArgs: 0, maxArgs: 0 } },
                      contextMenus: {
                        remove: { minArgs: 1, maxArgs: 1 },
                        removeAll: { minArgs: 0, maxArgs: 0 },
                        update: { minArgs: 2, maxArgs: 2 },
                      },
                      cookies: {
                        get: { minArgs: 1, maxArgs: 1 },
                        getAll: { minArgs: 1, maxArgs: 1 },
                        getAllCookieStores: { minArgs: 0, maxArgs: 0 },
                        remove: { minArgs: 1, maxArgs: 1 },
                        set: { minArgs: 1, maxArgs: 1 },
                      },
                      devtools: {
                        inspectedWindow: {
                          eval: {
                            minArgs: 1,
                            maxArgs: 2,
                            singleCallbackArg: !1,
                          },
                        },
                        panels: {
                          create: {
                            minArgs: 3,
                            maxArgs: 3,
                            singleCallbackArg: !0,
                          },
                          elements: {
                            createSidebarPane: { minArgs: 1, maxArgs: 1 },
                          },
                        },
                      },
                      downloads: {
                        cancel: { minArgs: 1, maxArgs: 1 },
                        download: { minArgs: 1, maxArgs: 1 },
                        erase: { minArgs: 1, maxArgs: 1 },
                        getFileIcon: { minArgs: 1, maxArgs: 2 },
                        open: {
                          minArgs: 1,
                          maxArgs: 1,
                          fallbackToNoCallback: !0,
                        },
                        pause: { minArgs: 1, maxArgs: 1 },
                        removeFile: { minArgs: 1, maxArgs: 1 },
                        resume: { minArgs: 1, maxArgs: 1 },
                        search: { minArgs: 1, maxArgs: 1 },
                        show: {
                          minArgs: 1,
                          maxArgs: 1,
                          fallbackToNoCallback: !0,
                        },
                      },
                      extension: {
                        isAllowedFileSchemeAccess: { minArgs: 0, maxArgs: 0 },
                        isAllowedIncognitoAccess: { minArgs: 0, maxArgs: 0 },
                      },
                      history: {
                        addUrl: { minArgs: 1, maxArgs: 1 },
                        deleteAll: { minArgs: 0, maxArgs: 0 },
                        deleteRange: { minArgs: 1, maxArgs: 1 },
                        deleteUrl: { minArgs: 1, maxArgs: 1 },
                        getVisits: { minArgs: 1, maxArgs: 1 },
                        search: { minArgs: 1, maxArgs: 1 },
                      },
                      i18n: {
                        detectLanguage: { minArgs: 1, maxArgs: 1 },
                        getAcceptLanguages: { minArgs: 0, maxArgs: 0 },
                      },
                      identity: {
                        launchWebAuthFlow: { minArgs: 1, maxArgs: 1 },
                      },
                      idle: { queryState: { minArgs: 1, maxArgs: 1 } },
                      management: {
                        get: { minArgs: 1, maxArgs: 1 },
                        getAll: { minArgs: 0, maxArgs: 0 },
                        getSelf: { minArgs: 0, maxArgs: 0 },
                        setEnabled: { minArgs: 2, maxArgs: 2 },
                        uninstallSelf: { minArgs: 0, maxArgs: 1 },
                      },
                      notifications: {
                        clear: { minArgs: 1, maxArgs: 1 },
                        create: { minArgs: 1, maxArgs: 2 },
                        getAll: { minArgs: 0, maxArgs: 0 },
                        getPermissionLevel: { minArgs: 0, maxArgs: 0 },
                        update: { minArgs: 2, maxArgs: 2 },
                      },
                      pageAction: {
                        getPopup: { minArgs: 1, maxArgs: 1 },
                        getTitle: { minArgs: 1, maxArgs: 1 },
                        hide: {
                          minArgs: 1,
                          maxArgs: 1,
                          fallbackToNoCallback: !0,
                        },
                        setIcon: { minArgs: 1, maxArgs: 1 },
                        setPopup: {
                          minArgs: 1,
                          maxArgs: 1,
                          fallbackToNoCallback: !0,
                        },
                        setTitle: {
                          minArgs: 1,
                          maxArgs: 1,
                          fallbackToNoCallback: !0,
                        },
                        show: {
                          minArgs: 1,
                          maxArgs: 1,
                          fallbackToNoCallback: !0,
                        },
                      },
                      permissions: {
                        contains: { minArgs: 1, maxArgs: 1 },
                        getAll: { minArgs: 0, maxArgs: 0 },
                        remove: { minArgs: 1, maxArgs: 1 },
                        request: { minArgs: 1, maxArgs: 1 },
                      },
                      runtime: {
                        getBackgroundPage: { minArgs: 0, maxArgs: 0 },
                        getPlatformInfo: { minArgs: 0, maxArgs: 0 },
                        openOptionsPage: { minArgs: 0, maxArgs: 0 },
                        requestUpdateCheck: { minArgs: 0, maxArgs: 0 },
                        sendMessage: { minArgs: 1, maxArgs: 3 },
                        sendNativeMessage: { minArgs: 2, maxArgs: 2 },
                        setUninstallURL: { minArgs: 1, maxArgs: 1 },
                      },
                      sessions: {
                        getDevices: { minArgs: 0, maxArgs: 1 },
                        getRecentlyClosed: { minArgs: 0, maxArgs: 1 },
                        restore: { minArgs: 0, maxArgs: 1 },
                      },
                      storage: {
                        local: {
                          clear: { minArgs: 0, maxArgs: 0 },
                          get: { minArgs: 0, maxArgs: 1 },
                          getBytesInUse: { minArgs: 0, maxArgs: 1 },
                          remove: { minArgs: 1, maxArgs: 1 },
                          set: { minArgs: 1, maxArgs: 1 },
                        },
                        managed: {
                          get: { minArgs: 0, maxArgs: 1 },
                          getBytesInUse: { minArgs: 0, maxArgs: 1 },
                        },
                        sync: {
                          clear: { minArgs: 0, maxArgs: 0 },
                          get: { minArgs: 0, maxArgs: 1 },
                          getBytesInUse: { minArgs: 0, maxArgs: 1 },
                          remove: { minArgs: 1, maxArgs: 1 },
                          set: { minArgs: 1, maxArgs: 1 },
                        },
                      },
                      tabs: {
                        captureVisibleTab: { minArgs: 0, maxArgs: 2 },
                        create: { minArgs: 1, maxArgs: 1 },
                        detectLanguage: { minArgs: 0, maxArgs: 1 },
                        discard: { minArgs: 0, maxArgs: 1 },
                        duplicate: { minArgs: 1, maxArgs: 1 },
                        executeScript: { minArgs: 1, maxArgs: 2 },
                        get: { minArgs: 1, maxArgs: 1 },
                        getCurrent: { minArgs: 0, maxArgs: 0 },
                        getZoom: { minArgs: 0, maxArgs: 1 },
                        getZoomSettings: { minArgs: 0, maxArgs: 1 },
                        goBack: { minArgs: 0, maxArgs: 1 },
                        goForward: { minArgs: 0, maxArgs: 1 },
                        highlight: { minArgs: 1, maxArgs: 1 },
                        insertCSS: { minArgs: 1, maxArgs: 2 },
                        move: { minArgs: 2, maxArgs: 2 },
                        query: { minArgs: 1, maxArgs: 1 },
                        reload: { minArgs: 0, maxArgs: 2 },
                        remove: { minArgs: 1, maxArgs: 1 },
                        removeCSS: { minArgs: 1, maxArgs: 2 },
                        sendMessage: { minArgs: 2, maxArgs: 3 },
                        setZoom: { minArgs: 1, maxArgs: 2 },
                        setZoomSettings: { minArgs: 1, maxArgs: 2 },
                        update: { minArgs: 1, maxArgs: 2 },
                      },
                      topSites: { get: { minArgs: 0, maxArgs: 0 } },
                      webNavigation: {
                        getAllFrames: { minArgs: 1, maxArgs: 1 },
                        getFrame: { minArgs: 1, maxArgs: 1 },
                      },
                      webRequest: {
                        handlerBehaviorChanged: { minArgs: 0, maxArgs: 0 },
                      },
                      windows: {
                        create: { minArgs: 0, maxArgs: 1 },
                        get: { minArgs: 1, maxArgs: 2 },
                        getAll: { minArgs: 0, maxArgs: 1 },
                        getCurrent: { minArgs: 0, maxArgs: 1 },
                        getLastFocused: { minArgs: 0, maxArgs: 1 },
                        remove: { minArgs: 1, maxArgs: 1 },
                        update: { minArgs: 2, maxArgs: 2 },
                      },
                    };
                    if (0 === Object.keys(n).length)
                      throw new Error(
                        "api-metadata.json has not been included in browser-polyfill",
                      );
                    class r extends WeakMap {
                      constructor(e, t = void 0) {
                        (super(t), (this.createItem = e));
                      }
                      get(e) {
                        return (
                          this.has(e) || this.set(e, this.createItem(e)),
                          super.get(e)
                        );
                      }
                    }
                    const s =
                        (t, n) =>
                        (...r) => {
                          e.runtime.lastError
                            ? t.reject(new Error(e.runtime.lastError.message))
                            : n.singleCallbackArg ||
                                (r.length <= 1 && !1 !== n.singleCallbackArg)
                              ? t.resolve(r[0])
                              : t.resolve(r);
                        },
                      o = (e) => (1 == e ? "argument" : "arguments"),
                      i = (e, t, n) =>
                        new Proxy(t, {
                          apply: (t, r, s) => n.call(r, e, ...s),
                        });
                    let a = Function.call.bind(Object.prototype.hasOwnProperty);
                    const c = (e, t = {}, n = {}) => {
                        let r = Object.create(null),
                          u = {
                            has: (t, n) => n in e || n in r,
                            get(u, l, d) {
                              if (l in r) return r[l];
                              if (!(l in e)) return;
                              let _ = e[l];
                              if ("function" == typeof _)
                                if ("function" == typeof t[l])
                                  _ = i(e, e[l], t[l]);
                                else if (a(n, l)) {
                                  let t = ((e, t) =>
                                    function (n, ...r) {
                                      if (r.length < t.minArgs)
                                        throw new Error(
                                          `Expected at least ${t.minArgs} ${o(t.minArgs)} for ${e}(), got ${r.length}`,
                                        );
                                      if (r.length > t.maxArgs)
                                        throw new Error(
                                          `Expected at most ${t.maxArgs} ${o(t.maxArgs)} for ${e}(), got ${r.length}`,
                                        );
                                      return new Promise((o, i) => {
                                        if (t.fallbackToNoCallback)
                                          try {
                                            n[e](
                                              ...r,
                                              s({ resolve: o, reject: i }, t),
                                            );
                                          } catch (s) {
                                            (console.warn(
                                              `${e} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `,
                                              s,
                                            ),
                                              n[e](...r),
                                              (t.fallbackToNoCallback = !1),
                                              (t.noCallback = !0),
                                              o());
                                          }
                                        else
                                          t.noCallback
                                            ? (n[e](...r), o())
                                            : n[e](
                                                ...r,
                                                s({ resolve: o, reject: i }, t),
                                              );
                                      });
                                    })(l, n[l]);
                                  _ = i(e, e[l], t);
                                } else _ = _.bind(e);
                              else if (
                                "object" == typeof _ &&
                                null !== _ &&
                                (a(t, l) || a(n, l))
                              )
                                _ = c(_, t[l], n[l]);
                              else {
                                if (!a(n, "*"))
                                  return (
                                    Object.defineProperty(r, l, {
                                      configurable: !0,
                                      enumerable: !0,
                                      get: () => e[l],
                                      set(t) {
                                        e[l] = t;
                                      },
                                    }),
                                    _
                                  );
                                _ = c(_, t[l], n["*"]);
                              }
                              return ((r[l] = _), _);
                            },
                            set: (t, n, s, o) => (
                              n in r ? (r[n] = s) : (e[n] = s),
                              !0
                            ),
                            defineProperty: (e, t, n) =>
                              Reflect.defineProperty(r, t, n),
                            deleteProperty: (e, t) =>
                              Reflect.deleteProperty(r, t),
                          },
                          l = Object.create(e);
                        return new Proxy(l, u);
                      },
                      u = (e) => ({
                        addListener(t, n, ...r) {
                          t.addListener(e.get(n), ...r);
                        },
                        hasListener: (t, n) => t.hasListener(e.get(n)),
                        removeListener(t, n) {
                          t.removeListener(e.get(n));
                        },
                      }),
                      l = new r((e) =>
                        "function" != typeof e
                          ? e
                          : function (t) {
                              const n = c(
                                t,
                                {},
                                { getContent: { minArgs: 0, maxArgs: 0 } },
                              );
                              e(n);
                            },
                      ),
                      d = new r((e) =>
                        "function" != typeof e
                          ? e
                          : function (t, n, r) {
                              let s,
                                o,
                                i = !1,
                                a = new Promise((e) => {
                                  s = function (t) {
                                    ((i = !0), e(t));
                                  };
                                });
                              try {
                                o = e(t, n, s);
                              } catch (e) {
                                o = Promise.reject(e);
                              }
                              const c =
                                !0 !== o &&
                                (u = o) &&
                                "object" == typeof u &&
                                "function" == typeof u.then;
                              var u;
                              if (!0 !== o && !c && !i) return !1;
                              return (
                                (c ? o : a)
                                  .then(
                                    (e) => {
                                      r(e);
                                    },
                                    (e) => {
                                      let t;
                                      ((t =
                                        e &&
                                        (e instanceof Error ||
                                          "string" == typeof e.message)
                                          ? e.message
                                          : "An unexpected error occurred"),
                                        r({
                                          __mozWebExtensionPolyfillReject__: !0,
                                          message: t,
                                        }));
                                    },
                                  )
                                  .catch((e) => {
                                    console.error(
                                      "Failed to send onMessage rejected reply",
                                      e,
                                    );
                                  }),
                                !0
                              );
                            },
                      ),
                      _ = ({ reject: n, resolve: r }, s) => {
                        e.runtime.lastError
                          ? e.runtime.lastError.message === t
                            ? r()
                            : n(new Error(e.runtime.lastError.message))
                          : s && s.__mozWebExtensionPolyfillReject__
                            ? n(new Error(s.message))
                            : r(s);
                      },
                      h = (e, t, n, ...r) => {
                        if (r.length < t.minArgs)
                          throw new Error(
                            `Expected at least ${t.minArgs} ${o(t.minArgs)} for ${e}(), got ${r.length}`,
                          );
                        if (r.length > t.maxArgs)
                          throw new Error(
                            `Expected at most ${t.maxArgs} ${o(t.maxArgs)} for ${e}(), got ${r.length}`,
                          );
                        return new Promise((e, t) => {
                          const s = _.bind(null, { resolve: e, reject: t });
                          (r.push(s), n.sendMessage(...r));
                        });
                      },
                      p = {
                        devtools: { network: { onRequestFinished: u(l) } },
                        runtime: {
                          onMessage: u(d),
                          onMessageExternal: u(d),
                          sendMessage: h.bind(null, "sendMessage", {
                            minArgs: 1,
                            maxArgs: 3,
                          }),
                        },
                        tabs: {
                          sendMessage: h.bind(null, "sendMessage", {
                            minArgs: 2,
                            maxArgs: 3,
                          }),
                        },
                      },
                      g = {
                        clear: { minArgs: 1, maxArgs: 1 },
                        get: { minArgs: 1, maxArgs: 1 },
                        set: { minArgs: 1, maxArgs: 1 },
                      };
                    return (
                      (n.privacy = {
                        network: { "*": g },
                        services: { "*": g },
                        websites: { "*": g },
                      }),
                      c(e, p, n)
                    );
                  };
                e.exports = n(chrome);
              } else e.exports = globalThis.browser;
            }),
            void 0 === (r = n.apply(t, [e])) || (e.exports = r));
        },
      },
      __webpack_module_cache__ = {};
    function __webpack_require__(e) {
      var t = __webpack_module_cache__[e];
      if (void 0 !== t) return t.exports;
      var n = (__webpack_module_cache__[e] = {
        id: e,
        loaded: !1,
        exports: {},
      });
      return (
        __webpack_modules__[e].call(
          n.exports,
          n,
          n.exports,
          __webpack_require__,
        ),
        (n.loaded = !0),
        n.exports
      );
    }
    ((__webpack_require__.amdO = {}),
      (__webpack_require__.d = (e, t) => {
        for (var n in t)
          __webpack_require__.o(t, n) &&
            !__webpack_require__.o(e, n) &&
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
      }),
      (__webpack_require__.hmd = (e) => (
        (e = Object.create(e)).children || (e.children = []),
        Object.defineProperty(e, "exports", {
          enumerable: !0,
          set: () => {
            throw new Error(
              "ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: " +
                e.id,
            );
          },
        }),
        e
      )),
      (__webpack_require__.o = (e, t) =>
        Object.prototype.hasOwnProperty.call(e, t)));
    var __webpack_exports__ = {};
    (() => {
      "use strict";
      function e(e, t, n, r) {
        return new (n || (n = Promise))(function (s, o) {
          function i(e) {
            try {
              c(r.next(e));
            } catch (e) {
              o(e);
            }
          }
          function a(e) {
            try {
              c(r.throw(e));
            } catch (e) {
              o(e);
            }
          }
          function c(e) {
            var t;
            e.done
              ? s(e.value)
              : ((t = e.value),
                t instanceof n
                  ? t
                  : new n(function (e) {
                      e(t);
                    })).then(i, a);
          }
          c((r = r.apply(e, t || [])).next());
        });
      }
      (Object.create,
        Object.create,
        "function" == typeof SuppressedError && SuppressedError);
      var bn,
        Sn,
        xn,
        wn,
        kn = __webpack_require__(150);
      (!(function (e) {
        ((e.AccountImage = "AccountImage"),
          (e.BulkPost = "BulkPost"),
          (e.Hotkey = "Hotkey"),
          (e.Post = "Post"),
          (e.Story = "Story"),
          (e.Home = "Home"),
          (e.Explore = "Explore"),
          (e.Channel = "Channel"),
          (e.Tv = "TV"),
          (e.Saved = "Saved"),
          (e.Tagged = "Tagged"),
          (e.Account = "Account"),
          (e.Reels = "Reels"),
          (e.HoverPost = "HoverPost"),
          (e.ReelsFeed = "ReelsFeed"),
          (e.PostSlider = "PostSlider"));
      })(bn || (bn = {})),
        (function (e) {
          ((e[(e.single = 0)] = "single"),
            (e[(e.bulk = 1)] = "bulk"),
            (e[(e.visit = 2)] = "visit"),
            (e[(e.bulkPost = 3)] = "bulkPost"));
        })(Sn || (Sn = {})),
        (function (e) {
          ((e.default = "log"), (e.warn = "warn"), (e.error = "error"));
        })(xn || (xn = {})));
      let Rn = (wn = class {
        constructor() {
          (kn.runtime.onMessage.addListener((e) => {
              "OpenBraveFlagFileSystemAccessApi" !== e.type
                ? wn.onMessage(e)
                : kn.tabs.create({
                    url: "brave://flags/#file-system-access-api",
                  });
            }));
        }
        static onMessage(t) {
          return e(this, void 0, void 0, function* () {
            kn.storage.local.get().then((e) => {
              let n = JSON.parse(e.sc || "{}") || {};
              ((n[t.accountName] = (n[t.accountName] || 0) + t.imageURL.length),
                kn.storage.local.set({ sc: JSON.stringify(n) }));
            });
          });
        }
      });
      Rn = wn = (function (e, t, n, r) {
        var s,
          o = arguments.length,
          i =
            o < 3
              ? t
              : null === r
                ? (r = Object.getOwnPropertyDescriptor(t, n))
                : r;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
          i = Reflect.decorate(e, t, n, r);
        else
          for (var a = e.length - 1; a >= 0; a--)
            (s = e[a]) &&
              (i = (o < 3 ? s(i) : o > 3 ? s(t, n, i) : s(t, n)) || i);
        return (o > 3 && i && Object.defineProperty(t, n, i), i);
      })(
        [
          function (e) {
            return new Proxy(e, {
              construct: (e, t, n) =>
                e.prototype !== n.prototype
                  ? Reflect.construct(e, t, n)
                  : (e.SINGLETON_INSTANCE ||
                      (e.SINGLETON_INSTANCE = Reflect.construct(e, t, n)),
                    e.SINGLETON_INSTANCE),
            });
          },
        ],
        Rn,
      );
      new Rn();
    })();
  })();
//# sourceMappingURL=background.js.map
