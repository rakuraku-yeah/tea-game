/* Hands-on processing and the reopening chapter.
   Work-in-progress is saved with the economic transaction, never charged on entry.
   Rendering uses stable controls so pointer capture survives progress updates. */
const workshop = {
  data: {
    mastered: [],
    active: null,
    location: null,
    inline: true,
    chapter: 0,
    availableDay: 1,
    sales: 0,
    signature: null,
    party: -1,
    complete: false,
  },
  pointer: null,
  load() {
    try {
      const stored = JSON.parse(
        localStorage.getItem("one-leaf-business-v3"),
      )?.workshop;
      if (stored) {
        for (const key of ["chapter", "availableDay", "sales", "party"]) {
          if (Number.isInteger(stored[key])) this.data[key] = stored[key];
        }
        this.data.chapter = Math.max(0, Math.min(2, this.data.chapter));
        this.data.party = Math.max(-1, Math.min(3, this.data.party));
        this.data.mastered = (stored.mastered || []).filter((id) =>
          ["steam", "roll", "dry"].includes(id),
        );
        this.data.signature = ["sencha", "gyokuro", "hojicha"].includes(
          stored.signature,
        )
          ? stored.signature
          : null;
        this.data.complete = stored.complete === true;
        if (
          stored.active &&
          ["steam", "roll", "dry"].includes(stored.active.id)
        )
          this.data.active = {
            ...stored.active,
            stage: stored.inline
              ? stored.active.stage
              : stored.active.id === "steam"
                ? "heat"
                : "work",
            elapsed: stored.inline ? stored.active.elapsed : 0,
            cooldown: 0,
          };
        this.data.location =
          this.data.active?.id ||
          (typeof stored.location === "string" ? stored.location : null);
      }
    } catch {}
  },
  init() {
    // A single delegated pointer surface survives normal scene renders.
    const desk = $("actions");
    desk.addEventListener("pointerdown", (event) => {
      const tool = event.target.closest("[data-action]");
      if (
        event.button !== 0 ||
        !tool ||
        tool.dataset.action !== this.data.location
      )
        return;
      if (this.data.active && this.data.active.id !== "roll") return;
      this.pointer = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        origin: tool.dataset.action,
        moved: false,
        ghost: null,
      };
      desk.setPointerCapture(event.pointerId);
    });
    desk.addEventListener("pointermove", (event) => {
      const pointer = this.pointer;
      if (!pointer || event.pointerId !== pointer.id) return;
      if (this.data.active?.id === "roll") {
        if (Math.abs(event.clientX - pointer.x) >= 22) {
          pointer.moved = true;
          this.roll(event.clientX > pointer.x ? 1 : -1);
          pointer.x = event.clientX;
        }
        return;
      }
      if (
        Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y) < 8 &&
        !pointer.moved
      )
        return;
      pointer.moved = true;
      if (!pointer.ghost) {
        pointer.ghost = document.createElement("div");
        pointer.ghost.className = "drag-ghost tea-sprite";
        pointer.ghost.style.cssText = $("tea-art").style.cssText;
        document.body.append(pointer.ghost);
      }
      pointer.ghost.style.left = `${event.clientX}px`;
      pointer.ghost.style.top = `${event.clientY}px`;
      $("tea-tray").classList.toggle(
        "return-target",
        !!document
          .elementFromPoint(event.clientX, event.clientY)
          ?.closest("#tea-tray"),
      );
    });
    const release = (event) => {
      const pointer = this.pointer;
      if (!pointer || pointer.id !== event.pointerId) return;
      pointer.ghost?.remove();
      $("tea-tray").classList.remove("return-target");
      this.pointer = null;
      if (pointer.moved) {
        this.suppressClick = true;
        setTimeout(() => {
          this.suppressClick = false;
        }, 0);
        if (event.type === "pointerup" && !this.data.active) {
          const hit = document.elementFromPoint(event.clientX, event.clientY);
          const target = hit?.closest("[data-action]");
          if (hit?.closest("#tea-tray")) this.returnToTray();
          else if (target && target.dataset.action !== pointer.origin)
            this.begin(target.dataset.action);
        }
      }
      save();
    };
    desk.addEventListener("pointerup", release);
    desk.addEventListener("pointercancel", release);
    desk.addEventListener("lostpointercapture", release);
    desk.addEventListener("keydown", (event) => {
      if (
        this.data.active?.id === "roll" &&
        ["ArrowLeft", "ArrowRight"].includes(event.key)
      ) {
        event.preventDefault();
        this.roll(event.key === "ArrowLeft" ? -1 : 1);
      }
    });
    $("cancel-processing").onclick = () => {
      this.data.active = null;
      this.data.location = null;
      save();
      render();
    };
    let previous = Date.now();
    setInterval(() => {
      const now = Date.now(),
        delta = Math.min(0.2, (now - previous) / 1000);
      previous = now;
      if (
        document.hidden ||
        paused ||
        $("modal").open ||
        $("material-picker").open ||
        !$("atlas").hidden ||
        businessPhase === "closed"
      )
        return;
      this.tick(delta);
    }, 100);
    this.renderMission();
  },
  returnToTray() {
    if (
      this.data.active ||
      !this.data.location ||
      !material ||
      paused ||
      businessPhase === "closed"
    )
      return false;
    this.data.location = null;
    save();
    render();
    return true;
  },
  begin(id) {
    if (paused || businessPhase === "closed") return false;
    const active = this.data.active;
    if (active) {
      if (active.id !== id) return false;
      if (id === "steam" && active.stage === "ready") {
        active.stage = "cool";
        active.elapsed = 0;
      } else if (id === "roll") this.roll(active.direction === -1 ? 1 : -1);
      else if (id === "dry" && active.stage === "work") this.spread();
      this.paint();
      save();
      return true;
    }
    if (reason(id)) return false;
    this.data.location = id;
    if (!["steam", "roll", "dry"].includes(id)) return processAction(id);
    this.data.active = {
      id,
      batch,
      stage: id === "steam" ? "heat" : "work",
      elapsed: 0,
      progress: 0,
      direction: 0,
      cooldown: 0,
    };
    save();
    render();
    return true;
  },
  roll(direction) {
    const active = this.data.active;
    if (
      !active ||
      active.id !== "roll" ||
      active.cooldown > 0 ||
      active.direction === direction
    )
      return;
    active.direction = direction;
    active.progress = Math.min(100, active.progress + 34);
    active.cooldown = 0.12;
    this.paint();
    if (active.progress >= 100) this.complete();
    else save();
  },
  spread() {
    const active = this.data.active;
    if (!active || active.id !== "dry") return;
    active.stage = "spread";
    active.elapsed = 0;
    this.paint();
    save();
  },
  tick(delta) {
    const active = this.data.active;
    if (!active) return;
    if (active.id === "roll") {
      active.cooldown = Math.max(0, active.cooldown - delta);
      return;
    }
    if (active.id === "steam" && active.stage === "heat") {
      active.elapsed = Math.min(2.5, active.elapsed + delta);
      if (active.elapsed >= 2.5) active.stage = "ready";
    } else if (
      (active.id === "steam" && active.stage === "cool") ||
      (active.id === "dry" && active.stage === "spread")
    ) {
      active.elapsed = Math.min(0.5, active.elapsed + delta);
      if (active.elapsed >= 0.5) {
        this.complete();
        return;
      }
    }
    this.paint();
  },
  isReady() {
    const active = this.data.active;
    return (
      !!active &&
      (active.id === "roll"
        ? active.progress >= 100
        : active.id === "steam"
          ? active.stage === "cool" && active.elapsed >= 0.5
          : active.stage === "spread" && active.elapsed >= 0.5)
    );
  },
  complete() {
    const active = this.data.active;
    if (!this.isReady() || active.batch !== batch || reason(active.id))
      return false;
    this.data.active = null;
    if (!this.data.mastered.includes(active.id))
      this.data.mastered.push(active.id);
    const success = processAction(active.id);
    if (!success) {
      this.data.active = active;
      return false;
    }
    save();
    return true;
  },
  decorate() {
    const active = this.data.active;
    const location = this.data.location;
    $("cancel-processing").hidden = !active;
    $("tea-tray").classList.toggle("tea-away", !!location);
    if (location) {
      $("tray-instruction").textContent = active
        ? "加工完成後可拖回茶盤"
        : "拖回茶盤暫放 · 也可以點茶盤";
      $("tea-tray").setAttribute("aria-label", "將茶葉拖回茶盤暫放");
    }
    for (const button of document.querySelectorAll("#actions [data-action]")) {
      if (button.dataset.action !== location) continue;
      button.disabled = paused || businessPhase === "closed";
      button.classList.add("occupied-station");
      button.setAttribute(
        "aria-label",
        actions.find((a) => a.id === location).name,
      );
      const leaves = document.createElement("span");
      leaves.className = "desk-leaves tea-sprite";
      leaves.style.cssText = $("tea-art").style.cssText;
      leaves.setAttribute("aria-hidden", "true");
      button.append(leaves);
      if (location === "steam") {
        const lid = document.createElement("span");
        lid.className = "desk-lid";
        lid.setAttribute("aria-hidden", "true");
        button.append(lid);
      }
      if (location === "roll") {
        const hands = document.createElement("img");
        hands.className = "desk-hands";
        hands.src = "assets/simple/tools/hand-pair.svg";
        hands.alt = "";
        button.append(hands);
      }
    }
    delete $("hint").dataset.processingText;
    this.paint();
  },
  paint() {
    const active = this.data.active;
    const button = document.querySelector(
      `#actions [data-action="${this.data.location}"]`,
    );
    if (!button || !this.data.location) return;
    button.dataset.processing = active?.stage || "done";
    button.style.setProperty("--knead", `${(active?.direction || 0) * 9}px`);
    const labels = {
      heat: "蒸製中…",
      ready: "點開蓋子",
      cool: "開蓋散熱…",
      work: active?.id === "roll" ? "左右搓揉幾下" : "點一下攤開",
      spread: "晾乾中…",
      done: "拖到茶盤或其他器具",
    };
    const label = labels[active?.stage || "done"];
    const small = button.querySelector("small");
    if (small && small.dataset.source !== label) {
      small.dataset.source = label;
      small.textContent = label;
    }
    if (active) {
      const messages = {
        steam:
          active.stage === "ready"
            ? "葉子軟了。點蒸籠開蓋，散熱後可拖回茶盤，或移到其他器具。"
            : "茶葉留在蒸籠裡，青氣慢慢減弱。",
        roll: "在揉台左右拖幾下；也可以按左右鍵或點揉台。",
        dry: "點乾燥區把茶葉攤開，稍等半秒即可。",
      };
      if ($("hint").dataset.processingText !== messages[active.id]) {
        $("hint").dataset.processingText = messages[active.id];
        $("hint").textContent = messages[active.id];
      }
    } else {
      delete $("hint").dataset.processingText;
    }
  },
  renderMission() {
    document.querySelector(".shop-scene").classList.remove("celebration");
  },
  partyCustomer() {
    return null;
  },
  onSale() {
    // Compatibility hook for older saves; commissions are no longer active.
  },
};
workshop.load();
