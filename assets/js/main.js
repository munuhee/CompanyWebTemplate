/**
 * Template Name: StEvolve
 * Updated: Nov12 2023
 * Author: StEvolve
 */
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /**
   * Smooth scrooling
   */
  const links = document.querySelectorAll('a[href^="#"]');

    for (const link of links) {
        link.addEventListener("click", smoothScroll);
    }

    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
            });
        }
    }

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Cursor animations
   */
  document.body.addEventListener("mousemove", function (event) {
    var t = document.getElementById("cursor");
    var e = document.getElementById("cursor2");
    var i = document.getElementById("cursor3");

    t.style.left = event.clientX + "px";
    t.style.top = event.clientY + "px";
    e.style.left = event.clientX + "px";
    e.style.top = event.clientY + "px";
    i.style.left = event.clientX + "px";
    i.style.top = event.clientY + "px";
  });

  /**
   * Sticky Header on Scroll
   */
  const selectHeader = document.querySelector("#header");
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop;
    let nextElement = selectHeader.nextElementSibling;

    const headerFixed = () => {
      if (headerOffset - window.scrollY <= 0) {
        selectHeader.classList.add("sticked");
        if (nextElement) nextElement.classList.add("sticked-header-offset");
      } else {
        selectHeader.classList.remove("sticked");
        if (nextElement) nextElement.classList.remove("sticked-header-offset");
      }
    };
    window.addEventListener("load", headerFixed);
    document.addEventListener("scroll", headerFixed);
  }

  /**
   * Navbar appearance on scroll
   */
  window.addEventListener("scroll", function () {
    const navbar = document.getElementById("header");

    if (window.scrollY > 50) {
      navbar.classList.remove("transparent");
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
      navbar.classList.add("transparent");
    }
  });

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = document.querySelectorAll("#navbar a");

  function navbarlinksActive() {
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;

      let section = document.querySelector(navbarlink.hash);
      if (!section) return;

      let position = window.scrollY + 200;

      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navbarlinksActive);
  document.addEventListener("scroll", navbarlinksActive);

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector(".mobile-nav-show");
  const mobileNavHide = document.querySelector(".mobile-nav-hide");

  document.querySelectorAll(".mobile-nav-toggle").forEach((el) => {
    el.addEventListener("click", function (event) {
      event.preventDefault();
      mobileNavToogle();
    });
  });

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavShow.classList.toggle("d-none");
    mobileNavHide.classList.toggle("d-none");
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navbar a").forEach((navbarlink) => {
    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll(".navbar .dropdown > a");

  navDropdowns.forEach((el) => {
    el.addEventListener("click", function (event) {
      if (document.querySelector(".mobile-nav-active")) {
        event.preventDefault();
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("dropdown-active");

        let dropDownIndicator = this.querySelector(".dropdown-indicator");
        dropDownIndicator.classList.toggle("bi-chevron-up");
        dropDownIndicator.classList.toggle("bi-chevron-down");
      }
    });
  });

  /**
   * Back to top button
   */
  const backToTop = document.querySelector(".back-to-top");

  if (backToTop) {
    const toggleBackToTop = () => {
      backToTop.classList.toggle("active", window.scrollY > 100);
    };

    window.addEventListener("load", toggleBackToTop);
    window.addEventListener("scroll", toggleBackToTop);
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector(".scroll-top");
  if (scrollTop) {
    const togglescrollTop = function () {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    };
    window.addEventListener("load", togglescrollTop);
    document.addEventListener("scroll", togglescrollTop);
    scrollTop.addEventListener(
      "click",
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    );
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Clients Slider
   */
  new Swiper(".clients-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60,
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80,
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120,
      },
    },
  });

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper(".slides-1", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  /**
   * Init swiper slider with 3 slides at once in desktop view
   */
  new Swiper(".slides-3", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40,
      },

      1200: {
        slidesPerView: 3,
      },
    },
  });

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", () => {
    aos_init();
  });

  /**
   * Initialize a Swiper carousel with coverflow effect,
   * keyboard navigation, loop, and responsive breakpoints.
   */
  var swiper = new Swiper(".brand-elevation-swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 3,
      slideShadows: true,
    },
    keyboard: true,
    mousewheel: {
      thresholdDelta: 70,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 2,
      },
      1560: {
        slidesPerView: 3,
      },
    },
  });

  /**
   * Whatsapp chat
   */
  // Whatsapp Chat Widget by www.bloggermix.com

  document.addEventListener("click", function (event) {
    if (event.target.id === "send-it") {
      var chatInput = document.getElementById("chat-input");
      if (chatInput.value !== "") {
        var phoneNumber = document.getElementById("get-number").textContent;
        var message = document.getElementById("chat-input").value;
        var whatsappWebURL = "https://web.whatsapp.com/send";
        var phone = phoneNumber;
        var text = "&text=" + message;
        if (
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
        ) {
          whatsappWebURL = "whatsapp://send";
        }
        var whatsappURL = whatsappWebURL + "?phone=" + phone + text;
        window.open(whatsappURL, "_blank");
      }
    }
  });

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("informasi")) {
      document.getElementById("get-number").textContent =
        event.target.querySelector(".my-number").textContent;
      document
        .querySelectorAll(".start-chat, .get-new")
        .forEach(function (element) {
          element.classList.add("show");
          element.classList.remove("hide");
        });
      document
        .querySelectorAll(".home-chat, .head-home")
        .forEach(function (element) {
          element.classList.add("hide");
          element.classList.remove("show");
        });
      document.getElementById("get-nama").textContent =
        event.target.querySelector(".info-chat .chat-nama").textContent;
      document.getElementById("get-label").textContent =
        event.target.querySelector(".info-chat .chat-label").textContent;
    }
  });

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("close-chat")) {
      document.getElementById("whatsapp-chat").classList.add("hide");
      document.getElementById("whatsapp-chat").classList.remove("show");
    }
  });

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("chat-toggler")) {
      if (document.getElementById("whatsapp-chat").classList.contains("show")) {
        document.getElementById("whatsapp-chat").classList.add("hide");
        document.getElementById("whatsapp-chat").classList.remove("show");
      } else {
        document.getElementById("whatsapp-chat").classList.add("show");
        document.getElementById("whatsapp-chat").classList.remove("hide");
      }
    }
  });

  /**
   * Get current time
   */
  function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";

    if (hours > 12) {
      hours -= 12;
    }

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    const currentTime = hours + ":" + minutes + " " + ampm;

    document.getElementById("current-time").textContent = currentTime;
  }

  getCurrentTime();
  setInterval(getCurrentTime, 60000);

  // Add a click event listener to the dropdown button
  document
    .getElementById("languageDropdown")
    .addEventListener("click", function () {
      var dropdownMenu = document.querySelector(".dropdown-menu");
      if (
        dropdownMenu.style.display === "none" ||
        dropdownMenu.style.display === ""
      ) {
        dropdownMenu.style.display = "block";
      } else {
        dropdownMenu.style.display = "none";
      }
    });

  /**
   * Whatsapp send message
   */
  document.getElementById("send-button").addEventListener("click", function () {
    const message = document.getElementById("message").value;
    const phoneNumber = "+254712345678"; // Replace with the recipient's phone number

    const apiToken = "YOUR_API_TOKEN";
    const apiUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}&source=web&data-id=${apiToken}`;
    window.open(apiUrl);
  });
});
