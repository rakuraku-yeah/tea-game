const materials = [
  {
    id: "sun",
    name: "日照嫩葉",
    sub: "春摘・一芯二葉",
    desc: "日照嫩葉 · 一芯二葉",
  },
  {
    id: "mature",
    name: "成熟茶葉",
    sub: "較晚採摘・較成熟葉",
    desc: "較晚採摘 · 成熟葉",
  },
  {
    id: "shade",
    name: "遮陰嫩葉",
    sub: "採摘前遮光培育約二十日",
    desc: "遮陰栽培 · 春季嫩葉",
  },
];
const actions = [
  { id: "steam", name: "蒸製", sub: "以蒸氣留住葉子的綠", icon: "♨" },
  { id: "roll", name: "揉捻", sub: "釋出茶汁，改變葉形", icon: "〰" },
  { id: "dry", name: "乾燥", sub: "帶走水分，收攏香氣", icon: "☀" },
  { id: "roast", name: "焙煎", sub: "以熱火喚醒烘烤香", icon: "♧" },
];
const teas = {
  sencha: {
    name: "煎茶",
    jp: "SENCHA",
    desc: "日照嫩葉經蒸製、揉捻與乾燥，成為帶有清新草木香的綠茶。",
    recipe: "日照嫩葉 → 蒸製 → 揉捻 → 乾燥",
    relation: "與番茶的差別在原料與採摘時節；完成後還能焙煎成ほうじ茶。",
  },
  bancha: {
    name: "番茶",
    jp: "BANCHA",
    desc: "較晚採摘、較成熟的葉子，帶來樸實而輕淡的滋味。各地番茶的原料與製法也有不同。",
    recipe: "成熟茶葉 → 蒸製 → 揉捻 → 乾燥",
    relation: "番茶不是煎茶的下一階段；在這間茶屋裡，它們從不同原料出發。",
  },
  gyokuro: {
    name: "玉露",
    jp: "GYOKURO",
    desc: "採摘前經約二十日遮陰栽培的嫩葉，製成具有鮮味與覆香的茶。不是只採頂端就能得到玉露。",
    recipe: "遮陰嫩葉 → 蒸製 → 揉捻 → 乾燥",
    relation: "和煎茶有相似的加工方式，原料的栽培方式卻不同。",
  },
  tencha: {
    name: "碾茶",
    jp: "TENCHA",
    desc: "遮陰葉經蒸製後，不揉捻而乾燥，保留片狀外觀。實際製程還包含去梗、去葉脈等精製步驟。",
    recipe: "遮陰嫩葉 → 蒸製 → 乾燥（不揉捻）",
    relation: "碾茶精製後研磨可製成抹茶；研磨尚未開放於本原型。",
  },
  hojicha: {
    name: "ほうじ茶",
    jp: "HOJICHA · 焙茶",
    desc: "綠茶經焙煎，葉色轉褐，青草香讓位給溫暖的烘烤香。",
    recipe: "煎茶或番茶 → 焙煎",
    relation: "可由多種綠茶焙煎而成。本原型開放煎茶與番茶兩條路徑。",
  },
};
materials.push({
  id: "taiwan",
  name: "台灣茶菁",
  sub: "小葉種・適熟葉",
  desc: "台灣小葉種茶菁 · 適熟葉（教學原料）",
});
actions.push(
  { id: "wither", name: "萎凋", sub: "讓葉子失水柔軟", icon: "☁" },
  { id: "shake", name: "攪拌靜置", sub: "觀察葉緣與香氣，可做兩次", icon: "↝" },
  { id: "kill", name: "炒菁", sub: "以熱停止氧化，留住香氣", icon: "♨" },
  { id: "oxidize", name: "充分氧化", sub: "揉後靜置，觀察銅紅葉色", icon: "◷" },
  {
    id: "ball",
    name: "團揉整形",
    sub: "含初乾與反覆包揉，收成球形",
    icon: "◉",
  },
);
Object.assign(teas, {
  baozhong: {
    name: "包種茶",
    jp: "TAIWAN · BAOZHONG",
    desc: "輕度氧化、清揚花香，外形為自然捲曲的條索。這裡呈現包種茶風格，不以製法冒充文山產地。",
    recipe: "台灣茶菁 → 萎凋 → 攪拌靜置 × 1 → 炒菁 → 揉捻 → 乾燥",
    relation:
      "與烏龍同屬部分氧化茶。遊戲以攪拌次數表示香氣變化，實際程度需依葉況判斷。",
  },
  oolong: {
    name: "清香烏龍",
    jp: "TAIWAN · OOLONG",
    desc: "部分氧化的台灣烏龍風格，帶花香與柔和果香，經團揉形成半球形。不是所有烏龍都呈球形，也不以此判定高山產地。",
    recipe: "台灣茶菁 → 萎凋 → 攪拌靜置 × 2 → 炒菁 → 揉捻 → 團揉整形 → 乾燥",
    relation:
      "完成後可再焙煎成焙香烏龍。團揉整形按鈕合併了初乾與反覆包揉、解塊等工序。",
  },
  roastedOolong: {
    name: "焙香烏龍",
    jp: "TAIWAN · ROASTED OOLONG",
    desc: "在烏龍基礎上烘焙，花果香帶出熟香與烤穀物氣息，仍保留緊結的葉形。",
    recipe: "清香烏龍 → 焙煎",
    relation:
      "焙煎與鮮葉氧化是不同的變化。本作不把烘焙程度直接命名為凍頂或鐵觀音。",
  },
  black: {
    name: "台灣紅茶",
    jp: "TAIWAN · BLACK TEA",
    desc: "茶菁萎凋、揉捻後充分氧化，再乾燥，形成甜熟果香與深色條索。此為小葉種紅茶示意，並非特指紅玉或日月潭產地。",
    recipe: "台灣茶菁 → 萎凋 → 揉捻 → 充分氧化 → 乾燥",
    relation:
      "紅茶不先炒菁；乾燥時以熱停止酵素作用。茶業常說的「發酵」在此主要指酵素氧化。",
  },
});
// Explicitly distinguish playable shortcuts from real manufacturing.
const processNotes = {
  sencha:
    "製程簡化：揉捻按鈕合併粗揉、揉捻、中揉與精揉；實際會邊揉邊乾燥，並在蒸後冷卻。針形不只靠單一次揉捻形成。",
  gyokuro:
    "製程簡化：揉捻按鈕合併多道揉製工序。玉露需要覆蓋栽培，遮陰日數與品種會依產區及栽培管理不同。",
  tencha:
    "製程簡化：遊戲共用遮陰原料籃；現實的碾茶與玉露在被覆管理、設備與精製上仍有差異。碾茶通常是抹茶原料，本作以葉形研究茶樣提供給客人。",
  bancha: "本作只呈現一種蒸製番茶路線；各地番茶也有不揉捻、焙炒等不同製法。",
  hojicha: "焙煎改變已製成綠茶的香氣與葉色，和鮮葉的酵素氧化不同。",
  baozhong:
    "遊戲的攪拌一次只代表較輕的氧化階段，不是現實配方。實際萎凋與攪拌需配合葉況；解塊、初乾等步驟已合併。",
  oolong:
    "遊戲的攪拌兩次只代表另一個氧化階段，不足以判定茶種。團揉整形合併初乾、包揉與解塊；也不是所有烏龍都呈球形。",
  roastedOolong: "本作呈現焙香風格；產地、品種與茶名不能僅由烘焙程度判定。",
  black:
    "紅茶的氧化在萎凋、揉捻時就可能開始；充分氧化按鈕代表揉後續行的階段。乾燥以熱停止酵素作用，並非先炒菁。",
};
const teaTotal = Object.keys(teas).length;
function taiwanBatch() {
  return material === "taiwan";
}
function shakeCount() {
  return steps.filter((s) => s === "shake").length;
}
function availableActions() {
  return taiwanBatch()
    ? [
        "wither",
        "shake",
        "kill",
        "roll",
        "oxidize",
        "ball",
        "dry",
        "roast",
      ].map((id) => actions.find((a) => a.id === id))
    : actions.filter((a) => ["steam", "roll", "dry", "roast"].includes(a.id));
}
function taiwanReason(id) {
  const has = (s) => steps.includes(s);
  if (id === "steam") return "這份茶菁的實驗從萎凋開始。";
  if (id === "shake" && shakeCount() >= 2) return "已到這次實驗的花果香階段。";
  if (id !== "shake" && has(id)) return "這道工序已完成。";
  if (has("dry"))
    return id === "roast" && baseTea() === "oolong"
      ? ""
      : "這批已乾燥；本實驗只開放清香烏龍再焙煎。";
  if (id === "wither") return steps.length ? "請從新鮮茶菁開始萎凋。" : "";
  if (!has("wither")) return "先讓茶菁萎凋，觀察葉子變柔軟。";
  if (id === "shake")
    return has("kill") || has("roll") ? "攪拌觀察需在炒菁或揉捻前完成。" : "";
  if (id === "kill")
    return has("roll")
      ? "揉後的這條路走向紅茶，不再炒菁。"
      : !shakeCount()
        ? "先攪拌靜置，觀察花香出現。"
        : "";
  if (id === "roll")
    return shakeCount() && !has("kill")
      ? "花香路線先炒菁，讓氧化停在此刻。"
      : "";
  if (id === "oxidize")
    return has("kill")
      ? "炒菁後氧化已停止。"
      : !has("roll")
        ? "先揉捻，讓茶汁與空氣接觸。"
        : "";
  if (id === "ball")
    return !has("kill") || !has("roll") || shakeCount() !== 2
      ? "花果香階段炒菁、揉捻後，才能團揉整形。"
      : "";
  if (id === "dry")
    return has("oxidize")
      ? ""
      : !has("kill") || !has("roll")
        ? "先完成氧化路線與揉捻。"
        : shakeCount() === 2 && !has("ball")
          ? "這條半球形烏龍路線還需要團揉整形。"
          : "";
  if (id === "roast") return "先完成茶葉乾燥。";
  return "這份原料尚未開放此工序。";
}
function taiwanState() {
  let state = {
    color: "嫩綠",
    aroma: "青草氣息",
    texture: "有彈性的葉片",
    water: "高",
    stage: "等待萎凋的茶菁",
    hint: "這份茶菁不急著加熱。讓它稍稍失水，觀察葉子與香氣的變化。",
    art: "taiwan",
  };
  if (steps.includes("wither"))
    Object.assign(state, {
      texture: "柔軟微垂",
      water: "中",
      stage: "葉子慢慢柔軟",
      hint: "現在可以輕輕攪拌，等待花香；也可以先揉捻，看看茶汁接觸空氣後會怎樣。",
      art: "withered",
    });
  if (shakeCount())
    Object.assign(state, {
      color: shakeCount() === 1 ? "綠葉微紅邊" : "綠腹紅邊",
      aroma: shakeCount() === 1 ? "清揚花香" : "花香與柔和果香",
      stage: "香氣正在轉變",
      hint:
        shakeCount() === 1
          ? "花香浮出來了。此時炒菁可以留住它；再攪拌靜置一次，葉緣與香氣還會改變。"
          : "葉緣更紅，花香裡帶些果香。可以炒菁，停止這一段氧化。",
      art: "oxidizing",
    });
  if (steps.includes("kill"))
    Object.assign(state, {
      stage: "以熱留住香氣",
      hint: "炒菁後不再繼續氧化。接下來揉捻，讓茶葉形成條索。",
    });
  if (steps.includes("roll"))
    Object.assign(state, {
      texture: "捲曲條索",
      art: "rolled",
      hint: steps.includes("kill")
        ? shakeCount() === 2
          ? "這批花果香茶可以團揉整形，讓葉子收成半球，再乾燥。"
          : "清揚花香與條索已成形，乾燥便能保存下來。"
        : "茶汁接觸空氣，葉色開始轉深。讓它充分氧化，繼續聞聞香氣。",
    });
  if (steps.includes("oxidize"))
    Object.assign(state, {
      color: "銅紅",
      aroma: "甜熟果香",
      stage: "氧化後的紅色葉底",
      hint: "葉色轉銅紅，香氣帶甜熟果味。接著乾燥，以熱停止氧化並帶走水分。",
      art: "oxidized",
    });
  if (steps.includes("ball"))
    Object.assign(state, {
      texture: "半球形",
      water: "偏低",
      art: "oolong",
      stage: "茶葉收成小球",
      hint: "初乾與反覆團揉讓葉子緊結，還需要最後乾燥。",
    });
  if (steps.includes("dry")) {
    const id = result();
    Object.assign(state, {
      color: id === "black" ? "烏褐" : id === "roastedOolong" ? "褐綠" : "深綠",
      water: "低",
      stage: "完成的台灣茶",
      texture:
        id === "oolong" || id === "roastedOolong" ? "緊結半球" : "乾爽條索",
      art: id,
      hint:
        id === "oolong"
          ? "花果香與半球形葉子都留下了。可以鑑定，也可以再焙煎，探索更溫暖的熟香。"
          : "茶葉已乾爽，可以鑑定入庫，招待客人。",
    });
  }
  if (steps.includes("roast"))
    Object.assign(state, {
      aroma: "熟香與烤穀物香",
      stage: "烘焙後的烏龍",
      hint: "花果香轉為溫暖熟香，葉形依然緊結。這次的變化來自烘焙，不是繼續氧化。",
    });
  return state;
}
const spriteCells = {
  sun: 0,
  mature: 1,
  shade: 2,
  steamed: 3,
  rolled: 4,
  sencha: 5,
  bancha: 6,
  gyokuro: 7,
  tencha: 8,
};
function spriteStyle(id) {
  const valid = [
    "empty",
    ...Object.keys(spriteCells),
    ...Object.keys(teas),
    "taiwan",
    "withered",
    "oxidizing",
    "oxidized",
  ];
  return `background-image:url('assets/simple/tea-${valid.includes(id) ? id : "sun"}.svg');background-size:contain;background-position:center`;
}

