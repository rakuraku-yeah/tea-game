const fs = require("node:fs"),
  vm = require("node:vm"),
  assert = require("node:assert/strict");
assert.match(fs.readFileSync("app.js", "utf8"), /customer-.*\.png/);
assert.ok(!fs.readFileSync("index.html", "utf8").includes("customer-haru.svg"));
const saved = {};
function boot() {
  const elements = {};
  const node = () => ({
    textContent: "",
    innerHTML: "",
    style: { setProperty() {} },
    dataset: {},
    querySelectorAll: () => [],
    querySelector: () => node(),
    classList: { add() {}, remove() {}, toggle() {} },
    setAttribute() {},
    listeners: {},
    addEventListener(type, fn) {
      this.listeners[type] = fn;
    },
    showModal() {
      this.open = true;
    },
    close() {
      this.open = false;
    },
  });
  const ctx = {
    console,
    setInterval: (fn, ms) => {
      if (ms === 250) ctx.tick = fn;
      else ctx.craftTick = fn;
      return 1;
    },
    setTimeout: (fn) => {
      ctx.pending = fn;
      return 1;
    },
    clearTimeout: () => {
      ctx.pending = null;
    },
    document: {
      addEventListener() {},
      getElementById: (id) => (elements[id] ??= node()),
      querySelector: () => node(),
      querySelectorAll: () => [],
    },
    localStorage: {
      getItem: (k) => saved[k] ?? null,
      setItem: (k, v) => (saved[k] = v),
    },
  };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync("workshop.js", "utf8"), ctx);
  vm.runInContext(fs.readFileSync("app.js", "utf8"), ctx);
  return { ctx, elements, run: (s) => vm.runInContext(s, ctx) };
}
let g = boot();
g.run("businessPhase='open';customerIndex=0;customerReady=true");
const make = (m, route) =>
  g.run(
    `restart('${m}');steps=${JSON.stringify(route)};$('identify').onclick()`,
  );
for (const [m, route, id] of [
  ["sun", ["steam", "roll", "dry"], "sencha"],
  ["mature", ["steam", "roll", "dry"], "bancha"],
  ["shade", ["steam", "roll", "dry"], "gyokuro"],
  ["shade", ["steam", "dry"], "tencha"],
  ["sun", ["steam", "roll", "dry", "roast"], "hojicha"],
]) {
  make(m, route);
  assert.equal(g.run("result()"), id);
  assert.equal(g.run(`inventory.${id}`), 1);
  g.run("$('identify').onclick()");
  assert.equal(g.run(`inventory.${id}`), 1);
}
g.run("selectedTea='tencha';$('serve').onclick()");
assert.equal(g.run("coins"), 140);
assert.equal(g.run("inventory.tencha"), 1);
g.run("selectedTea='sencha';$('serve').onclick()");
assert.equal(g.run("coins"), 165);
assert.equal(g.run("served"), 1);
assert.equal(g.run("inventory.sencha"), 0);
g.run("customerIndex=1;customerReady=true");
make("sun", ["steam", "roll", "dry"]);
g.run(
  "$('actions').onclick({target:{closest:()=>({dataset:{action:'roast'}})}})",
);
assert.equal(g.run("inventory.sencha"), 0);
g.run("$('identify').onclick()");
assert.equal(g.run("inventory.hojicha"), 2);
g.run("selectedTea='hojicha';$('serve').onclick()");
assert.equal(g.run("coins"), 191);
assert.equal(g.run("inventory.hojicha"), 1);
assert.equal(g.run("steps.length"), 0);
g = boot();
assert.equal(g.run("coins"), 191);
assert.equal(g.run("served"), 2);
assert.equal(g.run("inventory.hojicha"), 1);
assert.equal(g.run("Object.keys(discovered).length"), 5);
for (const key of [
  "sun",
  "mature",
  "shade",
  "steamed",
  "rolled",
  "sencha",
  "bancha",
  "gyokuro",
  "tencha",
  "hojicha",
])
  assert.ok(g.run(`spriteStyle('${key}')`).length);
