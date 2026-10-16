// Refuse to run inside someone else's frame (clickjacking)
if (window.top !== window.self) {
  try { window.top.location.replace(window.location.href); } catch (e) { document.documentElement.style.display = "none"; }
}

const ENTRIES = [
  {
    id: "games",
    name: "My Games",
    kind: "Screens from games I worked on",
    line: "Everything here is quick work: each one took three or four days.",
    did: ["map building", "horror fear system", "monster AI", "simulator bases", "riding and flight", "carry and sleep loop", "radars", "inventory and hotbar", "economy", "admin panel"],
    shots: [
      { src: "img/town.jpg", tab: "Town", cap: "A market town with a clock tower and a fountain square." },
      { src: "img/hilltown.jpg", tab: "Hill town", cap: "A second town packed onto a ridge." },
      { src: "img/map.jpg", tab: "Hub", cap: "Eight player ranches around the market stalls." },
      { src: "img/forest.jpg", tab: "Night forest", cap: "A horror arena: dead trees, fog and flickering lamps." },
      { src: "img/graveyard.jpg", tab: "Graveyard", cap: "Something with red eyes waits by the gate." },
      { src: "img/plaza.jpg", tab: "Plaza", cap: "A simulator plaza: player bases, a walk track and a row of shops." },
      { src: "img/skytrack.jpg", tab: "Sky track", cap: "A floating track of themed zones, each behind its own gate." },
      { src: "img/ride.jpg", tab: "Ride", cap: "The run cycle is code, not an uploaded animation." },
      { src: "img/carry.jpg", tab: "Carry", cap: "Pick one up and the clock starts." },
      { src: "img/radars.jpg", tab: "Radars", cap: "Six radars, each built from one row of config." },
    ],
  },
  {
    id: "fun",
    name: "Builds for Fun",
    kind: "Personal builds, no client",
    line: "Builds I made on my own time: a sci-fi desert arena and a gothic cathedral, inside and out.",
    did: ["sci-fi arena", "gothic cathedral", "terrain", "interiors", "stained glass", "lighting"],
    shots: [
      { src: "img/scifi-overview.jpg", tab: "Arena", cap: "Desert outpost: a sunken duel arena with canyon walls all around." },
      { src: "img/scifi-pit.jpg", tab: "Pit", cap: "Stone pit with stepped edges and cover to fight around." },
      { src: "img/scifi-wreck.jpg", tab: "Wreck", cap: "A warship half buried in the dunes, still smoking." },
      { src: "img/scifi-market.jpg", tab: "Market", cap: "Domed huts and market stalls next to the arena." },
      { src: "img/cathedral.jpg", tab: "Cathedral", cap: "Gothic cathedral: twin spires, three portals, a rose window." },
      { src: "img/cathedral-portals.jpg", tab: "Portals", cap: "Statues in the door jambs, the arches and the gallery above." },
      { src: "img/cathedral-interior-nave.jpg", tab: "Nave", cap: "Inside: rib vaults, stained glass, pews down to the altar." },
      { src: "img/cathedral-interior-west.jpg", tab: "Organ", cap: "Looking back at the organ loft and the west rose." },
      { src: "img/cathedral-interior-aisle.jpg", tab: "Aisle", cap: "Side aisle, lit by candles and the windows." },
    ],
  },
  {
    id: "customers",
    name: "Customer Builds",
    kind: "Work I did for clients",
    line: "Pick a client to see what I built for them.",
    clients: [
      {
        user: "altariuse",
        line: "An asymmetric horror map: a gothic hall, a pizzeria wing and a dead forest, with every pallet, window and exit gate placed for chases.",
        did: ["gothic hall", "interiors", "chase loops", "pallets and vaults", "exit gates", "lighting"],
        shots: [
          { src: "img/client-horror-overview.jpg", tab: "Overview", cap: "The whole map in the fog: the hall, the wooden house and the outer walls." },
          { src: "img/client-horror-front-entrance.jpg", tab: "Entrance", cap: "Gothic front with the main doors open." },
          { src: "img/client-horror-grand-hall.jpg", tab: "Hall", cap: "Through the doors: carpet, round balcony and the statue in the middle." },
          { src: "img/client-horror-angel-statue.jpg", tab: "Statue", cap: "A mossy, cracked angel under the moonlight from the dome." },
          { src: "img/client-horror-staircase.jpg", tab: "Stairs", cap: "Long stairs up to the balcony, chandelier above." },
          { src: "img/client-horror-balcony.jpg", tab: "Balcony", cap: "Looking down at the statue from the second floor." },
          { src: "img/client-horror-facility-hallway.jpg", tab: "Hallway", cap: "Checkered halls in the side wing." },
          { src: "img/client-horror-party-room.jpg", tab: "Party room", cap: "Booths, stage and balloons, with pallet loops between the booths." },
          { src: "img/client-horror-wooden-house.jpg", tab: "House", cap: "A half collapsed wooden house with a bell tower." },
          { src: "img/client-horror-exit-gate.jpg", tab: "Exit gate", cap: "Iron exit gate with its lever box." },
        ],
      },
    ],
  },
  {
    id: "reviews",
    name: "Reviews",
    kind: "What clients say",
    line: "Every review here comes from someone I built for. Each client gets a one-time code, so only real clients can post.",
    reviews: true,
  },
  {
    id: "about",
    name: "About",
    kind: "Who is behind this",
    line: "I've been building on Roblox for two years and scripting for one. I can do almost any kind of Roblox work: maps and terrain, movement, progression, saving, tools, balance. The screens under My Games are quick jobs of three or four days each, so judge them as that. Give me longer and you get more.",
    did: ["building", "terrain", "Luau", "Rojo", "client and server", "DataStores", "balancing"],
  },
  {
    id: "contact",
    name: "Contact",
    kind: "Open to scripting and building work",
    line: "Message me on Discord.",
    handles: [["Discord", "spkelvin"], ["Roblox", "Kelvin_bWt"]],
  },
];