function sprite(id, extra = "") {
  return `<span class="tea-sprite ${extra}" style="${spriteStyle(id)}" role="img" aria-label="${teas[id]?.name || materials.find((m) => m.id === id)?.name || "加工中的茶葉"}"></span>`;
}
const customers = [
  {
    name: "來訪的客人",
    role: "散步回來",
    request:
      "沿著茶田走了一圈，還想留住那股清新的草木氣息。不要像烤過的點心，也不用特別濃厚。",
    tags: ["清爽一杯"],
    accept: ["sencha"],
    reward: 25,
    hint: "我記得葉子細細的，香氣像新鮮草木；和那種濃濃的海苔鮮味不一樣。",
    thanks: "就是這個感覺，謝謝你聽懂我想找的茶。",
  },
  {
    name: "來訪的客人",
    role: "雨天歇腳",
    request:
      "雨把衣袖都打濕了。想聞到像烤堅果、剛出爐麵包那樣的香氣，而不是青草味。",
    tags: ["雨中小歇"],
    accept: ["hojicha"],
    reward: 35,
    hint: "那杯茶的葉子不是綠色，倒有些像秋天的栗子殼。",
    thanks: "就是這個感覺，謝謝你聽懂我想找的茶。",
  },
  {
    name: "來訪的客人",
    role: "慢慢品味",
    request:
      "今天不趕時間。想找鮮味深一些、帶海苔般香氣的茶，乾葉要是纖細的，不是碎片。",
    tags: ["靜靜品茶"],
    accept: ["gyokuro"],
    reward: 45,
    hint: "記得它的乾葉深綠，細得像針；我喜歡的重點是鮮味，不是烘烤香。",
    thanks: "就是這個感覺，謝謝你聽懂我想找的茶。",
  },
  {
    name: "來訪的客人",
    role: "家常飯後",
    request:
      "想帶份平日吃飯喝的茶。滋味樸實清淡就好，葉子粗一些也沒關係，不要烘烤香。",
    tags: ["家常日用"],
    accept: ["bancha"],
    reward: 25,
    hint: "我以前喝的那份葉子比較成熟，不是細嫩的新芽，也不是褐色的。",
    thanks: "就是這個感覺，謝謝你聽懂我想找的茶。",
  },
  {
    name: "來訪的客人",
    role: "收集茶樣",
    request:
      "我在做葉形標本。想找乾燥後還保留扁平葉片、帶鮮香的茶樣，不要細針，也不要粉末。",
    tags: ["茶樣採集"],
    accept: ["tencha"],
    reward: 40,
    hint: "想收集的是深綠片狀、帶海苔般香氣的茶葉，不是粗大的日常茶葉。",
    thanks: "就是這個感覺，謝謝你聽懂我想找的茶。",
  },
  {
    name: "來訪的客人",
    role: "野餐之前",
    request:
      "要帶到草地上，想找清新、有嫩葉氣息的一杯。不希望香得像烤餅，鮮味也別太濃。",
    tags: ["野餐準備"],
    accept: ["sencha"],
    reward: 25,
    hint: "我想的是細長的綠色乾葉，喝起來清爽，像延續戶外的草木香。",
    thanks: "就是這個感覺，謝謝你聽懂我想找的茶。",
  },
  {
    name: "來訪的客人",
    role: "打開舊茶罐",
    request:
      "舊茶罐空了。以前一打開就像聞到烤堅果，裡頭的葉片和梗都是褐色。想找回那個味道。",
    tags: ["記憶中的茶"],
    accept: ["hojicha"],
    reward: 35,
    hint: "不是焦苦味，是柔和的烘烤香；綠葉的清新味道不是這次想要的。",
    thanks: "就是這個感覺，謝謝你聽懂我想找的茶。",
  },
  {
    name: "來訪的客人",
    role: "留給自己的午后",
    request:
      "想喝一杯有層次的鮮味茶，讓我小口慢慢喝。偏愛深綠細針，聞起來有一點海苔香。",
    tags: ["午後獨處"],
    accept: ["gyokuro"],
    reward: 45,
    hint: "不需要像烤麵包那樣香，也不是買片狀的研究茶樣。",
    thanks: "就是這個感覺，謝謝你聽懂我想找的茶。",
  },
  {
    name: "來訪的客人",
    role: "準備日常茶罐",
    request:
      "我家的茶罐放的是粗一些的葉子，味道淡淡的，很樸實。今天也想補同樣的，不要烤過。",
    tags: ["補充日用"],
    accept: ["bancha"],
    reward: 25,
    hint: "成熟葉的味道就很合適，嫩芽那種清新細緻倒不是我要找的。",
    thanks: "就是這個感覺，謝謝你聽懂我想找的茶。",
  },
  {
    name: "來訪的客人",
    role: "比較葉片形狀",
    request:
      "帶了一張放大鏡，想看看帶鮮香的深綠茶葉展開的樣子。希望拿到平片，不是捲緊的針。",
    tags: ["觀察葉形"],
    accept: ["tencha"],
    reward: 40,
    hint: "這次買的是茶樣。我想看原本的片狀輪廓，不需要磨成粉。",
    thanks: "就是這個感覺，謝謝你聽懂我想找的茶。",
  },
  {
    name: "來訪的客人",
    role: "清新的記憶",
    request:
      "上回喝了一杯，讓我想到剛經過的春天茶園。細長綠葉、草木清香，沒有濃重的鮮味。",
    tags: ["尋找清香"],
    accept: ["sencha"],
    reward: 25,
    hint: "我會把烘烤味留給下雨天，今天只想要嫩葉的清新。",
    thanks: "就是這個感覺，謝謝你聽懂我想找的茶。",
  },
  {
    name: "來訪的客人",
    role: "搭配烤點心",
    request:
      "帶了些烤餅來，想讓茶也有烘烤香，聞起來能和餅乾接得上，而不是清新草香。",
    tags: ["點心時間"],
    accept: ["hojicha"],
    reward: 35,
    hint: "那種香氣常讓我想到堅果，茶葉看起來也會偏棕褐。",
    thanks: "就是這個感覺，謝謝你聽懂我想找的茶。",
  },
  {
    name: "來訪的客人",
    role: "一份細緻的禮物",
    request:
      "朋友偏愛濃一些的鮮味與海苔般香氣。我記得他茶罐裡是深綠的細針，不是扁片。",
    tags: ["送給朋友"],
    accept: ["gyokuro"],
    reward: 45,
    hint: "他喜歡的是鮮味深的那款，清爽的草木香或烘烤香都不是他的首選。",
    thanks: "就是這個感覺，謝謝你聽懂我想找的茶。",
  },
  {
    name: "來訪的客人",
    role: "整理家中茶架",
    request:
      "細嫩的茶已經夠多了。想添一份成熟葉的家常滋味，清淡樸實，還保留綠葉的感覺。",
    tags: ["茶架補貨"],
    accept: ["bancha"],
    reward: 25,
    hint: "粗葉、帶些梗也很好；但不要把味道變成烤堅果。",
    thanks: "就是這個感覺，謝謝你聽懂我想找的茶。",
  },
  {
    name: "來訪的客人",
    role: "準備茶葉講座",
    request:
      "講座缺了一份平片茶樣：深綠、帶鮮香，可以和針狀茶葉作對照。不要粉末或褐色碎葉。",
    tags: ["講座用樣"],
    accept: ["tencha"],
    reward: 40,
    hint: "這份樣品要能看見平展的葉片，聞起來偏海苔鮮香。",
    thanks: "就是這個感覺，謝謝你聽懂我想找的茶。",
  },
  {
    name: "來訪的客人",
    role: "換個清爽口味",
    request:
      "昨天的茶鮮味很濃，今天想換清新一點的。嫩葉草木香就好，細長綠葉的那種。",
    tags: ["換個口味"],
    accept: ["sencha"],
    reward: 25,
    hint: "不想選烘烤味，也不是成熟粗葉的淡樸滋味。",
    thanks: "就是這個感覺，謝謝你聽懂我想找的茶。",
  },
  {
    name: "來訪的客人",
    role: "尋找溫暖香氣",
    request:
      "不一定要很燙，但聞起來想要暖暖的，像乾燥木頭與烤堅果。綠色草香就先不要了。",
    tags: ["香氣的溫度"],
    accept: ["hojicha"],
    reward: 35,
    hint: "我的線索是香味，不是茶水溫度；記憶中的葉子已經偏褐色。",
    thanks: "就是這個感覺，謝謝你聽懂我想找的茶。",
  },
  {
    name: "來訪的客人",
    role: "品茶練習",
    request:
      "想練習辨認鮮味，找海苔般香氣明顯的一份。最好是深綠細針，能和片狀茶樣分開比較。",
    tags: ["辨味練習"],
    accept: ["gyokuro"],
    reward: 45,
    hint: "清新的草木香還不夠，我這回想把注意力放在更濃的鮮味上。",
    thanks: "就是這個感覺，謝謝你聽懂我想找的茶。",
  },
  {
    name: "來訪的客人",
    role: "帶回家共飲",
    request:
      "不用挑最嫩的。家人喜歡成熟粗葉淡淡的樸實味道，平常就這樣喝，也不愛烘烤香。",
    tags: ["一家人的茶"],
    accept: ["bancha"],
    reward: 25,
    hint: "葉子粗一些不影響我的選擇，主要是想要那份清淡日常感。",
    thanks: "就是這個感覺，謝謝你聽懂我想找的茶。",
  },
  {
    name: "來訪的客人",
    role: "製作觀察筆記",
    request:
      "我的筆記有細針與粗葉，還缺帶鮮香的深綠扁片。能給我一份完整看得見葉形的茶樣嗎？",
    tags: ["補齊標本"],
    accept: ["tencha"],
    reward: 40,
    hint: "我會把它和針狀茶並排觀察，因此不能是捲緊的，也不要粉末。",
    thanks: "就是這個感覺，謝謝你聽懂我想找的茶。",
  },
  {
    name: "來訪的客人",
    role: "一杯不帶火香的茶",
    request:
      "今天只想喝綠葉的味道，清新一點或樸實一點都好。不要烘烤香，也不想要濃厚鮮味。",
    tags: ["不拘一款"],
    accept: ["sencha", "bancha"],
    reward: 25,
    hint: "嫩葉的草木清香或成熟葉的清淡滋味，我都能接受。",
    thanks: "就是這個感覺，謝謝你聽懂我想找的茶。",
  },
  {
    name: "來訪的客人",
    role: "為朋友準備兩種口味",
    request:
      "朋友有人愛清新草木香，有人喜歡海苔般鮮味。先買其中一種細針茶都可以，不要片狀或烤香。",
    tags: ["留些選擇"],
    accept: ["sencha", "gyokuro"],
    reward: 30,
    hint: "只要是綠色細長乾葉，清爽或鮮味濃都可以，不一定只有一個答案。",
    thanks: "就是這個感覺，謝謝你聽懂我想找的茶。",
  },
  {
    name: "來訪的客人",
    role: "研究鮮香茶葉",
    request:
      "我想研究海苔般的鮮香。細針或平片都可以，只要是深綠、鮮味系的茶樣，別給我烤香的。",
    tags: ["風味研究"],
    accept: ["gyokuro", "tencha"],
    reward: 35,
    hint: "這次接受兩種葉形；我在意的是相近的鮮香特色。",
    thanks: "就是這個感覺，謝謝你聽懂我想找的茶。",
  },
  {
    name: "來訪的客人",
    role: "日常茶的兩種心情",
    request:
      "喜歡成熟葉樸實的滋味，也喜歡茶葉烤過後的堅果香。這兩種方向，今天任一種都很好。",
    tags: ["隨心選茶"],
    accept: ["bancha", "hojicha"],
    reward: 25,
    hint: "清淡粗葉或褐色烤香都合適；清新嫩葉與濃厚鮮味不是今天的選擇。",
    thanks: "就是這個感覺，謝謝你聽懂我想找的茶。",
  },
  {
    name: "來訪的客人",
    role: "挑選針狀茶樣",
    request:
      "今天只收細長針狀的綠色茶樣，清新或鮮味濃都沒關係。不要粗片、平片，也不要褐色的。",
    tags: ["葉形優先"],
    accept: ["sencha", "gyokuro"],
    reward: 30,
    hint: "這次看葉形多於香氣，兩種細針綠茶我都收。",
    thanks: "就是這個感覺，謝謝你聽懂我想找的茶。",
  },
];
customers.push(
  ...[
    {
      name: "來訪的客人",
      role: "追尋花香",
      request:
        "想找台灣的清揚花香茶，乾葉是鬆鬆的捲曲條索，不要小球，也不要烘烤香。",
      tags: ["台灣茶時光"],
      accept: ["baozhong"],
      reward: 40,
      hint: "花香輕盈，葉形是自然條索，和深綠細針的鮮味茶不一樣。",
      thanks: "這份台灣茶的香氣，正是我想找的。",
    },
    {
      name: "來訪的客人",
      role: "窗邊讀書",
      request:
        "想喝清香的台灣茶，葉子緊緊收成小球，帶花香與柔和果香，先不要火香。",
      tags: ["台灣茶時光"],
      accept: ["oolong"],
      reward: 40,
      hint: "我喜歡半球形葉子舒展的樣子，這次保留清香就好。",
      thanks: "這份台灣茶的香氣，正是我想找的。",
    },
    {
      name: "來訪的客人",
      role: "午後烤餅",
      request:
        "想配一份台灣的球形茶，帶熟香和烤穀物的感覺。不要褐色碎葉與茶梗的那款。",
      tags: ["台灣茶時光"],
      accept: ["roastedOolong"],
      reward: 45,
      hint: "我記得乾葉仍是緊結小球，清香外多了溫暖的熟香。",
      thanks: "這份台灣茶的香氣，正是我想找的。",
    },
    {
      name: "來訪的客人",
      role: "尋找紅色茶湯",
      request:
        "今天想要台灣紅茶那類的甜熟果香，乾葉深色捲曲，沖開後葉底偏紅，不想要烤香。",
      tags: ["台灣茶時光"],
      accept: ["black"],
      reward: 40,
      hint: "我找的是氧化帶出的甜熟香，不是用火烤出來的堅果味。",
      thanks: "這份台灣茶的香氣，正是我想找的。",
    },
    {
      name: "來訪的客人",
      role: "買份花香茶",
      request:
        "以前收到一份台灣條形茶，清揚花香很難忘。葉子不是球狀，味道也沒有厚重烤香。",
      tags: ["台灣茶時光"],
      accept: ["baozhong"],
      reward: 40,
      hint: "茶樣是綠色捲曲條索，聞起來清新帶花香。",
      thanks: "這份台灣茶的香氣，正是我想找的。",
    },
    {
      name: "來訪的客人",
      role: "記憶中的小茶球",
      request:
        "茶罐空了，裡面原本是台灣清香小茶球，帶柔和花果香，沒有烘焙熟香。",
      tags: ["台灣茶時光"],
      accept: ["oolong"],
      reward: 40,
      hint: "我想補的是球形清香茶，並不是細針狀的海苔鮮味茶。",
      thanks: "這份台灣茶的香氣，正是我想找的。",
    },
    {
      name: "來訪的客人",
      role: "想換熟香口味",
      request:
        "平常喝台灣清香球形茶，這次想葉形相似，但香氣更暖一些，像烤過的穀物。",
      tags: ["台灣茶時光"],
      accept: ["roastedOolong"],
      reward: 45,
      hint: "保留烏龍小球的樣子，香氣則多了熟香。",
      thanks: "這份台灣茶的香氣，正是我想找的。",
    },
    {
      name: "來訪的客人",
      role: "一杯甜熟香",
      request:
        "想找台灣的深色條索茶，葉底沖開會紅，香氣偏甜熟果味，不要濃海苔香或烘烤味。",
      tags: ["台灣茶時光"],
      accept: ["black"],
      reward: 40,
      hint: "我的重點是紅色葉底與甜熟果香，乾葉不必是球形。",
      thanks: "這份台灣茶的香氣，正是我想找的。",
    },
    {
      name: "來訪的客人",
      role: "台灣茶葉標本",
      request:
        "想收集台灣輕盈花香的條形茶，能看清自然捲曲的葉形，不要緊結球形。",
      tags: ["台灣茶時光"],
      accept: ["baozhong"],
      reward: 40,
      hint: "這份茶樣應該偏綠、帶清揚花香，不是紅茶的烏褐條索。",
      thanks: "這份台灣茶的香氣，正是我想找的。",
    },
    {
      name: "來訪的客人",
      role: "清香的禮物",
      request:
        "要送朋友一份台灣茶，他喜歡小球般的乾葉、花果清香，不喜歡烘烤味。",
      tags: ["台灣茶時光"],
      accept: ["oolong"],
      reward: 40,
      hint: "清香就很好，不必另外帶出穀物熟香。",
      thanks: "這份台灣茶的香氣，正是我想找的。",
    },
    {
      name: "來訪的客人",
      role: "雨天的台灣茶",
      request:
        "下雨時想喝台灣球形茶，讓熟香與烤穀物氣息陪我坐一會兒。清香的那款改天再喝。",
      tags: ["台灣茶時光"],
      accept: ["roastedOolong"],
      reward: 45,
      hint: "我記得茶葉是緊緊的小球，不是散開的褐色梗片。",
      thanks: "這份台灣茶的香氣，正是我想找的。",
    },
    {
      name: "來訪的客人",
      role: "辨認氧化香",
      request: "想用台灣茶練習辨認甜熟果香，茶湯與葉底都偏紅，乾葉是深色條索。",
      tags: ["台灣茶時光"],
      accept: ["black"],
      reward: 40,
      hint: "不是靠烘烤得到的香味，葉子本身的氧化變化才是我要觀察的。",
      thanks: "這份台灣茶的香氣，正是我想找的。",
    },
  ],
);
let discovered = {},
  batch = 1,
  material = null,
  steps = [],
  inventory = {},
  coins = 0,
  served = 0,
  customerIndex = 0,
  selectedTea = null,
  storedTea = null,
  customerReady = false,
  arrivalTimer = null,
  arrivalPending = true,
  nextVisit = false,
  customerArt = 0,
  recentRequests = [];