console.log(
  "PASS: five teas, duplicate identification, wrong order, sales, roasting stock transfer, consumed batch reset, save reload and sprite mappings.",
);

g.run("arriveCustomer(true)");
assert.equal(g.run("customerReady"), false);
assert.equal(g.elements.serve.disabled, true);
g.ctx.pending();
assert.equal(g.run("customerReady"), true);
for (let i = 0; i < 30; i++) {
  g.run("previousArt=customerArt;arriveCustomer(true)");
  assert.notEqual(g.run("customerArt"), g.run("previousArt"));
  g.ctx.pending();
}
console.log(
  "PASS: arrival delays requests and sales; random visitors do not repeat consecutively.",
);

const bank = g.run("customers");
assert.equal(bank.length, 37);
assert.equal(new Set(bank.map((c) => c.request)).size, 37);
for (const c of bank) {
  assert.equal(c.name, "來訪的客人");
  assert.ok(c.accept.length);
  for (const id of c.accept) assert.ok(g.run(`Boolean(teas['${id}'])`));
  assert.ok(!/蒸製|揉捻|乾燥.*→/.test(c.hint));
}
g.run("recentRequests=[customerIndex]");
const seen = new Set([g.run("customerIndex")]);
for (let i = 0; i < bank.length - 1; i++) {
  g.run("arriveCustomer(true)");
  assert.ok(!seen.has(g.run("customerIndex")));
  seen.add(g.run("customerIndex"));
  g.ctx.pending();
}
assert.equal(seen.size, 37);
// Every declared accepted tea sells, including alternate answers.
for (let i = 0; i < bank.length; i++)
  for (const tea of bank[i].accept) {
    g.run(
      `customerIndex=${i};customerReady=true;inventory['${tea}']=1;selectedTea='${tea}';storedTea=null;`,
    );
    const before = g.run("coins");
    g.run("$('serve').onclick()");
    assert.equal(g.run("coins"), before + bank[i].reward);
    assert.equal(g.run(`inventory['${tea}']`), 0);
  }
const html = fs.readFileSync("index.html", "utf8");
assert.ok(
  html.indexOf('class="inventory-panel"') < html.indexOf('class="worktable"'),
);
console.log(
  "PASS: 37 unique requests, no-repeat cycle, multiple valid answers, anonymous guests and counter-before-workshop order.",
);