const menu = document.getElementById("menu");
const detail = document.getElementById("detail");
let current = 0;
let shot = 0;
let client = 0;

function el(tag, props, kids) {
  const n = document.createElement(tag);
  Object.assign(n, props || {});
  (kids || []).forEach((k) => n.append(k));
  return n;
}

function renderDetail() {
  const e = ENTRIES[current];
  const box = el("div", { className: "swap" });
  if (e.clients) {
    renderClients(e, box);
    detail.replaceChildren(box);
    return;
  }
  if (e.shots) {
    const s = e.shots[shot];
    const img = el("img", { src: s.src, alt: s.tab + " screenshot", className: "in" });
    box.append(el("div", { className: "frame" }, [img]), el("div", { className: "edge" }));
    const tabs = el("ul", { className: "shots" });
    e.shots.forEach((x, i) => {
      const b = el("button", { type: "button", textContent: x.tab });
      b.setAttribute("aria-pressed", String(i === shot));
      b.addEventListener("click", () => { shot = i; renderDetail(); });
      tabs.append(el("li", {}, [b]));
    });
    box.append(tabs);
  }
  const words = el("div", { className: "words" });
  // pictures only
  if (!e.shots) words.append(el("h2", { textContent: e.name }));
  if (e.line) words.append(el("p", { textContent: e.line }));
  if (e.shots) words.append(el("p", { className: "cap", textContent: e.shots[shot].cap }));
  if (e.did) {
    const did = el("ul", { className: "did" });
    e.did.forEach((d) => did.append(el("li", { textContent: d })));
    words.append(did);
  }
  if (e.handles) {
    const h = el("ul", { className: "handles" });
    e.handles.forEach(([k, v]) => h.append(el("li", {}, [k + ": ", el("span", { textContent: v })])));
    words.append(h);
  }
  if (e.reviews) words.append(reviewsBlock());
  box.append(words);
  detail.replaceChildren(box);
}

