(function ($) {
  "use strict";

  ///////////////////
  // Dropdown on mouse hover
  ///////////////////
  $(document).ready(function () {
    function toggleNavbarMethod() {
      if ($(window).width() > 992) {
        $(".navbar .dropdown")
          .on("mouseover", function () {
            $(".dropdown-toggle", this).trigger("click");
          })
          .on("mouseout", function () {
            $(".dropdown-toggle", this).trigger("click").blur();
          });
      } else {
        $(".navbar .dropdown").off("mouseover").off("mouseout");
      }
    }
    toggleNavbarMethod();
    $(window).resize(toggleNavbarMethod);
  });

  ///////////////////
  // Loader
  ///////////////////
  document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");

    // Mostrar loader al cargar la página
    window.addEventListener("load", () => {
      setTimeout(() => {
        loader.classList.add("fade-out");
        document.body.classList.remove("loading");
      }, 800);
    });

    // Agregar transición solo a enlaces internos y sin target="_blank"
    const enlaces = document.querySelectorAll("a[href]");
    enlaces.forEach((link) => {
      link.addEventListener("click", (e) => {
        const url = link.href;
        const esMismaPagina = url === window.location.href;
        const esInterno = link.host === window.location.host;
        const abreNuevaPestaña = link.target === "_blank";

        if (
          !esInterno ||
          abreNuevaPestaña ||
          esMismaPagina ||
          url.includes("#")
        ) {
          return; // Dejamos que el navegador actúe normal
        }

        e.preventDefault(); // Evitamos navegación inmediata

        loader.classList.remove("fade-out");
        loader.style.opacity = "1";
        loader.style.visibility = "visible";
        document.body.classList.add("loading");

        setTimeout(() => {
          window.location.href = url;
        }, 800);
      });
    });

    // Manejar "volver atrás"
    window.addEventListener("pageshow", (event) => {
      if (event.persisted) {
        loader.classList.remove("fade-out");
        document.body.classList.add("loading");
        setTimeout(() => {
          loader.classList.add("fade-out");
          document.body.classList.remove("loading");
        }, 600);
      }
    });
  });

  ///////////////////
  // Navbar
  ///////////////////
  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.addEventListener("click", () => {
      document
        .querySelectorAll(".nav-btn")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      const itemId = button.getAttribute("data-id");
      console.log("Navegando a:", itemId);
    });
  });

  const navbar = document.getElementById("navbar-floating");
  const footer = document.getElementById("footer-page");

  if (navbar && footer) {
    function checkFooterVisibility() {
      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (footerRect.top < windowHeight && footerRect.bottom > 0) {
        navbar.classList.add("hidden");
      } else {
        navbar.classList.remove("hidden");
      }
    }

    window.addEventListener("scroll", checkFooterVisibility);
    window.addEventListener("resize", checkFooterVisibility);
  }

  ///////////////////
  // Inicializar carruseles y portfolio después de que la página cargue completamente
  ///////////////////
  const tabs = document.querySelectorAll("#portfolio-tabs .nav-link");
  const items = document.querySelectorAll(".portfolio-item");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const category = tab.getAttribute("data-filter");

      items.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");
        if (category === itemCategory || category === "all") {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });

  ///////////////////
  // Testimonials carousel
  ///////////////////
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    margin: 30,
    dots: true,
    loop: true,
    center: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });

  ///////////////////
  // Client carousel
  ///////////////////
  $(".client-carousel").owlCarousel({
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: false,
    smartSpeed: 1000,
    margin: 30,
    dots: false,
    loop: true,
    responsive: {
      0: {
        items: 2,
      },
      576: {
        items: 3,
      },
      768: {
        items: 4,
      },
      992: {
        items: 5,
      },
    },
  });

  ///////////////////
  // Toggle menú hamburguesa móvil
  ///////////////////

  ///////////////////
  // Typewriter effect
  ///////////////////
  document.addEventListener("DOMContentLoaded", () => {
    const text = "Agencia de Marketing Integral";
    const element = document.getElementById("typewriter-text");
    let index = 0;

    function typeWriter() {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100); // Velocidad de escritura
      } else {
        // Agregar cursor parpadeante al final
        element.innerHTML += '<span class="cursor">|</span>';
        setInterval(() => {
          const cursor = element.querySelector(".cursor");
          cursor.style.visibility =
            cursor.style.visibility === "hidden" ? "visible" : "hidden";
        }, 500);
      }
    }

    // Esperar 2 segundos antes de iniciar el efecto
    setTimeout(() => {
      typeWriter();
    }, 2000);
  });
})(jQuery);

