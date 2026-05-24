/* ============================================================
   ██████████████████████████████████████████████████████████
   █                                                        █
   █   EDITABLE DATA — ADD / REMOVE CARDS HERE ONLY        █
   █                                                        █
   ██████████████████████████████████████████████████████████

   HOW TO ADD A NEW CARD:
   Copy one of the objects below, paste it inside scriptItems,
   separate with a comma, and fill in your values.

     image       ← direct URL to the card's preview image
     link        ← the REAL destination URL (never shown to visitors)
     displayName ← text on the button e.g. "Open Script", "Download"
     title       ← headline shown on the card

   The grid rebuilds automatically. No other code needs editing.
   ============================================================ */

const scriptItems = [

  {
    // ── CARD 1 ──────────────────────────────────────────────
    image:       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG3l-JyKWGEc0qvkFH5tZlwOoQN_kibafTs3OkzBEmOA&s=10",
    //            ↑ Your image URL

    link:        "https://pastebin.com/y3hgnjZ2",
    //            ↑ Your real destination URL (hidden from visitors)

    displayName: "Script",
    //            ↑ Button label — visitors see this, not the URL

    title:       "Flee the Facility",
    //            ↑ Card headline
  },

];

/* ============================================================
   SITE CONFIG
   ============================================================ */
const siteConfig = {
  heroText:    "ScriptVault",  // ← Typed hero text
  typingSpeed: 90,             // ← ms per character (lower = faster)
  startDelay:  700,            // ← delay before typing begins (ms)
};

/* ============================================================
   ██████████████████████████████████████████████████████████
   █   DO NOT EDIT BELOW THIS LINE                          █
   ██████████████████████████████████████████████████████████
   ============================================================ */


/* ── Typing animation ──────────────────────────────────────── */
function runTypingAnimation() {
  const el    = document.getElementById("heroTitle");
  const text  = siteConfig.heroText;
  const speed = siteConfig.typingSpeed;
  const delay = siteConfig.startDelay;
  let   index = 0;

  const cursor = document.createElement("span");
  cursor.className = "cursor";
  el.appendChild(cursor);

  setTimeout(function type() {
    if (index < text.length) {
      cursor.insertAdjacentText("beforebegin", text[index]);
      index++;
      setTimeout(type, speed);
    }
  }, delay);
}


/* ── Build script cards ────────────────────────────────────── */
function buildCards() {
  const grid = document.getElementById("cardsGrid");

  scriptItems.forEach(function (item, i) {
    const card = document.createElement("div");
    card.className = "script-card";
    card.style.animationDelay = (i * 90) + "ms";

    const imgWrap = document.createElement("div");
    imgWrap.className = "card-image-wrap";

    const img = document.createElement("img");
    img.src     = item.image;
    img.alt     = item.title;
    img.loading = "lazy";

    img.onerror = function () {
      imgWrap.style.background = "linear-gradient(135deg, #0f1318, #192030)";
      this.style.display = "none";
    };

    imgWrap.appendChild(img);

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("p");
    title.className   = "card-title";
    title.textContent = item.title;

    const btn = document.createElement("a");
    btn.className   = "card-btn";
    btn.href        = item.link;
    btn.textContent = item.displayName;
    btn.target      = "_blank";
    btn.rel         = "noopener noreferrer";

    body.appendChild(title);
    body.appendChild(btn);
    card.appendChild(imgWrap);
    card.appendChild(body);
    grid.appendChild(card);
  });
}


/* ── Script count stat ─────────────────────────────────────── */
function updateStats() {
  const countEl = document.getElementById("scriptCount");
  if (!countEl) return;

  let current  = 0;
  const target = scriptItems.length;
  const step   = Math.max(1, Math.floor(target / 20));

  const tick = setInterval(function () {
    current = Math.min(current + step, target);
    countEl.textContent = current;
    if (current >= target) clearInterval(tick);
  }, 60);
}


/* ── Navbar scroll shadow + active link ────────────────────── */
function initNavbar() {
  const navbar   = document.getElementById("navbar");
  const links    = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section[id]");

  window.addEventListener("scroll", function () {
    navbar.classList.toggle("scrolled", window.scrollY > 40);

    let current = "";
    sections.forEach(function (sec) {
      if (sec.getBoundingClientRect().top <= 100) current = sec.id;
    });

    links.forEach(function (link) {
      const target = link.getAttribute("href").replace("#", "");
      link.classList.toggle("active", target === current);
    });
  }, { passive: true });
}


/* ── Mobile hamburger ──────────────────────────────────────── */
function initMobileMenu() {
  const toggle = document.getElementById("navToggle");
  const menu   = document.getElementById("navLinks");

  toggle.addEventListener("click", function () {
    const open = menu.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
  });

  menu.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("open");
      toggle.classList.remove("open");
    });
  });
}


/* ── Init ──────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", function () {
  runTypingAnimation();
  buildCards();
  updateStats();
  initNavbar();
  initMobileMenu();
});