// Customer Builds: one tab per client (their username), and a slideshow of that client's screens.
function renderClients(e, box) {
  const c = e.clients[client];
  const s = c.shots[shot];
  const users = el("ul", { className: "users" });
  e.clients.forEach((x, i) => {
    const b = el("button", { type: "button", textContent: "@" + x.user });
    b.setAttribute("aria-pressed", String(i === client));
    b.addEventListener("click", () => { client = i; shot = 0; renderDetail(); });
    users.append(el("li", {}, [b]));
  });
  const go = (d) => { shot = (shot + d + c.shots.length) % c.shots.length; renderDetail(); };
  const prev = el("button", { type: "button", className: "nav prev", textContent: "‹" });
  const next = el("button", { type: "button", className: "nav next", textContent: "›" });
  prev.setAttribute("aria-label", "Previous screenshot");
  next.setAttribute("aria-label", "Next screenshot");
  prev.addEventListener("click", () => go(-1));
  next.addEventListener("click", () => go(1));
  const img = el("img", { src: s.src, alt: s.tab + " screenshot", className: "in" });
  const count = el("span", { className: "count", textContent: `${shot + 1} / ${c.shots.length}` });
  const frame = el("div", { className: "frame slide" }, [img, prev, next, count]);
  let x0 = null;
  frame.addEventListener("touchstart", (ev) => { x0 = ev.touches[0].clientX; }, { passive: true });
  frame.addEventListener("touchend", (ev) => {
    if (x0 === null) return;
    const dx = ev.changedTouches[0].clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  });
  const dots = el("div", { className: "dots" });
  c.shots.forEach((_, i) => {
    const d = el("button", { type: "button" });
    d.setAttribute("aria-label", "Screenshot " + (i + 1));
    d.setAttribute("aria-pressed", String(i === shot));
    d.addEventListener("click", () => { shot = i; renderDetail(); });
    dots.append(d);
  });
  box.append(users, frame, el("div", { className: "edge" }), dots);
  const words = el("div", { className: "words" });
  words.append(el("p", { textContent: c.line }), el("p", { className: "cap", textContent: s.cap }));
  if (c.did) {
    const did = el("ul", { className: "did" });
    c.did.forEach((d) => did.append(el("li", { textContent: d })));
    words.append(did);
  }
  box.append(words);
}

// Reviews live on a small server (see the setup notes). Only people with a one-time code can post.
const REVIEWS_API = "https://kelvin-reviews.kelvinbtw321.workers.dev";
let reviewsCache = null;

let reviewsRequest = null;
const EMPTY_REVIEWS = { count: 0, average: 0, reviews: [] };

function starText(n) { return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n); }

function getReviews(fresh) {
  if (!REVIEWS_API) return Promise.resolve(EMPTY_REVIEWS);
  if (fresh || !reviewsRequest) {
    reviewsRequest = fetch(REVIEWS_API + "/reviews")
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((d) => { reviewsCache = d; updateRating(d); return d; })
      .catch((e) => { reviewsRequest = null; throw e; });
  }
  return reviewsRequest;
}

// Google Maps style rating next to the name: 4.8 ★★★★★ (12)
function starBar(avg) {
  const bar = el("span", { className: "rbar" }, [el("span", { className: "rbg", textContent: "★★★★★" })]);
  const fg = el("span", { className: "rfg", textContent: "★★★★★" });
  fg.style.width = Math.max(0, Math.min(100, (avg / 5) * 100)) + "%";
  bar.append(fg);
  return bar;
}
function updateRating(d) {
  const b = document.getElementById("rating");
  const kids = [];
  if (d.count) kids.push(el("span", { className: "rnum", textContent: d.average.toFixed(1) }));
  kids.push(starBar(d.count ? d.average : 0), el("span", { className: "rcount", textContent: "(" + d.count + ")" }));
  b.replaceChildren(...kids);
  b.setAttribute("aria-label", d.count ? `Rated ${d.average.toFixed(1)} out of 5 from ${d.count} reviews. See reviews` : "No reviews yet. See reviews");
}

