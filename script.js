// ---------------------------------------------------------------------------
// Claire Jiang — Portfolio interactions
// Nav scroll state + mobile toggle, scroll-spy, reveal-on-scroll,
// art gallery filtering + lightbox, back-to-top.
// ---------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initNavToggle();
  initScrollSpy();
  initReveal();
  initArtFilters();
  initLightbox();
  initBackToTop();
  initStatCounters();
});

function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
  });
  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.classList.remove("is-open");
    });
  });
}

function initScrollSpy() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  if (!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((s) => observer.observe(s));
}

function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  els.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
    observer.observe(el);
  });
}

function initArtFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  const tiles = document.querySelectorAll(".art-tile");
  if (!buttons.length || !tiles.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.dataset.filter;

      tiles.forEach((tile) => {
        const match = category === "all" || tile.dataset.category === category;
        tile.classList.toggle("is-hidden", !match);
      });
    });
  });
}

function initLightbox() {
  const tiles = Array.from(document.querySelectorAll(".art-tile[data-lightbox]"));
  const lightbox = document.querySelector(".lightbox");
  if (!tiles.length || !lightbox) return;

  const img = lightbox.querySelector("img");
  const caption = lightbox.querySelector(".lightbox-caption");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".lightbox-nav.prev");
  const nextBtn = lightbox.querySelector(".lightbox-nav.next");

  let currentIndex = 0;

  const visibleTiles = () => tiles.filter((t) => !t.classList.contains("is-hidden"));

  const open = (index) => {
    const list = visibleTiles();
    if (!list.length) return;
    currentIndex = index;
    const tile = list[currentIndex];
    const fullSrc = tile.dataset.full || tile.querySelector("img").src;
    img.src = fullSrc;
    img.alt = tile.querySelector("img").alt || "";
    caption.textContent = tile.dataset.caption || tile.querySelector("img").alt || "";
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  const step = (dir) => {
    const list = visibleTiles();
    if (!list.length) return;
    currentIndex = (currentIndex + dir + list.length) % list.length;
    open(currentIndex);
  };

  tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      const list = visibleTiles();
      open(list.indexOf(tile));
    });
  });

  closeBtn?.addEventListener("click", close);
  prevBtn?.addEventListener("click", () => step(-1));
  nextBtn?.addEventListener("click", () => step(1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });
}

function initBackToTop() {
  const btn = document.querySelector(".to-top");
  if (!btn) return;
  window.addEventListener(
    "scroll",
    () => {
      btn.classList.toggle("is-visible", window.scrollY > 500);
    },
    { passive: true }
  );
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initStatCounters() {
  const counters = document.querySelectorAll("[data-count-to]");
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseFloat(el.dataset.countTo);
    const suffix = el.dataset.suffix || "";
    const duration = 1100;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = (target % 1 === 0 ? Math.round(value) : value.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((c) => observer.observe(c));
}