try {
  const saved = JSON.parse(localStorage.getItem("one-leaf-save-v1"));
  if (saved && typeof saved === "object") {
    for (const id of Object.keys(teas))
      if (saved.discovered?.[id]) discovered[id] = saved.discovered[id];
    if (Number.isInteger(saved.batch) && saved.batch > 0) batch = saved.batch;
  }
} catch {}
try {
  const shop = JSON.parse(localStorage.getItem("one-leaf-shop-v2"));
  if (shop) {
    for (const id of Object.keys(teas)) {
      const n = shop.inventory?.[id];
      if (Number.isInteger(n) && n >= 0) inventory[id] = n;
    }
    for (const [key, set] of [
      ["coins", (v) => (coins = v)],
      ["served", (v) => (served = v)],
      ["customerIndex", (v) => (customerIndex = v)],
    ])
      if (Number.isSafeInteger(shop[key]) && shop[key] >= 0) set(shop[key]);
  }
} catch {}
const $ = (id) => document.getElementById(id);
// Economy numbers are intentionally centralized for balancing.
const economy = {
  initial: 180,
  duration: 180,
  materials: { sun: 6, mature: 4, shade: 12, taiwan: 8 },
  actions: {
    steam: 2,
    roll: 2,
    dry: 2,
    roast: 3,
    wither: 1,
    shake: 1,
    kill: 2,
    oxidize: 2,
    ball: 3,
  },
};
let businessPhase = "prep",
  businessDay = 1,
  remaining = economy.duration;