// Taiwan routes must be reachable through the real validation shared by click/drag.
const taiwanRoutes = [
  ["baozhong", ["wither", "shake", "kill", "roll", "dry"]],
  ["oolong", ["wither", "shake", "shake", "kill", "roll", "ball", "dry"]],
  [
    "roastedOolong",
    ["wither", "shake", "shake", "kill", "roll", "ball", "dry", "roast"],
  ],
  ["black", ["wither", "roll", "oxidize", "dry"]],
];
for (const [tea, route] of taiwanRoutes) {
  g.run("restart('taiwan')");
  for (const action of route) {
    assert.equal(
      g.run(`processAction('${action}')`),
      true,
      `${tea}: ${action}`,
    );
  }
  assert.equal(g.run("result()"), tea);
  const before = g.run(`inventory['${tea}'] || 0`);
  g.run("$('identify').onclick()");
  assert.equal(g.run(`inventory['${tea}']`), before + 1);
  g.run("$('identify').onclick()");
  assert.equal(g.run(`inventory['${tea}']`), before + 1);
}
g.run("restart('taiwan')");
for (const action of [
  "steam",
  "kill",
  "roll",
  "dry",
  "roast",
  "ball",
  "oxidize",
]) {
  assert.equal(g.run(`processAction('${action}')`), false);
}
assert.equal(g.run("steps.length"), 0);
g.run("processAction('wither'); processAction('shake'); processAction('kill')");
assert.equal(g.run("processAction('oxidize')"), false);
assert.equal(g.run("processAction('shake')"), false);
g.run("restart('taiwan'); processAction('wither'); processAction('roll')");
assert.equal(g.run("processAction('kill')"), false);
assert.equal(g.run("processAction('dry')"), false);
g.run(
  "restart('taiwan'); processAction('wither'); processAction('shake'); processAction('shake')",
);
assert.equal(g.run("processAction('shake')"), false);
g.run("processAction('kill'); processAction('roll')");
assert.equal(g.run("processAction('dry')"), false);
g.run("processAction('ball'); processAction('dry'); $('identify').onclick()");
const oolongStock = g.run("inventory.oolong");
g.run("processAction('roast')");
assert.equal(g.run("inventory.oolong"), oolongStock - 1);
assert.equal(g.run("result()"), "roastedOolong");
g.run("$('identify').onclick(); save()");
g = boot();
assert.equal(g.run("material"), "taiwan");
g.run("material=null;steps=[];storedTea=null;render()");
assert.equal(g.run("Object.keys(discovered).length"), 9);
assert.equal(g.run("reason('steam')"), "先點中央茶盤，選一份原料。");
assert.equal(g.run("processAction('steam')"), false);
assert.ok(g.elements["tea-art"].style.cssText.includes("tea-empty.svg"));
for (const id of g.run("Object.keys(teas).concat(materials.map(m => m.id))")) {
  assert.ok(fs.existsSync(`assets/simple/tea-${id}.svg`));
}
for (const action of g.run("actions.map(a => a.id)")) {
  assert.ok(fs.existsSync(`assets/simple/tools/${action}.svg`));
}
console.log(
  "PASS: 4 Taiwan routes, oxidation/heat ordering, roasting transfer, 9-tea save migration, empty tray and all artwork paths.",
);

// Business lifecycle: costs, persistence, no free replacement leaves and bankruptcy recovery.
g.run(
  "businessPhase='prep'; coins=180; inventory={}; material=null; steps=[]; dayCosts=0; dayRevenue=0; daySales=0;totalCosts=0;totalRevenue=0;totalSales=0",
);
assert.equal(
  g.run("customerReady=false; arriveCustomer(); customerReady"),
  false,
);
g.run("restart('shade')");
assert.equal(g.run("coins"), 168);
assert.equal(g.run("processAction('roll')"), false);
assert.equal(g.run("coins"), 168);
g.run("processAction('steam'); processAction('dry'); $('identify').onclick()");
assert.equal(g.run("batchCost"), 16);
assert.equal(g.run("dayCosts"), 16);
assert.equal(g.run("totalCosts"), 16);
g = boot();
assert.equal(g.run("coins"), 164);
assert.equal(g.run("material"), "shade");
assert.equal(g.run("storedTea"), "tencha");
assert.equal(g.run("businessPhase"), "prep");
g.run("$('open-shop').onclick()");
assert.equal(g.run("businessPhase"), "open");
assert.equal(g.run("remaining"), 180);
g.run(
  "customerReady=true; customerIndex=4; selectedTea='tencha'; $('serve').onclick()",
);
assert.equal(g.run("material"), null);
assert.equal(g.run("daySales"), 1);
assert.equal(g.run("totalSales"), 1);
assert.equal(g.run("totalRevenue"), g.run("dayRevenue"));
g.run(
  "$('modal').close();$('atlas').hidden=true;paused=true;lastTick=Date.now()-1000",
);
g.ctx.tick();
assert.equal(g.run("remaining"), 180);
g.run("paused=false;remaining=0.1;lastTick=Date.now()-1000");
g.ctx.tick();
assert.equal(g.run("businessPhase"), "closed");
const closingCoins = g.run("coins");
assert.equal(g.run("restart('sun')"), false);
assert.equal(g.run("coins"), closingCoins);
g.run("$('next-day').onclick()");
assert.equal(g.run("businessDay"), 2);
assert.equal(g.run("businessPhase"), "prep");
assert.equal(g.run("dayCosts"), 0);
g.run("coins=0;inventory={};$('support').onclick()");
assert.equal(g.run("coins"), 40);
g.run("$('support').onclick()");
assert.equal(g.run("coins"), 40);
g.run("coins=1;restart('shade')");
assert.equal(g.run("coins"), 1);
console.log(
  "PASS: preparation, paid raw leaves/processing, reload, timed closing, next day and conditional support.",
);

