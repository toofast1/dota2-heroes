var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
__export(exports, {
  default: () => Routes
});
var import_index_c02d726b = __toModule(require("../../chunks/index-c02d726b.js"));
var import_ssr_500aa740 = __toModule(require("../../chunks/ssr-500aa740.js"));
var import_sweetalert2 = __toModule(require("sweetalert2"));
const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = import_index_c02d726b.n) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if ((0, import_index_c02d726b.a)(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run, invalidate = import_index_c02d726b.n) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || import_index_c02d726b.n;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  const auto = fn.length < 2;
  return readable(initial_value, (set) => {
    let inited = false;
    const values = [];
    let pending = 0;
    let cleanup = import_index_c02d726b.n;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result);
      } else {
        cleanup = (0, import_index_c02d726b.i)(result) ? result : import_index_c02d726b.n;
      }
    };
    const unsubscribers = stores_array.map((store, i) => (0, import_index_c02d726b.b)(store, (value) => {
      values[i] = value;
      pending &= ~(1 << i);
      if (inited) {
        sync();
      }
    }, () => {
      pending |= 1 << i;
    }));
    inited = true;
    sync();
    return function stop() {
      (0, import_index_c02d726b.r)(unsubscribers);
      cleanup();
    };
  });
}
const config = {
  apiUrl: "https://api.opendota.com"
};
class API {
  constructor() {
    this.url = `${config.apiUrl}/api/`;
  }
  getUrl(path) {
    return `${this.url}${path}`;
  }
  async getHeroes() {
    const res = await fetch(this.getUrl("heroes"));
    return await res.json();
  }
  async getMatchups(heroId) {
    const res = await fetch(this.getUrl(`heroes/${heroId}/matchups`));
    return await res.json();
  }
}
const api = new API();
function createHeroes() {
  const { subscribe: subscribe2, set } = writable({});
  return {
    subscribe: subscribe2,
    getData: async () => {
      const heroes2 = await api.getHeroes();
      set(heroes2.reduce((obj, hero) => __spreadProps(__spreadValues({}, obj), {
        [hero.id]: __spreadProps(__spreadValues({}, hero), {
          short_name: hero.name.replace("npc_dota_hero_", "")
        })
      }), {}));
    }
  };
}
const heroes = createHeroes();
function createMatchups() {
  const { subscribe: subscribe2, update } = writable({});
  return {
    subscribe: subscribe2,
    async getMatchup(heroId) {
      const heroMatchups = await api.getMatchups(heroId);
      update((matchups2) => __spreadProps(__spreadValues({}, matchups2), {
        [heroId]: heroMatchups.reduce((obj, matchup) => __spreadProps(__spreadValues({}, obj), {
          [matchup.hero_id]: {
            id: matchup.hero_id,
            win_rate: Number((100 - matchup.wins / matchup.games_played * 100).toFixed(2))
          }
        }), {})
      }));
    },
    removeMatchup(heroId) {
      update((matchups2) => {
        delete matchups2[heroId];
        return matchups2;
      });
    }
  };
}
const matchups = createMatchups();
const offeredHeroes = derived(matchups, ($matchups) => {
  const selectedHeroes = new Set(Object.keys($matchups));
  if (!selectedHeroes.size) {
    return [];
  }
  const combinedMatchups = Object.values($matchups);
  const result = {};
  for (const heroId in combinedMatchups[0]) {
    if (selectedHeroes.has(heroId)) {
      continue;
    }
    let winRateSum = 0;
    for (let i = 0; i < combinedMatchups.length; i++) {
      if (!combinedMatchups[i][heroId]) {
        break;
      }
      winRateSum += combinedMatchups[i][heroId].win_rate;
    }
    result[heroId] = {
      id: heroId,
      win_rate: Number((winRateSum / combinedMatchups.length).toFixed(2))
    };
  }
  return Object.values(result).sort((a, b) => b.win_rate - a.win_rate).slice(0, 5);
});
var Loader_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: '.loader.svelte-1jsw78u{position:relative;width:50px;height:50px;margin:0 auto;border-radius:50%}.loader.svelte-1jsw78u::before,.loader.svelte-1jsw78u::after{content:"";position:absolute;top:-5px;left:-5px;width:100%;height:100%;border-radius:100%;border:5px solid transparent;border-top-color:#ffffff}.loader.svelte-1jsw78u::before{z-index:1;animation:svelte-1jsw78u-spin 1s infinite}.loader.svelte-1jsw78u::after{border:5px solid #000000}@keyframes svelte-1jsw78u-spin{0%{-webkit-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}',
  map: null
};
const Loader = (0, import_index_c02d726b.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$3);
  return `<div class="${"loader svelte-1jsw78u"}"></div>`;
});
var Search_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: `.search.svelte-7hnjmb{position:relative;width:100%;max-width:400px;margin:20px auto;text-align:center}.search.svelte-7hnjmb::before{content:"";position:absolute;top:10px;left:5px;width:20px;height:20px;background-image:url('/search.svg');background-size:cover}.input.svelte-7hnjmb{width:100%;height:40px;margin:0;padding:10px 40px;border:none;outline:none;background:#2f2f2f;color:#FFF}.input.svelte-7hnjmb::placeholder{color:#b4b4b4}.reset.svelte-7hnjmb{position:absolute;top:13px;right:10px;width:15px;height:15px;border:none;outline:none;cursor:pointer;transition:opacity 0.3s;background-image:url('/close.svg');background-size:cover;background-color:transparent}.reset.svelte-7hnjmb:hover{opacity:0.5}`,
  map: null
};
const Search = (0, import_index_c02d726b.c)(($$result, $$props, $$bindings, slots) => {
  let { value } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  $$result.css.add(css$2);
  return `<div class="${"search svelte-7hnjmb"}"><input class="${"input svelte-7hnjmb"}" type="${"text"}" placeholder="${"Search by Hero Name"}"${(0, import_index_c02d726b.d)("value", value, 0)}>
    <button class="${"reset svelte-7hnjmb"}" type="${"button"}"></button>
</div>`;
});
var HeroButton_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".button.svelte-107wdr0.svelte-107wdr0{position:relative;width:18%;min-width:200px;padding:0;border:none;cursor:pointer;overflow:hidden;box-shadow:0 0 10px 3px rgba(0, 0, 0, 0.5);background:#000000;border-radius:3px}.button.svelte-107wdr0:hover .hero.svelte-107wdr0{opacity:1;transform:translateY(0)}.button.svelte-107wdr0:hover .hero-image.svelte-107wdr0{transform:scale(1.3)}.hero.svelte-107wdr0.svelte-107wdr0{position:absolute;bottom:0;left:0;color:#FFF;z-index:1;padding:5px 5px 10px 10px;display:flex;align-items:center;font-size:20px;letter-spacing:2px;text-transform:uppercase;text-align:left;transform:translateY(60px);transition:all 0.3s;text-shadow:1px 1px 10px #000}.attribute.svelte-107wdr0.svelte-107wdr0{width:10px;height:10px;margin-right:5px;border-radius:50%}.agi.svelte-107wdr0.svelte-107wdr0{background-color:var(--agility-color)}.str.svelte-107wdr0.svelte-107wdr0{background-color:var(--strength-color)}.int.svelte-107wdr0.svelte-107wdr0{background-color:var(--intelligence-color)}.hero-image.svelte-107wdr0.svelte-107wdr0{width:100%;height:100%;transition:transform 0.5s}.selected.svelte-107wdr0 .hero-image.svelte-107wdr0{opacity:0.3}.check.svelte-107wdr0.svelte-107wdr0{position:absolute;top:50%;left:50%;width:50px;height:50px;transform:translate(-50%, -50%);opacity:0;transition:opacity 0.3s}.selected.svelte-107wdr0 .check.svelte-107wdr0{opacity:1}",
  map: null
};
const HeroButton = (0, import_index_c02d726b.c)(($$result, $$props, $$bindings, slots) => {
  let { hero = {} } = $$props;
  let { selected = false } = $$props;
  (0, import_index_c02d726b.f)();
  if ($$props.hero === void 0 && $$bindings.hero && hero !== void 0)
    $$bindings.hero(hero);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  $$result.css.add(css$1);
  return `<button class="${["button svelte-107wdr0", selected ? "selected" : ""].join(" ").trim()}">${slots.default ? slots.default({}) : `
        <div class="${"hero svelte-107wdr0"}"><div class="${"attribute " + (0, import_index_c02d726b.e)(hero.primary_attr) + " svelte-107wdr0"}"></div>
            ${(0, import_index_c02d726b.e)(hero.localized_name)}</div>
    `}
    <img class="${"hero-image svelte-107wdr0"}" src="${"https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/" + (0, import_index_c02d726b.e)(hero.name.replace("npc_dota_hero_", "")) + ".png"}"${(0, import_index_c02d726b.d)("alt", hero.localized_name, 0)}>
    <img src="${"/checked.svg"}" alt="${"checked"}" class="${"check svelte-107wdr0"}">
</button>`;
});
var index_svelte_svelte_type_style_lang = "";
const css = {
  code: ".heroes.svelte-kwe52x{display:flex;flex-wrap:wrap;justify-content:center;gap:1.5rem;padding-bottom:3rem;padding-top:3rem}.winrate.svelte-kwe52x{position:absolute;bottom:0;right:0;z-index:1;padding:5px;font-size:22px;color:#63ff63;background-color:rgba(0, 0, 0, 0.5)}.empty.svelte-kwe52x{font-size:32px;color:#FFF}.footer.svelte-kwe52x{font-family:Roboto, sans-serif;font-size:14px;color:#FFF;text-align:center;padding:2rem 0 4rem;text-shadow:1px 1px 1px #ff4a4a, 0 0 1em #64d4ff, 0 0 0.2em #58ff58}",
  map: null
};
const Routes = (0, import_index_c02d726b.c)(($$result, $$props, $$bindings, slots) => {
  let filteredHeroes;
  let $heroes, $$unsubscribe_heroes;
  let $offeredHeroes, $$unsubscribe_offeredHeroes;
  $$unsubscribe_heroes = (0, import_index_c02d726b.b)(heroes, (value) => $heroes = value);
  $$unsubscribe_offeredHeroes = (0, import_index_c02d726b.b)(offeredHeroes, (value) => $offeredHeroes = value);
  (0, import_ssr_500aa740.o)(heroes.getData);
  let search = "";
  let selectedHeroes = new Set();
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    filteredHeroes = Object.values($heroes).filter(({ localized_name }) => localized_name.toLowerCase().includes(search)).sort((a, b) => a.localized_name.localeCompare(b.localized_name));
    $$rendered = `${selectedHeroes.size ? `<div class="${"heroes svelte-kwe52x"}">${$offeredHeroes.length ? (0, import_index_c02d726b.g)($offeredHeroes, (hero) => `${(0, import_index_c02d726b.v)(HeroButton, "HeroButton").$$render($$result, { hero: $heroes[hero.id] }, {}, {
      default: () => `<div class="${"winrate svelte-kwe52x"}">${(0, import_index_c02d726b.e)(hero.win_rate)}%</div>
            `
    })}`) : `${(0, import_index_c02d726b.v)(Loader, "Loader").$$render($$result, {}, {}, {})}`}</div>` : ``}


${(0, import_index_c02d726b.v)(Search, "Search").$$render($$result, { value: search }, {
      value: ($$value) => {
        search = $$value;
        $$settled = false;
      }
    }, {})}

<div class="${"heroes svelte-kwe52x"}">${filteredHeroes.length ? (0, import_index_c02d726b.g)(filteredHeroes, (hero) => `${(0, import_index_c02d726b.v)(HeroButton, "HeroButton").$$render($$result, {
      hero,
      selected: selectedHeroes.has(hero.id)
    }, {}, {})}`) : `${search ? `<p class="${"empty svelte-kwe52x"}">No heroes match your search criteria.</p>` : `${(0, import_index_c02d726b.v)(Loader, "Loader").$$render($$result, {}, {}, {})}`}`}</div>

<div class="${"footer svelte-kwe52x"}">Copyright \xA9 2022. Made with <svg fill="${"#e74c3c"}" xmlns="${"http://www.w3.org/2000/svg"}" width="${"12"}" height="${"12"}" viewBox="${"0 0 24 24"}"><path d="${"M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"}"></path></svg> in Bac\u0103u, Romania.
</div>`;
  } while (!$$settled);
  $$unsubscribe_heroes();
  $$unsubscribe_offeredHeroes();
  return $$rendered;
});