let dayCosts = 0,
  dayRevenue = 0,
  daySales = 0,
  totalCosts = 0,
  totalRevenue = 0,
  totalSales = 0,
  batchCost = 0,
  paused = false,
  settlementComplete = false;
try {
  const business = JSON.parse(localStorage.getItem("one-leaf-business-v3"));
  if (business) {
    businessPhase = ["prep", "open", "closed"].includes(business.phase)
      ? business.phase
      : "prep";
    businessDay = Math.max(1, Number(business.day) || 1);
    remaining = Math.max(
      0,
      Math.min(economy.duration, Number(business.remaining) || 0),
    );
    if (Number.isFinite(business.coins) && business.coins >= 0)
      coins = business.coins;
    if (business.inventory)
      inventory = Object.fromEntries(
        Object.keys(teas).map((id) => [
          id,
          Math.max(0, Math.floor(Number(business.inventory[id]) || 0)),
        ]),
      );
    if (Number.isInteger(business.served)) served = business.served;
    dayCosts = Number(business.costs) || 0;
    dayRevenue = Number(business.revenue) || 0;
    daySales = Number(business.sales) || 0;
    totalCosts = Number.isFinite(business.totalCosts)
      ? business.totalCosts
      : dayCosts;
    totalRevenue = Number.isFinite(business.totalRevenue)
      ? business.totalRevenue
      : dayRevenue;
    totalSales = Number.isFinite(business.totalSales)
      ? business.totalSales
      : daySales;
    settlementComplete = business.settlementComplete === true;
    batchCost = Number(business.batchCost) || 0;
    if (materials.some((m) => m.id === business.material))
      material = business.material;
    steps = Array.isArray(business.steps)
      ? business.steps.filter((id) => actions.some((a) => a.id === id))
      : [];
    storedTea = teas[business.storedTea] ? business.storedTea : null;
  } else coins += economy.initial;
} catch {
  coins += economy.initial;
}
function spend(amount) {
  if (coins < amount) return false;
  coins -= amount;
  dayCosts += amount;
  totalCosts += amount;
  batchCost += amount;
  return true;
}
function renderBusiness() {
  workshop.renderMission();
  document
    .querySelector(".shop-scene")
    .classList.toggle("shop-open", businessPhase === "open");
  $("business-panel").hidden = businessPhase === "open";
  $("customer-art").hidden = businessPhase !== "open";
  $("business-title").textContent =
    businessPhase === "closed" ? "今天辛苦了" : "開店前的備茶時間";
  $("business-note").textContent =
    businessPhase === "closed"
      ? `今日售出 ${daySales} 份 · 收入 ${dayRevenue} · 成本 ${dayCosts} · 淨額 ${dayRevenue - dayCosts}。剩下的茶會保留。`
      : "備茶不限時，原料與加工會花費茶錢。開店後營業三分鐘。";
  $("open-shop").hidden = businessPhase !== "prep";
  $("next-day").hidden = businessPhase !== "closed";
  $("next-day").textContent =
    businessDay >= 5 && !settlementComplete ? "查看五日結算" : "開始下一天";
  $("business-toggle").hidden = businessPhase !== "open";
  $("business-toggle").textContent = paused ? "繼續營業" : "暫停";
  $("support").hidden = !(
    coins < 18 && !Object.values(inventory).some((n) => n > 0)
  );
  $("batch-cost").textContent = `這批成本 ${batchCost}`;
  $("day").textContent = `第 ${businessDay} 日`;
  renderClock();
}
function timerPaused() {
  return (
    paused ||
    document.hidden ||
    $("modal").open ||
    $("material-picker").open ||
    !$("atlas").hidden
  );
}
function renderClock() {
  const seconds = Math.ceil(remaining);
  const clockText =
    businessPhase === "open"
      ? `${timerPaused() ? "暫停 " : ""}${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`
      : businessPhase === "prep"
        ? "備茶中"
        : "已打烊";
  if ($("business-clock").textContent !== clockText)
    $("business-clock").textContent = clockText;
}
function endDay() {
  businessPhase = "closed";
  customerReady = false;
  clearTimeout(arrivalTimer);
  arrivalPending = false;
  paused = false;
  save();
  render();
  if (businessDay >= 5 && !settlementComplete) showSettlement();
}
$("open-shop").onclick = () => {
  businessPhase = "open";
  remaining = economy.duration;
  paused = false;
  arriveCustomer(true);
  render();
  save();
};
$("next-day").onclick = () => {
  if (businessDay >= 5 && !settlementComplete) {
    showSettlement();
    return;
  }
  businessDay++;
  businessPhase = "prep";
  dayCosts = dayRevenue = daySales = 0;
  remaining = economy.duration;
  save();
  render();
};
function showSettlement() {
  const found = Object.keys(discovered).filter((id) => teas[id]).length;
  const net = totalRevenue - totalCosts;
  modal(
    `<p class="eyebrow">五日營業結算</p>
     <h2>五天的茶屋日記</h2>
     <p>這五天做出的每一批茶與招待過的客人，都成為茶屋的新紀錄。</p>
     <div class="settlement-grid">
       <span>營業收入<strong>${totalRevenue}</strong><small>茶錢</small></span>
       <span>製茶支出<strong>${totalCosts}</strong><small>茶錢</small></span>
       <span>最終收益<strong class="${net >= 0 ? "positive" : "negative"}">${net >= 0 ? "+" : ""}${net}</strong><small>茶錢</small></span>
       <span>成功招待<strong>${totalSales}</strong><small>位客人</small></span>
       <span>圖鑑收集<strong>${found} / ${Object.keys(teas).length}</strong><small>種茶</small></span>
       <span>現有茶錢<strong>${coins}</strong><small>茶錢</small></span>
     </div>
     <button id="settlement-continue" class="primary">繼續自由經營</button>
     <button id="settlement-restart" class="quiet">開始新的五日營業</button>`,
  );
  $("settlement-continue").onclick = () => {
    settlementComplete = true;
    businessDay++;
    businessPhase = "prep";
    dayCosts = dayRevenue = daySales = 0;
    remaining = economy.duration;
    save();
    $("modal").close();
    render();
  };
  $("settlement-restart").onclick = () => {
    settlementComplete = false;
    businessDay = 1;
    businessPhase = "prep";
    dayCosts = dayRevenue = daySales = 0;
    totalCosts = totalRevenue = totalSales = 0;
    remaining = economy.duration;
    save();
    $("modal").close();
    render();
  };
}
$("business-toggle").onclick = () => {
  paused = !paused;
  render();
};
$("support").onclick = () => {
  if (coins >= 18 || Object.values(inventory).some((n) => n > 0)) return;
  coins = 40;
  save();
  render();
};
let lastTick = Date.now();
document.addEventListener("visibilitychange", () => {
  lastTick = Date.now();
});
setInterval(() => {
  const now = Date.now();
  if (businessPhase === "open" && !timerPaused()) {
    remaining = Math.max(0, remaining - (now - lastTick) / 1000);
    if (!remaining) endDay();
    else save();
  }
  lastTick = now;
  renderClock();
}, 250);