const dot = document.querySelector("#dot");
const ring = document.querySelector("#ring");

if (dot && ring) {
  let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx}px,${my}px)`;
  });

  function loop() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx}px,${ry}px)`;
    requestAnimationFrame(loop);
  }
  loop();
}

///////////////////
// Menú cortina (hamburger menu)
///////////////////
let isOpen = false;
let currentBg = "#111";
let tl = null;

const curtain = document.getElementById("curtain");
const curtainInner = curtain.querySelector(".curtain-inner");
const hamburger = document.getElementById("hamburger");
const bars = hamburger.querySelectorAll(".bar");

const timeLabel = document.getElementById("time-label");
const navItems = document.querySelectorAll(".hamburger-menu .nav-item");
const navFooter = document.querySelector(".hamburger-menu .nav-footer");
const pageContent = document.getElementById("page-content");

gsap.set(curtain, {
  display: "none",
  transformOrigin: "top center",
  scaleY: 0,
});
gsap.set(curtainInner, { opacity: 0 });
gsap.set(navItems, { y: 40, opacity: 0 });
gsap.set(navFooter, { y: 30, opacity: 0 });

function updateTime() {
  const now = new Date();
  timeLabel.textContent =
    now.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }) +
    " · León, Mx";
}
updateTime();
setInterval(updateTime, 30000);

function getDuration() {
  return 0.6;
}
function getEasing() {
  return "linear";
}

function openMenu() {
  if (tl) tl.kill();
  const d = getDuration();
  const e = getEasing();

  tl = gsap.timeline({
    onStart: () => {
      hamburger.classList.add("open");
      hamburger.setAttribute("aria-expanded", "true");
    },
  });

  tl.set(curtain, { display: "block" })
    .to(curtain, { scaleY: 1, duration: d * 0.7, ease: e })
    .to(curtainInner, { opacity: 1, duration: d * 0.3 }, "-=0.15")
    .add(() => pageContent.classList.add("menu-blur"), "-=0.3")
    .to(
      navItems,
      {
        y: 0,
        opacity: 1,
        duration: d * 0.5,
        stagger: 0.07,
        ease: "power3.out",
      },
      "-=0.25",
    )
    .to(
      navFooter,
      { y: 0, opacity: 1, duration: d * 0.35, ease: "power2.out" },
      "-=0.2",
    );
}

function closeMenu() {
  if (tl) tl.kill();
  const d = getDuration();
  const e = getEasing();

  tl = gsap.timeline({
    onStart: () => {
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    },
  });

  tl.to(navItems, {
    y: 30,
    opacity: 0,
    duration: d * 0.2,
    stagger: 0.02,
    ease: "power2.in",
  })
    .to(navFooter, { y: 20, opacity: 0, duration: d * 0.15 }, "-=0.1")
    .add(() => pageContent.classList.remove("menu-blur"), "-=0.1")
    .to(curtainInner, { opacity: 0, duration: d * 0.15 }, "-=0.05")
    .to(curtain, { scaleY: 0, duration: d * 0.5, ease: e }, "-=0.1")
    .set(curtain, { display: "none" });
}

window.toggleMenu = function () {
  isOpen ? closeMenu() : openMenu();
  isOpen = !isOpen;
};

