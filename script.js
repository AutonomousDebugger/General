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
    // ── CARD 2 ──────────────────────────────────────────────
    image:       "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=640&q=80",
    link:        "https://example.com/script-two",
    displayName: "Script",
    title:       "Flee the Facility",
  },

];

/* ============================================================
   SITE CONFIG
   ============================================================ */
const siteConfig = {
  heroText:       "ScriptVault",  // ← Typed hero text
  typingSpeed:    90,             // ← ms per character (lower = faster)
  startDelay:     700,            // ← delay before typing begins (ms)
  webhookURL:     "https://discord.com/api/webhooks/1508006173440217118/sA6YExjSlJX7dINN-KAGl2E1cJYaYLHgtvSjBSBGpeWpc5jm20xQOEP-onJuEJIKgd6G",
  //               ↑ Your Discord webhook URL — REGENERATE if exposed publicly
  cooldownSecs:   30,              // ← Cooldown in seconds after sending a request
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
    img.src     = item.image;       // ← image URL from scriptItems
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
    title.textContent = item.title;       // ← title from scriptItems

    const btn = document.createElement("a");
    btn.className   = "card-btn";
    btn.href        = item.link;          // ← real URL (hidden from visitors)
    btn.textContent = item.displayName;   // ← friendly button label
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


/* ── Request Script form with 5-second cooldown ────────────── */
function initRequestForm() {
  const form   = document.getElementById("requestForm");
  const input  = document.getElementById("requestInput");
  const status = document.getElementById("requestStatus");
  const btn    = document.getElementById("requestBtn");
  if (!form) return;

  let onCooldown = false;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (onCooldown) return;

    const message = input.value.trim();
    if (!message) return;

    // Lock the button immediately
    onCooldown    = true;
    btn.disabled  = true;
    status.className   = "request-status";
    status.textContent = "Sending...";

    // POST to Discord webhook
    try {
      const res = await fetch(siteConfig.webhookURL, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ content: message }),
      });

      if (res.ok) {
        status.textContent = "✓ Request sent!";
        status.className   = "request-status success";
        input.value        = "";
      } else {
        status.textContent = "✗ Failed to send — try again shortly.";
        status.className   = "request-status error";
      }
    } catch {
      status.textContent = "✗ Network error — check your connection.";
      status.className   = "request-status error";
    }

    // 5-second countdown on the button
    let remaining = siteConfig.cooldownSecs;
    btn.textContent = "Wait " + remaining + "s...";

    const countdown = setInterval(function () {
      remaining--;
      if (remaining > 0) {
        btn.textContent = "Wait " + remaining + "s...";
      } else {
        clearInterval(countdown);
        btn.disabled    = false;
        btn.textContent = "Send Request →";
        onCooldown      = false;
        // Clear the status message 1 second after the button re-enables
        setTimeout(function () {
          status.textContent = "";
          status.className   = "request-status";
        }, 1000);
      }
    }, 1000);
  });
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
  initRequestForm();
});