function save() {
  try {
    localStorage.setItem(
      "one-leaf-business-v3",
      JSON.stringify({
        workshop: workshop.data,
        phase: businessPhase,
        day: businessDay,
        remaining,
        coins,
        inventory,
        served,
        costs: dayCosts,
        revenue: dayRevenue,
        sales: daySales,
        totalCosts,
        totalRevenue,
        totalSales,
        settlementComplete,
        batchCost,
        material,
        steps,
        storedTea,
      }),
    );
    localStorage.setItem(
      "one-leaf-save-v1",
      JSON.stringify({ discovered, batch }),
    );
    localStorage.setItem(
      "one-leaf-shop-v2",
      JSON.stringify({ inventory, coins, served, customerIndex }),
    );
  } catch {
    $("save-state").textContent = "瀏覽器無法儲存；本次探索仍可繼續。";
  }
}
function baseTea() {
  if (taiwanBatch()) {
    if (!steps.includes("dry")) return null;
    if (
      steps.includes("oxidize") &&
      !steps.includes("kill") &&
      steps.includes("roll")
    )
      return "black";
    if (steps.includes("kill") && steps.includes("roll"))
      return shakeCount() === 1
        ? "baozhong"
        : shakeCount() === 2 && steps.includes("ball")
          ? "oolong"
          : null;
    return null;
  }
  if (!steps.includes("steam") || !steps.includes("dry")) return null;
  if (material === "shade")
    return steps.includes("roll") ? "gyokuro" : "tencha";
  if (!steps.includes("roll")) return null;
  return material === "sun" ? "sencha" : "bancha";
}
function result() {
  const base = baseTea();
  return steps.includes("roast")
    ? base === "oolong"
      ? "roastedOolong"
      : "hojicha"
    : base;
}
function reason(id) {
  if (workshop.data.active && workshop.data.active.id !== id)
    return "先完成或取消目前的手作工序。";
  if (businessPhase === "closed") return "今天已打烊，請開始下一天。";
  if (paused) return "營業暫停中。";
  if (coins < (economy.actions[id] || 0)) return "茶錢不足，無法加工。";
  if (!material) return "先點中央茶盤，選一份原料。";
  if (!actions.some((action) => action.id === id)) return "沒有這個加工道具。";
  if (taiwanBatch()) return taiwanReason(id);
  if (["wither", "shake", "kill", "oxidize", "ball"].includes(id))
    return "請選台灣茶菁，探索這道工序。";
  if (steps.includes(id)) return "這批茶葉已經完成這道工序。";
  if (id === "steam" && steps.length) return "蒸製需要在新鮮葉階段進行。";
  if (id === "roll" && !steps.includes("steam"))
    return "鮮葉還有青草味，先蒸製讓葉子軟化，再進行揉捻。";
  if (id === "roll" && steps.includes("dry"))
    return "乾葉已變脆，無法再揉捻；下一批試著在乾燥前揉捻。";
  if (id === "dry" && !steps.includes("steam"))
    return "先蒸製，抑制葉子持續氧化，再觀察乾燥的變化。";
  if (id === "roast" && !steps.includes("dry"))
    return "葉子仍有太多水分。先完成乾燥，才能觀察焙煎的烘烤香。";
  if (id === "roast" && !["sencha", "bancha"].includes(baseTea()))
    return "本次實驗的焙煎設備開放給完成的煎茶或番茶。試試日照嫩葉或成熟葉，蒸製、揉捻後乾燥。";
  return "";
}
function render() {
  $("materials").innerHTML = materials
    .map(
      (m) =>
        `<button class="material ${m.id === material ? "selected" : ""}" data-material="${m.id}" aria-pressed="${m.id === material}">${sprite(m.id)}<span><strong>${m.name}</strong><small>${m.sub} · ${economy.materials[m.id]} 茶錢</small></span><i class="radio">${m.id === material ? "✓" : ""}</i></button>`,
    )
    .join("");
  const tools = availableActions();
  const halfway = Math.ceil(tools.length / 2);
  $("actions").innerHTML = tools
    .map((action, index) => {
      const why = reason(action.id);
      const done =
        steps.includes(action.id) &&
        (action.id !== "shake" || shakeCount() === 2);
      const right = index >= halfway;
      const localIndex = right ? index - halfway : index;
      const column = (right ? 4 : 1) + (localIndex % 2);
      const row = Math.floor(localIndex / 2) + 1;
      const label = done
        ? "已完成"
        : !material
          ? "先選茶葉"
          : why
            ? "尚未就緒"
            : action.id === "shake"
              ? `${shakeCount()} / 2 次`
              : "拖入或點擊";
      return `
      <button
        class="action ${why ? "" : "available"}"
        data-action="${action.id}"
        style="grid-column:${column};grid-row:${row};--mobile-col:${right ? 3 : 1};--mobile-row:${localIndex + 1}"
        ${why ? "disabled" : ""}
        title="${why || action.sub}"
        aria-label="${action.name}"
      >
        <img src="assets/simple/tools/${action.id}.svg" alt="" draggable="false" />
        <strong>${action.name}</strong>
        <small>${label} · ${economy.actions[action.id]} 茶錢</small>
        <span class="tool-status" aria-hidden="true">${done ? "✓" : why ? "·" : "+"}</span>
      </button>`;
    })
    .join("");
  $("identify").disabled =
    paused ||
    businessPhase === "closed" ||
    !steps.includes("dry") ||
    storedTea === result();
  $("restart").disabled = paused || businessPhase === "closed";
  $("identify").textContent =
    storedTea === result() && storedTea
      ? "✓ 這批已入庫"
      : steps.includes("dry")
        ? "✧ 鑑定茶葉並入庫"
        : "乾燥後就能鑑定";
  $("phase").textContent = steps.includes("dry")
    ? "③ 揭曉成品"
    : steps.length
      ? "② 觀察與加工"
      : "① 選好原料";
  $("quest").textContent =
    Object.keys(discovered).length === teaTotal
      ? "所有筆記都完成了！再試試不同的原料。"
      : material === "shade" && steps.length === 1
        ? "葉子要捲起來，還是保留片狀？選一條路試試。"
        : steps.includes("dry")
          ? storedTea
            ? "已放上櫃檯。選一份茶，再按「端給客人」。"
            : "茶葉乾爽了！鑑定入庫後，就能端給客人。"
          : steps.includes("roll")
            ? "葉子已捲起來，接著讓水分散去。"
            : steps.includes("steam")
              ? "觀察蒸後的葉子，再挑一件亮起的工具。"
              : "原料已放上工作台。點「蒸製」，開始第一道加工。";
  $("batch").textContent = `實驗 No. ${String(batch).padStart(3, "0")}`;
  $("material-label").textContent =
    materials.find((m) => m.id === material)?.desc ||
    "選擇原料，開始一批新的實驗";
  let state = {
    color: "鮮綠",
    aroma: "青草香",
    texture: "柔軟飽滿",
    water: "高",
    stage: "剛採下的鮮葉",
    hint: "鮮葉帶著明顯的青草氣息。先用蒸氣加熱，看看葉子會有什麼變化？",
  };
  if (steps.includes("steam"))
    Object.assign(state, {
      color: "深綠",
      aroma: "清新草木香",
      texture: "柔軟溫潤",
      stage: "蒸氣中的一抹綠",
      hint:
        material === "shade"
          ? "這裡有兩條路：揉捻，讓葉子捲成細針；或跳過揉捻，直接乾燥，保留片狀。兩種都能做出茶，不需要按完所有工具！"
          : "葉子變柔軟，青草味減弱了。揉捻能讓茶汁釋出，也讓葉形逐漸收緊。",
    });
  if (steps.includes("roll"))
    Object.assign(state, {
      texture: "細長捲曲",
      water: "中",
      stage: "葉子漸漸收緊",
      hint: "葉片捲成細長形，表面微微濕潤。讓水分散去，香氣或許就能留下來。",
    });
  if (steps.includes("dry"))
    Object.assign(state, {
      color: "墨綠",
      water: "低",
      texture:
        material === "mature"
          ? "乾爽粗葉"
          : steps.includes("roll")
            ? "乾爽針狀"
            : "乾爽片狀",
      aroma:
        material === "shade"
          ? "海苔與鮮香"
          : material === "mature"
            ? "清淡草木香"
            : "清新茶香",
      stage: "乾燥後的茶葉",
      hint: baseTea()
        ? ["sun", "mature"].includes(material)
          ? "茶葉已乾爽，可以鑑定了。也可以繼續焙煎，看看清香會轉向哪裡。"
          : "葉子乾爽，鮮香變得清晰。現在可以鑑定，記下遮陰原料的可能性。"
        : "葉子乾了，但沒有揉捻成形。本原型尚未收錄這個成品；下一批可以在乾燥前揉捻。",
    });
  if (steps.includes("roast"))
    Object.assign(state, {
      color: "栗褐",
      aroma: "堅果烘烤香",
      texture: "乾燥酥脆",
      stage: "熱火喚醒了烘烤香",
      hint: discovered.hojicha
        ? "熟悉的栗褐色與烘烤香！不同的原料，也能走向同一杯ほうじ茶。"
        : "綠色漸漸轉成栗褐，出現烘烤堅果的香氣。這還是剛才那杯綠茶嗎？",
    });
  if (taiwanBatch()) {
    state = taiwanState();
    $("quest").textContent = steps.includes("dry")
      ? storedTea
        ? "這批已入庫，可以選茶招待客人。"
        : "茶葉乾爽了，可以鑑定入庫。"
      : "觀察香氣與葉緣，選擇下一道加工。";
  }
  if (!material) {
    state = {
      color: "—",
      aroma: "—",
      texture: "—",
      water: "—",
      stage: "空著的茶盤",
      art: "empty",
      hint: "點中央茶盤選原料，再把茶葉拖到亮起的道具。也可以直接點道具加工。",
    };
    $("phase").textContent = "① 選一份原料";
    $("quest").textContent = "點茶盤，挑一片葉子。";
  }
  $("tea-tray").setAttribute(
    "aria-label",
    material ? "茶葉放置區：拖向道具加工，點擊換原料" : "選擇原料",
  );
  $("tray-instruction").textContent = material
    ? "拖向道具加工 · 點此換葉"
    : "＋ 點茶盤選原料";
  for (const k of ["color", "aroma", "texture", "water", "hint"])
    $(k).textContent = state[k];
  $("stage-label").textContent = state.stage;
  $("tea-art").setAttribute(
    "aria-label",
    `茶碟中的茶葉：${state.color}、${state.texture}`,
  );
  $("tea-art").style.cssText = spriteStyle(
    state.art ||
      result() ||
      (steps.includes("roll")
        ? "rolled"
        : steps.includes("steam")
          ? "steamed"
          : material),
  ).replace("assets/simple/tea-", "assets/simple/leaves/tea-");
  document.querySelector(".tray-scene").className =
    "tray-scene " +
    (!material ? "empty " : "") +
    (steps.includes("roll") ? "leaf-rolled " : "") +
    (steps.includes("roast")
      ? "roasted"
      : steps.includes("dry")
        ? "dried"
        : steps.includes("roll")
          ? "rolled"
          : steps.includes("steam")
            ? "steaming"
            : "");
  $("steps").textContent = steps.length
    ? "鮮葉 → " +
      steps.map((s) => actions.find((a) => a.id === s).name).join(" → ")
    : "鮮葉 → 等待你的第一步";
  const n = Object.keys(discovered).length;
  $("count").textContent = String(n).padStart(2, "0");
  $("total-count").textContent = teaTotal;
  $("nav-count").textContent = `${n} / ${teaTotal}`;
  renderGraph();
  renderShop();
  workshop.decorate();
}
function node(id) {
  return `<button class="tea-node ${discovered[id] ? "" : "locked"}" data-tea="${id}">${discovered[id] ? sprite(id) + teas[id].name : "◇ 尚待發現"}</button>`;
}
function renderGraph() {
  $("graph").innerHTML =
    [
      ["日照嫩葉", "蒸製 → 揉捻 → 乾燥", "sencha"],
      ["成熟茶葉（較晚採摘）", "蒸製 → 揉捻 → 乾燥", "bancha"],
      ["遮陰嫩葉", "蒸製 → 揉捻 → 乾燥", "gyokuro"],
      ["遮陰嫩葉", "蒸製 → 不揉捻 → 乾燥", "tencha"],
      ["台灣茶菁", "萎凋 → 攪拌 × 1 → 炒菁 → 揉捻 → 乾燥", "baozhong"],
      ["台灣茶菁", "萎凋 → 攪拌 × 2 → 炒菁 → 揉捻 → 團揉 → 乾燥", "oolong"],
      ["台灣茶菁", "萎凋 → 揉捻 → 充分氧化 → 乾燥", "black"],
    ]
      .map(
        ([s, p, id]) =>
          `<div class="graph-row"><div class="source">原料來源 · ${s}</div><div class="edge">┄┄┄ ${discovered[id] ? p : "觀察葉子，尋找路徑"} ┄┄→</div>${node(id)}</div>`,
      )
      .join("") +
    `<div class="roast-link"><p>${discovered.sencha ? "煎茶" : "未發現的綠茶"} ＋ ${discovered.bancha ? "番茶" : "未發現的綠茶"}<br>│<br>各自經過焙煎 ↓</p>${node("hojicha")}<p>兩條獨立的焙煎路徑，不需要混合兩種茶。</p></div><div class="roast-link"><p>${discovered.oolong ? "清香烏龍" : "尚待發現的台灣茶"} ── 焙煎 ↓</p>${node("roastedOolong")}<p>烘焙與鮮葉氧化是不同的變化。</p></div>`;
}
function modal(html) {
  $("modal-content").innerHTML = html;
  if (!$("modal").open) $("modal").showModal();
}
function showTea(id, isNew = false) {
  const t = teas[id];
  modal(
    `<p class="eyebrow">${isNew ? "NEW DISCOVERY · 新的一頁" : "TEA FIELD NOTES"}</p>${sprite(id)}<h2>${t.name}</h2><span class="eyebrow">${t.jp}</span><p>${t.desc}</p><p class="recipe">${t.recipe}</p><p>${t.relation}</p><p class="muted">${processNotes[id]}</p>${discovered[id]?.route ? "<p>首次發現的足跡：" + discovered[id].route + "</p>" : ""}<button class="primary" id="modal-atlas">查看它在關係圖中的位置 ↗</button>`,
  );
  $("modal-atlas").onclick = () => {
    $("modal").close();
    view("atlas");
  };
}
function view(v) {
  $("lab").hidden = v !== "lab";
  $("atlas").hidden = v !== "atlas";
  document
    .querySelectorAll(".nav")
    .forEach((b) => b.classList.toggle("active", b.dataset.view === v));
}
function restart(id = material) {
  if (workshop.data.active) return false;
  if (businessPhase === "closed" || paused) return false;
  if (!economy.materials[id] || coins < economy.materials[id]) {
    showFeedback("茶錢不足，請選較便宜的原料或領取備茶補助。");
    return false;
  }
  batchCost = 0;
  spend(economy.materials[id]);
  material = id;
  workshop.data.location = null;
  steps = [];
  storedTea = null;
  batch++;
  save();
  render();
}
// Raw materials are selected in a dialog instead of occupying table space.
function openMaterialPicker() {
  if (workshop.data.active) return;
  $("material-warning").hidden = !material;
  $("material-picker").showModal();
}
$("materials").onclick = (event) => {
  const button = event.target.closest("[data-material]");
  if (!button) return;
  if (restart(button.dataset.material) !== false) $("material-picker").close();
};
$("close-material").onclick = () => $("material-picker").close();

