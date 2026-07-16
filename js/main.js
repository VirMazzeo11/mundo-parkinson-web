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

  if (!reduceMotion) {
    document.body.classList.add("motion-enhanced", "motion-page-enter");

    window.setTimeout(function () {
      document.body.classList.remove("motion-page-enter");
    }, 400);

    var revealGroups = Array.prototype.slice.call(document.querySelectorAll(".side-links ul"));
    var contentButtons = Array.prototype.slice.call(document.querySelectorAll("main .button, main .button-outline, main .button-small-outline, main .media-button, main .social-pill, main .join-button"));
    var visibleContentButtons = [];
    var contentButtonParallaxTicking = false;
    var aboutHomeImage = document.querySelector(".about-home-slide img");
    var aboutImageVisible = false;
    var aboutParallaxTicking = false;

    function revealGroup(group) {
      Array.prototype.slice.call(group.querySelectorAll("li")).forEach(function (item, index) {
        item.classList.add("motion-reveal-link");
        item.style.transitionDelay = (index * 80) + "ms";
        window.setTimeout(function () {
          item.classList.add("is-visible");
        }, 20);
      });
    }

    function updateContentButtonParallax() {
      if (!visibleContentButtons.length) {
        contentButtonParallaxTicking = false;
        return;
      }

      var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      visibleContentButtons.forEach(function (button) {
        var rect = button.getBoundingClientRect();
        var progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
        var clampedProgress = Math.min(Math.max(progress, 0), 1);
        var offset = (clampedProgress - 0.5) * 5;

        button.style.setProperty("--content-button-parallax-y", offset.toFixed(2) + "px");
      });

      contentButtonParallaxTicking = false;
    }

    function requestContentButtonParallax() {
      if (contentButtonParallaxTicking) {
        return;
      }

      contentButtonParallaxTicking = true;
      window.requestAnimationFrame(updateContentButtonParallax);
    }

    function revealContentButton(button) {
      if (visibleContentButtons.indexOf(button) === -1) {
        visibleContentButtons.push(button);
      }

      button.classList.add("is-visible");
      requestContentButtonParallax();
    }

    function updateAboutParallax() {
      if (!aboutImageVisible || !aboutHomeImage) {
        aboutParallaxTicking = false;
        return;
      }

      var frame = aboutHomeImage.closest(".about-home-carousel") || aboutHomeImage;
      var rect = frame.getBoundingClientRect();
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      var progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      var clampedProgress = Math.min(Math.max(progress, 0), 1);
      var offset = (clampedProgress - 0.5) * 8;

      aboutHomeImage.style.setProperty("--about-parallax-y", offset.toFixed(2) + "px");
      aboutParallaxTicking = false;
    }

    function requestAboutParallax() {
      if (aboutParallaxTicking) {
        return;
      }

      aboutParallaxTicking = true;
      window.requestAnimationFrame(updateAboutParallax);
    }

    function revealAboutImage() {
      aboutImageVisible = true;
      aboutHomeImage.classList.add("is-visible");
      requestAboutParallax();
    }

    function revealMotionTarget(target) {
      if (target.classList.contains("content-motion-button")) {
        revealContentButton(target);
        return;
      }

      if (target === aboutHomeImage) {
        revealAboutImage();
        return;
      }

      revealGroup(target);
    }

    contentButtons.forEach(function (button) {
      button.classList.add("content-motion-button");
    });

    if (aboutHomeImage) {
      aboutHomeImage.classList.add("home-about-motion");
    }

    if ("IntersectionObserver" in window) {
      var motionObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          revealMotionTarget(entry.target);
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.18 });

      revealGroups.forEach(function (group) {
        group.querySelectorAll("li").forEach(function (item, index) {
          item.classList.add("motion-reveal-link");
          item.style.transitionDelay = (index * 80) + "ms";
        });

        motionObserver.observe(group);
      });

      contentButtons.forEach(function (button) {
        motionObserver.observe(button);
      });

      if (aboutHomeImage) {
        motionObserver.observe(aboutHomeImage);
      }
    } else {
      revealGroups.forEach(revealGroup);
      contentButtons.forEach(revealContentButton);

      if (aboutHomeImage) {
        revealAboutImage();
      }
    }

    if (aboutHomeImage) {
      window.addEventListener("scroll", requestAboutParallax, { passive: true });
      window.addEventListener("resize", requestAboutParallax);
    }

    if (contentButtons.length) {
      window.addEventListener("scroll", requestContentButtonParallax, { passive: true });
      window.addEventListener("resize", requestContentButtonParallax);
    }
  }

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
