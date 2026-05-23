/* ============================================================
   ██████████████████████████████████████████████████████████
   █                                                        █
   █   EDITABLE DATA — ADD / REMOVE CARDS HERE ONLY        █
   █                                                        █
   ██████████████████████████████████████████████████████████

   HOW TO ADD A NEW CARD:
   Copy one of the objects below (the { } block), paste it
   inside scriptItems, separate with a comma, and fill in:

     image       ← direct URL to the card's preview image
     link        ← the REAL destination URL (hidden from display)
     displayName ← text shown on the button, e.g. "Open Script"
     title       ← headline text shown on the card

   The site rebuilds the grid automatically. No other code
   needs to be touched.
   ============================================================ */

const scriptItems = [

  {
     
    
    image:       "https://tr.rbxcdn.com/180DAY-e2c86d2224da7753fb673da02d961f16/500/280/Image/Jpeg/noFilter",
    link:        "https://www.dhgate.com/product/designer-sunglasses-classic-eyeglasses-goggle/833344893.html?f=bm|aff|yfaf|2086127|2086127_2094467_654867|L69e8828be4b05a4ad5c30cde|260522230758a363d76f4f43e680b7291516|2103420|%7C",
    displayName: "Script",
    title:       "Flee the Facility"
  },

];

/* ============================================================
   SITE CONFIG — Optional cosmetic settings
   ============================================================ */
const siteConfig = {
  heroText:     "ScriptVault",   // ← Text typed in the hero animation
  typingSpeed:  90,              // ← Milliseconds per character (lower = faster)
  startDelay:   700,             // ← Delay before typing starts (ms)
};

/* ============================================================
   ██████████████████████████████████████████████████████████
   █   EVERYTHING BELOW THIS LINE IS GENERATED CODE         █
   █   You do NOT need to edit anything below here.         █
   ██████████████████████████████████████████████████████████
   ============================================================ */


/* ── Typing animation ──────────────────────────────────────── */
function runTypingAnimation() {
  const el      = document.getElementById("heroTitle");
  const text    = siteConfig.heroText;
  const speed   = siteConfig.typingSpeed;
  const delay   = siteConfig.startDelay;
  let   index   = 0;

  // Create a blinking cursor element
  const cursor  = document.createElement("span");
  cursor.className = "cursor";
  el.appendChild(cursor);

  setTimeout(function type() {
    if (index < text.length) {
      // Insert character before the cursor
      cursor.insertAdjacentText("beforebegin", text[index]);
      index++;
      setTimeout(type, speed);
    }
    // Cursor stays blinking after typing finishes
  }, delay);
}


/* ── Build script cards ────────────────────────────────────── */
function buildCards() {
  const grid = document.getElementById("cardsGrid");

  scriptItems.forEach(function(item, i) {
    /* --- Card container --- */
    const card = document.createElement("div");
    card.className = "script-card";
    // Stagger the reveal animation delay per card
    card.style.animationDelay = (i * 90) + "ms";

    /* --- Image wrapper --- */
    const imgWrap = document.createElement("div");
    imgWrap.className = "card-image-wrap";

    const img = document.createElement("img");
    img.src   = item.image;   // ← image URL from scriptItems
    img.alt   = item.title;
    img.loading = "lazy";

    // Fallback if image fails to load
    img.onerror = function () {
      imgWrap.style.background = "linear-gradient(135deg, #0f1318, #192030)";
      this.style.display = "none";
    };

    imgWrap.appendChild(img);

    /* --- Card body --- */
    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("p");
    title.className   = "card-title";
    title.textContent = item.title;   // ← title from scriptItems

    /* --- Button / link (shows displayName, hides real link) --- */
    const btn = document.createElement("a");
    btn.className   = "card-btn";
    btn.href        = item.link;         // ← real URL (not shown to user)
    btn.textContent = item.displayName;  // ← friendly label shown on button
    btn.target      = "_blank";
    btn.rel         = "noopener noreferrer";

    /* Assemble */
    body.appendChild(title);
    body.appendChild(btn);
    card.appendChild(imgWrap);
    card.appendChild(body);
    grid.appendChild(card);
  });
}


/* ── Update script count stat ─────────────────────────────── */
function updateStats() {
  const countEl = document.getElementById("scriptCount");
  if (!countEl) return;

  // Animate the number counting up
  let current = 0;
  const target = scriptItems.length;
  const step   = Math.max(1, Math.floor(target / 20));
  const tick   = setInterval(function () {
    current = Math.min(current + step, target);
    countEl.textContent = current;
    if (current >= target) clearInterval(tick);
  }, 60);
}


/* ── Navbar: scroll shadow + active link ─────────────────── */
function initNavbar() {
  const navbar  = document.getElementById("navbar");
  const links   = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section[id]");

  window.addEventListener("scroll", function () {
    // Add shadow/border glow when scrolled
    navbar.classList.toggle("scrolled", window.scrollY > 40);

    // Highlight the nav link matching the current section
    let current = "";
    sections.forEach(function (sec) {
      const top = sec.getBoundingClientRect().top;
      if (top <= 100) current = sec.id;
    });

    links.forEach(function (link) {
      const target = link.getAttribute("href").replace("#", "");
      link.classList.toggle("active", target === current);
    });
  }, { passive: true });
}


/* ── Mobile hamburger toggle ─────────────────────────────── */
function initMobileMenu() {
  const toggle = document.getElementById("navToggle");
  const menu   = document.getElementById("navLinks");

  toggle.addEventListener("click", function () {
    const open = menu.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
  });

  // Close menu when a link is clicked
  menu.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("open");
      toggle.classList.remove("open");
    });
  });
}


/* ── Init on DOM ready ───────────────────────────────────── */
document.addEventListener("DOMContentLoaded", function () {
  runTypingAnimation();
  buildCards();
  updateStats();
  initNavbar();
  initMobileMenu();
});