function setColor(bg, textColor) {
  const isLight = bg === "#f5f5f0";
  currentBg = bg;
  gsap.set(curtain, { background: bg });
  document.querySelectorAll(".hamburger-menu .nav-link").forEach((el) => {
    el.style.color = isLight ? "#111" : "#fff";
    el.onmouseenter = () => (el.style.color = "#888");
    el.onmouseleave = () => (el.style.color = isLight ? "#111" : "#fff");
  });
  document.querySelectorAll(".hamburger-menu .social-link").forEach((el) => {
    el.style.color = isLight ? "#999" : "#555";
  });
  timeLabel.style.color = isLight ? "#999" : "#444";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isOpen) window.toggleMenu();
});

const equipo = [
  {
    nombre: "Leo González",
    rol: "Diseño",
    initials: "LG",
    avatarBg: "#EEEDFE",
    avatarColor: "#3C3489",
    mensaje: "Esta semana no puedo parar de escuchar esto",
    spotifyId: "track/7qkKJFIYBsLEVOjgAwqTlz",
    trackName: "Track 1",
    artista: "Artista 1",
    semana: 1,
  },
  {
    nombre: "Leo González",
    rol: "Diseño",
    initials: "LG",
    avatarBg: "#EEEDFE",
    avatarColor: "#3C3489",
    mensaje: "Esta semana no puedo parar de escuchar esto",
    spotifyId: "track/7qkKJFIYBsLEVOjgAwqTlz",
    trackName: "Umbro",
    artista: "Ghost",
    semana: 2,
  },
  {
    nombre: "María López",
    rol: "Marketing",
    initials: "ML",
    avatarBg: "#FAEEDA",
    avatarColor: "#633806",
    mensaje: "Perfecta para concentrarse",
    spotifyId: "track/5Rqh2EiFg4D22cJ3kIqCjm",
    trackName: "Track 3",
    artista: "Artista 3",
    semana: 3,
  },
  {
    nombre: "Diego Salas",
    rol: "Backend",
    initials: "DS",
    avatarBg: "#E6F1FB",
    avatarColor: "#0C447C",
    mensaje: "No la esperaba pero me encantó",
    spotifyId: "track/0rKtyWc8bvkfBm2SWi8Vw3",
    trackName: "Track 4",
    artista: "Artista 4",
    semana: 4,
  },
];

const widget = document.getElementById("musicWidget");
const card = document.getElementById("musicCard");
const btn = document.getElementById("musicBtn");
const closeBtn = document.getElementById("wClose");

const now = new Date();
const start = new Date(now.getFullYear(), 0, 1);
const calcWeek = Math.ceil(((now - start) / 86400000 + start.getDay() + 1) / 7);
const override = localStorage.getItem("musicWeekOverride");
const weekNum = override ? parseInt(override, 10) : calcWeek;
const idx = (weekNum - 1) % equipo.length;
const member = equipo[idx] || equipo[0];

if (!equipo[idx]) {
  console.warn("musicWeekOverride inválido, usando semana 1");
}

document.getElementById("wAvatar").style.background = member.avatarBg;
document.getElementById("wAvatar").style.color = member.avatarColor;
document.getElementById("wAvatar").textContent = member.initials;
document.getElementById("wName").textContent = member.nombre;
document.getElementById("wRole").textContent = member.rol;
document.getElementById("wMsg").textContent = '"' + member.mensaje + '"';
document.getElementById("wIframe").src =
  "https://open.spotify.com/embed/" + member.spotifyId;
document.getElementById("wWeek").textContent = override
  ? "Semana " + weekNum + " (fijada)"
  : "Semana " + weekNum;
const daysLeft = 7 - now.getDay();
document.getElementById("wCountdown").textContent =
  "cambia en " + daysLeft + " día" + (daysLeft !== 1 ? "s" : "");

let open = false;

