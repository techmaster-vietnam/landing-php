/* purgecss start ignore */
// Các class động được sử dụng
// .valid, .invalid
/* purgecss end ignore */

import "../css/style.css";
import "lazysizes";

function loadModule(moduleName) {
  return import(/* webpackChunkName: "[request]" */ `./${moduleName}Module.js`)
    .then(module => module[`init${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}`]())
    .catch(err => console.error(`Error loading ${moduleName} module:`, err));
}

//passive scroll Jquery
jQuery.event.special.touchstart = {
  setup: function (_, ns, handle) {
    this.addEventListener("touchstart", handle, {
      passive: !ns.includes("noPreventDefault"),
    });
  },
};
jQuery.event.special.touchmove = {
  setup: function (_, ns, handle) {
    this.addEventListener("touchmove", handle, {
      passive: !ns.includes("noPreventDefault"),
    });
  },
};
jQuery.event.special.wheel = {
  setup: function (_, ns, handle) {
    this.addEventListener("wheel", handle, { passive: true });
  },
};
jQuery.event.special.mousewheel = {
  setup: function (_, ns, handle) {
    this.addEventListener("mousewheel", handle, { passive: true });
  },
};

document.addEventListener('DOMContentLoaded', () => {
  // Load Navbar ngay lập tức vì nó cần thiết cho mọi trang
  import('./navbarModule.js').then(module => module.initNavbar());

  // Khởi tạo Intersection Observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const moduleName = entry.target.dataset.module;
        loadModule(moduleName);
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '100px' });

  // Observe các phần tử cần lazy load
  document.querySelectorAll('[data-module]').forEach(el => observer.observe(el));

  // Load scroll module ngay lập tức vì nó không phụ thuộc vào một phần tử cụ thể
  loadModule('zaloContact');
  loadModule('scroll');
});