function reviewsBlock() {
  const wrap = el("div", { className: "reviews" });
  const summary = el("div", { className: "rsum" }, [el("span", { textContent: "Loading reviews…" })]);
  const list = el("ul", { className: "rlist" });
  wrap.append(summary, list);
  const show = (data) => {
    list.replaceChildren();
    summary.replaceChildren(
      ...(data.count
        ? [el("span", { className: "rbig", textContent: data.average.toFixed(1) }), starBar(data.average), el("span", { textContent: `${data.count} review${data.count === 1 ? "" : "s"}` })]
        : [el("span", { textContent: REVIEWS_API ? "No reviews yet." : "Reviews open soon." })])
    );
    for (const r of data.reviews) {
      const s = el("span", { className: "rstars", textContent: starText(r.stars) });
      s.setAttribute("aria-label", r.stars + " out of 5 stars");
      list.append(el("li", { className: "rcard" }, [
        el("div", { className: "rhead" }, [el("span", { className: "rname", textContent: r.name }), s]),
        el("p", { className: "rtext", textContent: r.text }),
        el("span", { className: "rdate", textContent: new Date(r.created_at * 1000).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) }),
      ]));
    }
  };
  if (reviewsCache) show(reviewsCache);
  getReviews()
    .then((d) => { if (wrap.isConnected) show(d); })
    .catch(() => { summary.replaceChildren(el("span", { textContent: "Reviews could not load right now." })); });
  if (REVIEWS_API) wrap.append(reviewForm());
  return wrap;
}

function reviewForm() {
  const box = el("details", { className: "rform" });
  box.append(el("summary", { textContent: "Worked with me? Leave a review with your code" }));
  const form = el("form");
  const field = (label, input) => el("label", { className: "rfield" }, [el("span", { textContent: label }), input]);
  const code = el("input", { name: "code", required: true, maxLength: 20, autocomplete: "off", spellcheck: false, placeholder: "XXXX-XXXX-XXXX" });
  const name = el("input", { name: "name", required: true, maxLength: 40, placeholder: "Your name or Discord" });
  const text = el("textarea", { name: "text", required: true, minLength: 10, maxLength: 600, rows: 4, placeholder: "How was it working with me?" });
  const stars = el("fieldset", { className: "rpick" }, [el("legend", { textContent: "Rating" })]);
  for (let i = 5; i >= 1; i--) {
    const id = "star" + i;
    const r = el("input", { type: "radio", name: "stars", value: String(i), id, required: true });
    const l = el("label", { htmlFor: id, textContent: "★", title: i + " stars" });
    stars.append(r, l);
  }
  const msg = el("p", { className: "rmsg" });
  msg.setAttribute("role", "status");
  const send = el("button", { type: "submit", className: "rsend", textContent: "Post review" });
  form.append(field("Review code", code), field("Name", name), stars, field("Review", text), send, msg);
  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const picked = form.querySelector('input[name="stars"]:checked');
    send.disabled = true;
    msg.className = "rmsg";
    msg.textContent = "Sending…";
    try {
      const res = await fetch(REVIEWS_API + "/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.value, name: name.value, text: text.value, stars: picked ? Number(picked.value) : 0 }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      msg.textContent = "Thank you! Your review is up.";
      form.reset();
      setTimeout(() => getReviews(true).then(() => { if (ENTRIES[current].reviews) renderDetail(); }).catch(() => {}), 1200);
    } catch (err) {
      msg.className = "rmsg err";
      msg.textContent = err.message;
    } finally {
      send.disabled = false;
    }
  });
  box.append(form);
  return box;
}

function select(i, focus) {
  current = (i + ENTRIES.length) % ENTRIES.length;
  shot = 0;
  client = 0;
  [...menu.querySelectorAll("button")].forEach((b, n) => {
    b.setAttribute("aria-current", String(n === current));
    if (n === current && focus) b.focus();
  });
  renderDetail();
}

ENTRIES.forEach((e, i) => {
  const b = el("button", { type: "button" }, [e.name, el("span", { className: "kind", textContent: e.kind })]);
  b.style.setProperty("--i", i);
  b.addEventListener("click", () => select(i));
  menu.append(el("li", {}, [b]));
});
document.addEventListener("keydown", (ev) => {
  if (ev.target.closest && ev.target.closest("input, textarea, select")) return;
  if (ENTRIES[current].clients && (ev.key === "ArrowLeft" || ev.key === "ArrowRight")) {
    const n = ENTRIES[current].clients[client].shots.length;
    shot = (shot + (ev.key === "ArrowRight" ? 1 : -1) + n) % n;
    renderDetail();
    return;
  }
  if (ev.key === "ArrowDown") { ev.preventDefault(); select(current + 1, true); }
  if (ev.key === "ArrowUp") { ev.preventDefault(); select(current - 1, true); }
});
select(0);
updateRating(EMPTY_REVIEWS);
getReviews().catch(() => {});
document.getElementById("rating").addEventListener("click", () => select(ENTRIES.findIndex((e) => e.id === "reviews")));