// Click, keyboard activation and dragging all use the same validated operation.
function processAction(id) {
  if (workshop.data.active) return false;
  const why = reason(id);
  if (why) {
    $("hint").textContent = why;
    return false;
  }
  spend(economy.actions[id]);
  if (storedTea) {
    inventory[storedTea]--;
    storedTea = null;
  }
  steps.push(id);
  save();
  render();
  return true;
}
$("actions").onclick = (event) => {
  const button = event.target.closest("[data-action]");
  if (button && !workshop.suppressClick) workshop.begin(button.dataset.action);
};

// Pointer events work with mouse, touch and pen; invalid drops never mutate tea.
let drag = null;
let suppressTrayClick = false;
const tray = $("tea-tray");
tray.onclick = () => {
  if (!suppressTrayClick && !workshop.suppressClick) {
    if (workshop.data.location && !workshop.data.active)
      workshop.returnToTray();
    else openMaterialPicker();
  }
};
tray.addEventListener("pointerdown", (event) => {
  if (!material || workshop.data.location || event.button !== 0) return;
  drag = {
    pointerId: event.pointerId,
    x: event.clientX,
    y: event.clientY,
    ghost: null,
    target: null,
  };
  tray.setPointerCapture(event.pointerId);
});
tray.addEventListener("pointermove", (event) => {
  if (!drag || drag.pointerId !== event.pointerId) return;
  if (
    !drag.ghost &&
    Math.hypot(event.clientX - drag.x, event.clientY - drag.y) < 8
  )
    return;
  if (!drag.ghost) {
    drag.ghost = document.createElement("div");
    drag.ghost.className = "drag-ghost tea-sprite";
    drag.ghost.style.cssText = $("tea-art").style.cssText;
    drag.ghost.setAttribute("aria-hidden", "true");
    document.body.append(drag.ghost);
    document.body.classList.add("dragging");
  }
  drag.ghost.style.left = `${event.clientX}px`;
  drag.ghost.style.top = `${event.clientY}px`;
  drag.target?.classList.remove("drop-target");
  drag.target =
    document
      .elementFromPoint(event.clientX, event.clientY)
      ?.closest("[data-action]") || null;
  if (drag.target && !reason(drag.target.dataset.action))
    drag.target.classList.add("drop-target");
});
function endTeaDrag(event, cancelled = false) {
  if (!drag || event.pointerId !== drag.pointerId) return;
  const completedDrag = drag;
  drag = null;
  if (tray.hasPointerCapture(event.pointerId))
    tray.releasePointerCapture(event.pointerId);
  completedDrag.target?.classList.remove("drop-target");
  document.body.classList.remove("dragging");
  completedDrag.ghost?.remove();
  if (completedDrag.ghost) {
    suppressTrayClick = true;
    setTimeout(() => {
      suppressTrayClick = false;
    }, 0);
    if (!cancelled && completedDrag.target)
      workshop.begin(completedDrag.target.dataset.action);
  }
}
tray.addEventListener("pointerup", (event) => endTeaDrag(event));
tray.addEventListener("pointercancel", (event) => endTeaDrag(event, true));
tray.addEventListener("lostpointercapture", (event) => endTeaDrag(event, true));

