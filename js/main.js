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
  // Initiate AOS
  ///////////////////
  AOS.init();

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

  function checkFooterVisibility() {
    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Si el top del footer está dentro de la ventana visible
    if (footerRect.top < windowHeight && footerRect.bottom > 0) {
      navbar.classList.add("hidden");
    } else {
      navbar.classList.remove("hidden");
    }
  }

  window.addEventListener("scroll", checkFooterVisibility);
  window.addEventListener("resize", checkFooterVisibility);

  ///////////////////
  // Back to top button
  ///////////////////
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  ///////////////////
  // Inicializar carruseles y portfolio después de que la página cargue completamente
  ///////////////////
  const tabs = document.querySelectorAll('#portfolio-tabs .nav-link');
  const items = document.querySelectorAll('.portfolio-item');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-filter');

      items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === itemCategory || category === 'all') {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
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
  });

  ///////////////////
  // Toggle menú hamburguesa móvil
  ///////////////////
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      if (mobileMenu.classList.contains("show")) {
        mobileMenu.classList.remove("show");
        setTimeout(() => {
          mobileMenu.style.display = "none";
        }, 300);
      } else {
        mobileMenu.style.display = "flex";
        setTimeout(() => {
          mobileMenu.classList.add("show");
        }, 10);
      }
    });

    // Cerrar menú móvil al hacer click en un enlace
    document.querySelectorAll(".nav-btn-mobile").forEach((button) => {
      button.addEventListener("click", () => {
        document
          .querySelectorAll(".nav-btn-mobile")
          .forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        mobileMenu.classList.remove("show");
        setTimeout(() => {
          mobileMenu.style.display = "none";
        }, 300);
        const itemId = button.getAttribute("data-id");
        console.log("Navegando a:", itemId);
      });
    });
  }
})(jQuery);