// Translation is independent of game IDs and never changes the request answers.
const translationSource = fs
  .readFileSync("i18n.js", "utf8")
  .split('let language = "ja";')[0];
g.run(translationSource);
assert.equal(g.run("japaneseGuests.length"), g.run("customers.length"));
for (const guest of g.run("customers")) {
  for (const key of ["request", "hint", "role", "thanks"]) {
    assert.ok(
      g.run(`copyMap.has(${JSON.stringify(guest[key])})`),
      `Missing guest translation: ${guest[key]}`,
    );
  }
}
if (process.env.AUDIT_TRANSLATIONS) {
  const texts = JSON.parse(fs.readFileSync("/tmp/tea_strings.json", "utf8"));
  const unchanged = texts.filter(
    (text) =>
      g.run(
        `${JSON.stringify(text)}.replace(copyPattern, m => copyMap.get(m))`,
      ) === text,
  );
  console.log(unchanged);
}
console.log(
  "PASS: all 37 guest request, hint, role and thank-you translations are present.",
);

for (const note of g.run("Object.values(processNotes)"))
  assert.ok(g.run(`copyMap.has(${JSON.stringify(note)})`));

assert.equal(g.run(`copyMap.get("台灣茶時光")`), "台湾茶のひととき");

// Inline stations charge once and keep the tea on its latest tool.
g.run(
  "businessPhase='prep';paused=false;coins=180;inventory={};material=null;steps=[];workshop.data.active=null;workshop.data.mastered=[];restart('sun')",
);
assert.equal(g.run("workshop.begin('steam')"), true);
assert.equal(g.run("coins"), 174);
assert.equal(g.run("workshop.data.active.stage"), "heat");
g.run("workshop.tick(2.5)");
assert.equal(g.run("workshop.data.active.stage"), "ready");
g.run("workshop.begin('steam');workshop.tick(.5)");
assert.equal(g.run("workshop.data.active"), null);
assert.equal(g.run("coins"), 172);
assert.equal(g.run("workshop.data.location"), "steam");
assert.equal(g.run("workshop.complete()"), false);
g.run(
  "workshop.begin('roll');workshop.roll(-1);workshop.tick(.2);workshop.roll(1);workshop.tick(.2);workshop.roll(-1)",
);
assert.equal(g.run("workshop.data.active"), null);
assert.equal(g.run("coins"), 170);
g.run("workshop.begin('dry');workshop.tick(10)");
assert.equal(g.run("workshop.data.active.elapsed"), 0);
g.run("workshop.begin('dry');workshop.tick(.5)");
assert.equal(g.run("workshop.data.active"), null);
assert.equal(g.run("coins"), 168);
assert.equal(g.run("workshop.data.location"), "dry");
assert.equal(g.run("workshop.data.mastered.length"), 3);
g = boot();
assert.equal(g.run("workshop.data.location"), "dry");
g.run(
  "restart('shade');workshop.begin('steam');$('cancel-processing').onclick()",
);
assert.equal(g.run("coins"), 156);
assert.equal(g.run("workshop.data.location"), null);
console.log(
  "PASS: inline steam/open/cool, three rubs, half-second drying, exact-once costs, cancellation and reload.",
);