$("stock-prev").onclick = () =>
  $("inventory").scrollBy({ left: -220, behavior: "smooth" });
$("stock-next").onclick = () =>
  $("inventory").scrollBy({ left: 220, behavior: "smooth" });

let feedbackTimer;
function showFeedback(message) {
  clearTimeout(feedbackTimer);
  $("sale-feedback").textContent = message;
  $("sale-feedback").hidden = false;
  feedbackTimer = setTimeout(() => {
    $("sale-feedback").hidden = true;
  }, 9000);
}
$("sale-feedback").onclick = () => {
  $("sale-feedback").hidden = true;
};

$("identify").onclick = () => {
  if (paused || businessPhase === "closed") return;
  const id = result();
  if (id && storedTea === id) return;
  if (!id) {
    modal(
      `<p class="eyebrow">EXPERIMENT NOTE</p><h2>還有一點可能性。</h2><p>${steps.includes("dry") ? "這批葉子尚未對應到圖鑑裡的茶。記住這次的片狀手感，下一批試試在乾燥前揉捻。" : "茶葉還沒完成乾燥。回到工作台，繼續觀察與加工，再來鑑定吧。"}</p><p>未收錄不代表現實中不存在這種茶；這是本原型的探索範圍。</p>`,
    );
    return;
  }
  const isNew = !discovered[id];
  if (isNew) {
    discovered[id] = {
      route:
        materials.find((m) => m.id === material).name +
        " → " +
        steps.map((s) => actions.find((a) => a.id === s).name).join(" → "),
    };
  }
  inventory[id] = (inventory[id] || 0) + 1;
  storedTea = id;
  selectedTea = id;
  save();
  render();
  showTea(id, isNew);
};
$("restart").onclick = openMaterialPicker;
document
  .querySelectorAll(".nav")
  .forEach((b) => (b.onclick = () => view(b.dataset.view)));