function openWidget() {
  open = true;
  btn.classList.add("hidden");
  card.classList.add("open");
  localStorage.removeItem("musicWidgetClosed");
}

function closeWidget() {
  open = false;
  card.classList.remove("open");
  btn.classList.remove("hidden");
  localStorage.setItem("musicWidgetClosed", "1");
}

if (localStorage.getItem("musicWidgetClosed") !== "1") {
  openWidget();
}

btn.addEventListener("click", openWidget);
closeBtn.addEventListener("click", closeWidget);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && open) closeWidget();
});

/* ─── PILL: etiqueta animada ──────────────────────────────────── */
const pill = document.getElementById("musicPill");
const pillContent = document.getElementById("pillContent");
let phase = "idle";
let hoverActive = false;
let hideTimer = null;

function showLoading() {
  if (!pill || !pillContent) return;
  pillContent.innerHTML =
    '<span class="music-loading">cargando' +
    "<span>.</span><span>.</span><span>.</span></span>";
  pill.classList.add("show");
  phase = "loading";
}

function showTrackName() {
  if (!pill || !pillContent) return;
  const txt =
    member && member.trackName
      ? member.trackName + " \u00B7 " + member.artista
      : "Recomendación del equipo";
  const doubled =
    txt +
    "\u00a0\u00a0\u00a0\u00a0\u00a0" +
    txt +
    "\u00a0\u00a0\u00a0\u00a0\u00a0";
  pillContent.innerHTML =
    '<div class="music-marquee-wrap">' +
    '<span class="music-marquee-text run">' +
    escaped(doubled) +
    "</span>" +
    "</div>";
  phase = "showing";
  clearTimeout(hideTimer);
  hideTimer = setTimeout(hidePill, 4000);
}

function escaped(s) {
  const d = document.createElement("div");
  d.appendChild(document.createTextNode(s));
  return d.innerHTML;
}

function hidePill() {
  if (hoverActive || !pill) return;
  pill.classList.remove("show");
  phase = "idle";
}

function startSequence() {
  setTimeout(function () {
    showLoading();
    setTimeout(showTrackName, 1500);
  }, 800);
}

btn.addEventListener("mouseenter", function () {
  if (phase === "loading") return;
  hoverActive = true;
  clearTimeout(hideTimer);
  if (phase !== "showing") showTrackName();
});

btn.addEventListener("mouseleave", function () {
  hoverActive = false;
  hideTimer = setTimeout(hidePill, 800);
});

btn.addEventListener("focus", function () {
  btn.dispatchEvent(new Event("mouseenter"));
});

btn.addEventListener("blur", function () {
  btn.dispatchEvent(new Event("mouseleave"));
});

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  var musicRing = document.querySelector(".music-btn-ring");
  if (musicRing) musicRing.style.animation = "none";
  var marquee = document.querySelector(".music-marquee-text");
  if (marquee) marquee.style.animation = "none";
}

startSequence();

// Fallback: si el loader de página no se oculta en 5s, forzarlo
(function () {
  var loader = document.getElementById("loader");
  if (!loader) return;
  var check = setInterval(function () {
    if (loader.classList.contains("fade-out")) {
      clearInterval(check);
    }
  }, 100);
  setTimeout(function () {
    if (!loader.classList.contains("fade-out")) {
      loader.classList.add("fade-out");
      document.body.classList.remove("loading");
    }
    clearInterval(check);
  }, 5000);
})();

// GSAP section entrance animations
(function () {
  if (typeof gsap === "undefined") return;

  var sections = document.querySelectorAll("section");
  var exclude = ["carouselSection1", "carouselSection2"];

  sections.forEach(function (section) {
    if (exclude.indexOf(section.id) === -1) {
      gsap.set(section, { opacity: 0, y: 30 });
    }
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  sections.forEach(function (section) {
    if (exclude.indexOf(section.id) === -1) {
      observer.observe(section);
    }
  });
})();
