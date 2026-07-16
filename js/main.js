document.addEventListener("DOMContentLoaded", function () {
  var menuToggle = document.querySelector(".menu-toggle");
  var mobileMenu = document.querySelector("#mobile-menu");

  if (menuToggle && mobileMenu) {
    function closeMenu() {
      menuToggle.classList.remove("is-open");
      mobileMenu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }

    function toggleMenu() {
      var isOpen = menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.classList.toggle("is-open", !isOpen);
      mobileMenu.classList.toggle("is-open", !isOpen);
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
    }

    menuToggle.addEventListener("click", toggleMenu);

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  var yogaSlideshow = document.querySelector(".yoga-slideshow");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var heroImages = Array.prototype.slice.call(document.querySelectorAll(".hero-image img, .hero-motion"));
  var heroParallaxTicking = false;

  function updateHeroParallax() {
    if (!heroImages.length) {
      return;
    }

    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    heroImages.forEach(function (heroImage) {
      var rect = heroImage.getBoundingClientRect();
      var progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      var clampedProgress = Math.min(Math.max(progress, 0), 1);
      var offset = (clampedProgress - 0.5) * 16;

      heroImage.style.setProperty("--hero-parallax-y", offset.toFixed(2) + "px");
    });

    heroParallaxTicking = false;
  }

  if (heroImages.length && !reduceMotion) {
    updateHeroParallax();

    window.addEventListener("scroll", function () {
      if (heroParallaxTicking) {
        return;
      }

      heroParallaxTicking = true;
      window.requestAnimationFrame(updateHeroParallax);
    }, { passive: true });

    window.addEventListener("resize", function () {
      window.requestAnimationFrame(updateHeroParallax);
    });
  }

  function startAutoFadeSlideshow(slideshow) {
    var slides = Array.prototype.slice.call(slideshow.querySelectorAll(".auto-fade-slide"));
    var readySlides = slides.filter(function (slide) {
      return slide.classList.contains("is-ready");
    });
    var activeIndex = Math.max(0, readySlides.findIndex(function (slide) {
      return slide.classList.contains("is-active");
    }));

    if (readySlides.length < 2) {
      return;
    }

    function showSlide(nextIndex) {
      readySlides[activeIndex].classList.remove("is-active");
      readySlides[nextIndex].classList.add("is-active");
      activeIndex = nextIndex;
    }

    window.setInterval(function () {
      var nextIndex = (activeIndex + 1) % readySlides.length;
      showSlide(nextIndex);
    }, 4500);
  }

  if (!reduceMotion) {
    document.querySelectorAll(".auto-fade-slideshow").forEach(startAutoFadeSlideshow);
  }

  if (!yogaSlideshow || reduceMotion) {
    return;
  }

  var slides = Array.prototype.slice.call(yogaSlideshow.querySelectorAll(".yoga-slide"));
  var readySlides = slides.filter(function (slide) {
    return slide.classList.contains("is-ready");
  });
  var activeIndex = 0;
  var slideshowStarted = false;

  function showSlide(nextIndex) {
    readySlides[activeIndex].classList.remove("is-active");
    readySlides[nextIndex].classList.add("is-active");
    activeIndex = nextIndex;
  }

  function startSlideshow() {
    if (slideshowStarted || readySlides.length < 2) {
      return;
    }

    slideshowStarted = true;

    window.setInterval(function () {
      var nextIndex = (activeIndex + 1) % readySlides.length;
      showSlide(nextIndex);
    }, 4500);
  }

  slides.forEach(function (slide) {
    var image = slide.querySelector("img[data-src]");

    if (!image) {
      return;
    }

    var loader = new Image();

    loader.addEventListener("load", function () {
      image.src = image.getAttribute("data-src");
      image.removeAttribute("data-src");
      slide.classList.add("is-ready");
      readySlides.push(slide);
      startSlideshow();
    });

    loader.src = image.getAttribute("data-src");
  });

  startSlideshow();
});