// The fifth closing shows a cumulative settlement; both follow-up choices work.
g.run(
  "businessDay=5;businessPhase='open';dayRevenue=35;dayCosts=12;daySales=1;totalRevenue=140;totalCosts=52;totalSales=4;discovered={sencha:{},gyokuro:{}};endDay()",
);
assert.equal(g.run("businessPhase"), "closed");
assert.match(g.elements["modal-content"].innerHTML, /五日營業結算/);
assert.match(g.elements["modal-content"].innerHTML, /140/);
assert.match(g.elements["modal-content"].innerHTML, /52/);
assert.match(g.elements["modal-content"].innerHTML, /2 \/ 9/);
g.run("$('settlement-continue').onclick()");
assert.equal(g.run("businessDay"), 6);
assert.equal(g.run("settlementComplete"), true);
g.run(
  "settlementComplete=false;showSettlement();$('settlement-restart').onclick()",
);
assert.equal(g.run("businessDay"), 1);
assert.equal(g.run("totalRevenue + totalCosts + totalSales"), 0);
assert.equal(g.run("Object.keys(discovered).length"), 2);
assert.equal(g.run("workshop.partyCustomer()"), null);
console.log(
  "PASS: five-day settlement totals, free play, new cycle and removed tea party.",
);

// All new observation instructions and settlement labels have Japanese copy.
g.run(fs.readFileSync("i18n.js", "utf8").split('let language = "ja";')[0]);
for (const source of [
  "蒸籠裡的一抹綠",
  "在揉台上，慢慢收攏",
  "攤開茶葉，讓水分散去",
  "把茶葉拖進蒸籠，或按「放入茶葉」。",
  "葉團收得太緊了，鬆手稍等，再繼續。",
  "茶葉重疊了，把四片葉子攤到不同位置。",
  "五日營業結算",
  "五天的茶屋日記",
  "營業收入",
  "圖鑑收集",
  "繼續自由經營",
  "包種茶",
])
  assert.ok(g.run(`copyMap.has(${JSON.stringify(source)})`), source);
assert.equal(g.run("copyMap.get('包種茶')"), "包種茶");
console.log("PASS: new hands-on instructions and settlement translations.");

// A completed station can hand its leaves to the next tool without a modal.
g = boot();
g.run(
  "businessPhase='prep';paused=false;coins=180;workshop.data.active=null;restart('sun');processAction('steam');workshop.data.location='steam';document.elementFromPoint=()=>({closest:(selector)=>selector==='[data-action]'?({dataset:{action:'roll'}}):null});workshop.pointer={id:7,moved:true,origin:'steam',ghost:null};$('actions').listeners.pointerup({pointerId:7,type:'pointerup',clientX:100,clientY:100})",
);
assert.equal(g.run("workshop.data.active.id"), "roll");
assert.equal(g.run("workshop.data.location"), "roll");
assert.ok(!fs.readFileSync("index.html", "utf8").includes('id="craft-dialog"'));
console.log(
  "PASS: station-to-station drop starts the next process; no processing overlay remains.",
);

// Returning to the tray moves the same batch without another transaction.
g.run("workshop.data.active=null;workshop.data.location='steam'");
const beforeReturn = g.run("JSON.stringify({steps,coins,batch,inventory})");
assert.equal(g.run("workshop.returnToTray()"), true);
assert.equal(g.run("workshop.data.location"), null);
assert.equal(
  g.run("JSON.stringify({steps,coins,batch,inventory})"),
  beforeReturn,
);
g.run("workshop.data.location='steam';workshop.data.active={id:'steam'}");
assert.equal(g.run("workshop.returnToTray()"), false);
g.run(
  "workshop.data.active=null;document.elementFromPoint=()=>({closest:(selector)=>selector==='#tea-tray'?{}:null});workshop.pointer={id:8,moved:true,origin:'steam',ghost:null};$('actions').listeners.pointerup({pointerId:8,type:'pointerup',clientX:640,clientY:450})",
);
assert.equal(g.run("workshop.data.location"), null);
assert.equal(boot().run("workshop.data.location"), null);
console.log(
  "PASS: return-to-tray drop preserves batch and cost, persists, and rejects unfinished processing.",
);