// Tonight's real moon, drawn from the date.
(function moon() {
  const now = new Date();
  const synodic = 29.530588853;
  const ref = Date.UTC(2000, 0, 6, 18, 14); // a known new moon
  const age = (((now.getTime() - ref) / 86400000) % synodic + synodic) % synodic;
  const p = age / synodic; // 0 new, 0.5 full
  const names = ["New moon", "Waxing crescent", "First quarter", "Waxing gibbous", "Full moon", "Waning gibbous", "Last quarter", "Waning crescent"];
  const name = names[Math.round(p * 8) % 8];
  const r = 28, cx = 31, cy = 31;
  const waxing = p < 0.5;
  const k = Math.cos(p * 2 * Math.PI); // 1 new, -1 full
  const rx = Math.abs(k) * r;
  // lit half on the right when waxing; the terminator ellipse adds or removes the other half
  const sweepOuter = waxing ? 1 : 0;
  const sweepInner = (k < 0) === waxing ? 1 : 0;
  const d = `M ${cx} ${cy - r} A ${r} ${r} 0 0 ${sweepOuter} ${cx} ${cy + r} A ${rx} ${r} 0 0 ${sweepInner} ${cx} ${cy - r} Z`;
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  document.getElementById("moon").innerHTML =
    `<div><div class="day">${now.getMonth() + 1}/${now.getDate()} ${days[now.getDay()]}</div><div class="phase">${name}</div></div>` +
    `<svg viewBox="0 0 62 62" role="img" aria-label="${name}"><circle cx="${cx}" cy="${cy}" r="${r}" fill="#07205f" stroke="#38dcff" stroke-width="1.5"/><path d="${d}" fill="#eefaff"/></svg>`;
})();

// Water: slow slanted bands and widening rings.
(function sea() {
  const c = document.getElementById("sea");
  const g = c.getContext("2d");
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w = 0, h = 0, rings = [];
  function size() {
    const d = Math.min(devicePixelRatio || 1, 2);
    w = c.clientWidth; h = c.clientHeight;
    c.width = w * d; c.height = h * d;
    g.setTransform(d, 0, 0, d, 0, 0);
  }
  function frame(t) {
    const s = t / 1000;
    const grad = g.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#030b26"); grad.addColorStop(0.55, "#07205f"); grad.addColorStop(1, "#0d45d6");
    g.fillStyle = grad; g.fillRect(0, 0, w, h);
    // slanted bands drifting right
    g.save();
    g.transform(1, 0, -0.42, 1, 0, 0);
    for (let i = 0; i < 9; i++) {
      const bw = 40 + (i * 53) % 150;
      const x = ((i * 310 + s * (10 + i * 3)) % (w + h + 500)) - 200;
      g.fillStyle = `rgba(56,220,255,${0.03 + (i % 3) * 0.022})`;
      g.fillRect(x, 0, bw, h);
    }
    g.restore();
    // rings
    if (!still && Math.random() < 0.012 && rings.length < 5) rings.push({ x: Math.random() * w, y: h * (0.35 + Math.random() * 0.65), born: s });
    rings = rings.filter((r) => s - r.born < 7);
    for (const r of rings) {
      const a = (s - r.born) / 7;
      g.strokeStyle = `rgba(238,250,255,${0.22 * (1 - a)})`;
      g.lineWidth = 1.5;
      for (let k = 0; k < 3; k++) {
        const rad = a * 260 - k * 34;
        if (rad > 0) { g.beginPath(); g.ellipse(r.x, r.y, rad, rad * 0.32, 0, 0, Math.PI * 2); g.stroke(); }
      }
    }
    if (!still) requestAnimationFrame(frame);
  }
  addEventListener("resize", () => { size(); if (still) frame(0); });
  size();
  requestAnimationFrame(frame);
})();