$("graph").onclick = (e) => {
  const b = e.target.closest("[data-tea]");
  if (!b) return;
  if (discovered[b.dataset.tea]) showTea(b.dataset.tea);
  else
    modal(
      "<h2>還沒寫下的故事</h2><p>回到工作台，從不同的原料與加工方式尋找線索。每次鑑定出新茶，這裡就會留下一頁紀錄。</p>",
    );
};
$("close-modal").onclick = () => $("modal").close();
$("modal").onclick = (e) => {
  if (e.target === $("modal")) {
    const r = $("modal").getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      $("modal").close();
  }
};
let introPage = 0;
const introPages = [
  {
    tag: "序章 · 一把鑰匙，一本舊筆記",
    title: "歡迎回到，一葉茶屋。",
    body: "你繼承了一間小茶屋。竹盤、蒸籠和焙爐都還在，唯獨製茶筆記，只留下幾頁空白。",
    note: "「同一片葉子，也許藏著不只一個答案。剩下的，就交給你了。」",
    button: "翻開那本筆記 →",
  },
  {
    tag: "你的任務 · 找回茶葉的可能性",
    title: "看葉子，不用猜密碼。",
    body: "先點中央茶盤選原料，把葉子拖進蒸籠。等幾秒點開蓋子，再直接拖到揉台，左右搓幾下；接著拖到乾燥區，點一下攤開，稍等半秒就完成。所有加工都在同一張桌面上，也可以點器具或使用左右鍵操作。",
    note: "不是工具清單上的每一步都要做。蒸過的遮陰葉，可以揉捻，也可以直接乾燥；台灣茶菁則從萎凋開始，觀察花香與葉緣，再選擇是否炒菁停止氧化。",
    button: "那麼，完成之後呢？ →",
  },
  {
    tag: "第一天 · 你的實驗就要開始",
    title: "為來訪的人，做一杯茶。",
    body: "你有五天時間經營茶屋。每天開店前自由製茶，開店後依照客人的需求選茶招待；第五天打烊時，會整理這段時間的收支、接待人數與圖鑑成果。",
    note: "合口味就能收到茶錢，迎接下一位客人。開店前不限時備茶，開店後營業三分鐘。選錯不扣茶葉，客人會給你線索。已入庫的這一批若繼續焙煎，會轉製為新的茶。",
    button: "開始備茶 ✧",
  },
];
function showIntro(page = 0) {
  introPage = page;
  const p = introPages[page];
  $("modal").classList.add("intro-dialog");
  modal(
    `<div class="intro-art"><img src="assets/leaves.svg" alt="茶屋竹盤與新鮮茶葉"><span>一葉茶屋</span></div><p class="eyebrow">${p.tag}</p><h2>${p.title}</h2><p>${p.body}</p><div class="letter">${p.note}</div><div class="intro-dots" aria-label="第 ${page + 1} 頁，共 3 頁">${introPages.map((_, i) => `<i class="${i === page ? "current" : ""}"></i>`).join("")}</div><button class="primary" id="intro-next">${p.button}</button><button class="quiet" id="intro-skip">我想直接探索</button>`,
  );
  $("intro-next").onclick = () => {
    if (introPage < 2) showIntro(introPage + 1);
    else finishIntro();
  };
  $("intro-skip").onclick = finishIntro;
}
function finishIntro() {
  $("modal").close();
  view("lab");
}
$("modal").addEventListener("close", () => {
  $("modal").classList.remove("intro-dialog");
  if (arrivalPending && businessPhase === "open") arriveCustomer(nextVisit);
});
$("help").onclick = () => showIntro();
function renderShop() {
  const c = customers[customerIndex % customers.length];
  document.querySelector(".customer-dialog").hidden = !customerReady;
  $("customer-hint").disabled = !customerReady || paused;
  $("skip-customer").disabled = !customerReady || paused;
  $("arrival-status").hidden = customerReady || businessPhase !== "open";
  $("arrival-status").textContent = "門簾輕輕晃動，有位客人走進來了……";
  $("customer-name").textContent = c.name;
  $("customer-role").textContent = c.role;
  $("customer-request").textContent = "「" + c.request + "」";
  $("request-tags").innerHTML = c.tags
    .map((t) => `<span class="tag">${t}</span>`)
    .join("");
  $("reward").textContent = `合適的茶 · ${c.reward} 茶錢`;
  $("customer-art").src =
    `assets/simple/customer-${["haru", "gaku", "sumie"][customerArt]}.png`;
  $("customer-art").alt = c.name;
  $("coins").textContent = coins;
  $("served").textContent = served;
  renderBusiness();
  const ids = Object.keys(teas).filter((id) => inventory[id] > 0);
  if (!ids.includes(selectedTea)) selectedTea = null;
  $("inventory").innerHTML = ids.length
    ? ids
        .map(
          (id) =>
            `<button class="stock ${selectedTea === id ? "selected" : ""}" data-stock="${id}" aria-pressed="${selectedTea === id}">${sprite(id)}<span><strong>${teas[id].name}</strong><small>庫存 ${inventory[id]} 份</small></span></button>`,
        )
        .join("")
    : '<div class="inventory-empty">製好茶後，鑑定入庫。</div>';
  $("serve").disabled =
    !selectedTea || !customerReady || paused || businessPhase !== "open";
  $("serve").textContent = selectedTea
    ? `端給客人 · ${teas[selectedTea].name}`
    : "先選一份茶";
}
$("inventory").onclick = (e) => {
  const b = e.target.closest("[data-stock]");
  if (b) {
    selectedTea = b.dataset.stock;
    renderShop();
  }
};
$("customer-hint").onclick = () => {
  if (!customerReady || paused || businessPhase !== "open") return;
  const c = customers[customerIndex % customers.length];
  modal(`<p class="eyebrow">聊聊口味</p><h2>${c.name}</h2><p>${c.hint}</p>`);
};
$("skip-customer").onclick = () => {
  if (!customerReady || paused || businessPhase !== "open") return;
  showFeedback("客人說下次再來。門口又傳來了腳步聲。");
  arriveCustomer(true);
};
$("serve").onclick = () => {
  if (
    paused ||
    businessPhase !== "open" ||
    !customerReady ||
    !selectedTea ||
    !inventory[selectedTea]
  )
    return;
  const c = customers[customerIndex % customers.length],
    id = selectedTea;
  if (!c.accept.includes(id)) {
    showFeedback(
      `${c.name}：「這份${teas[id].name}和我想要的不同。${c.hint}」茶葉已留在櫃檯，沒有消耗。`,
    );
    return;
  }
  inventory[id]--;
  coins += c.reward;
  dayRevenue += c.reward;
  daySales++;
  totalRevenue += c.reward;
  totalSales++;
  served++;
  workshop.onSale();
  customerReady = false;
  arrivalPending = true;
  nextVisit = true;
  if (storedTea === id) {
    material = null;
    workshop.data.location = null;
    batchCost = 0;
    steps = [];
    storedTea = null;
    batch++;
  }
  save();
  render();
  showFeedback(
    `售出${teas[id].name}，收到 ${c.reward} 茶錢。準備招呼下一位客人。`,
  );
  modal(
    `<p class="eyebrow">一杯茶，一個好心情</p>${sprite(id)}<h2>謝謝款待。</h2><p>${c.name}：「${c.thanks}」</p><p class="recipe">${teas[id].name} × 1　＋ ${c.reward} 茶錢</p><button id="next-customer" class="primary">招呼下一位客人 →</button>`,
  );
  $("next-customer").onclick = () => $("modal").close();
};
function pickCustomer() {
  // Shuffle through the request bank before allowing repeats; portrait is independent.
  if (recentRequests.length >= customers.length) recentRequests = [];
  const choices = customers
    .map((_, i) => i)
    .filter((i) => i !== customerIndex && !recentRequests.includes(i));
  const chosen = choices[Math.floor(Math.random() * choices.length)];
  recentRequests.push(chosen);
  return chosen;
}
function arriveCustomer(chooseNew = false) {
  if (businessPhase !== "open") return;
  clearTimeout(arrivalTimer);
  if (chooseNew) {
    customerIndex = workshop.partyCustomer() ?? pickCustomer();
    const portraits = [0, 1, 2].filter((i) => i !== customerArt);
    customerArt = portraits[Math.floor(Math.random() * portraits.length)];
  }
  nextVisit = false;
  arrivalPending = false;
  customerReady = false;
  renderShop();
  save();
  const art = $("customer-art");
  art.classList.remove("entering");
  void art.offsetWidth;
  art.classList.add("entering");
  arrivalTimer = setTimeout(() => {
    art.classList.remove("entering");
    customerReady = businessPhase === "open";
    renderShop();
  }, 950);
}
// Portrait and preference are drawn independently; all three guests can ask any request.
customerArt = Math.floor(Math.random() * 3);
customerIndex =
  workshop.partyCustomer() ?? Math.floor(Math.random() * customers.length);
recentRequests = [customerIndex];
render();
save();
showIntro();
workshop.init();
