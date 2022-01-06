var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
  default: () => _layout
});
var import_index_c02d726b = __toModule(require("../../chunks/index-c02d726b.js"));
var __layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "head,body{margin:0;padding:0}body{font-family:Arial, serif;background-image:linear-gradient(90deg, #404040, #2a3a28, #523434, #4b5d6d)}*{box-sizing:border-box}:root{--agility-color:#58ff58;--strength-color:#ff4a4a;--intelligence-color:#64d4ff}.wrapper.svelte-156rv11{max-width:1340px;margin:0 auto}.logo.svelte-156rv11{text-align:center;text-transform:uppercase;font-family:monospace;letter-spacing:5px;color:#fff;text-shadow:1px 1px 2px #ff4a4a, 0 0 1em #64d4ff, 0 0 0.2em #58ff58;padding:3rem 0 1rem}",
  map: null
};
const _layout = (0, import_index_c02d726b.c)(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `${$$result.title = `<title>Dota 2 Counter Heroes | Dota2 Heroes Advisor</title>`, ""}<meta name="${"description"}" content="${"Dota2 heroes advisor helps you choose enemy heroes and get the best counter heroes to win your next game!"}" data-svelte="svelte-a5z892"><meta name="${"keywords"}" content="${"Dota2, heroes, winrate, prediction"}" data-svelte="svelte-a5z892">`, ""}

<div class="${"wrapper svelte-156rv11"}"><h1 class="${"logo svelte-156rv11"}">Dota2 Heroes Advisor</h1>
    ${slots.default ? slots.default({}) : ``}
</div>`;
});
