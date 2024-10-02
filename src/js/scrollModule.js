export function initScroll() {
    $(window).scroll(function () {
      var scrollDistance = $(window).scrollTop();
  
      $(".menu-section").each(function (i) {
        if ($(this).position().top <= scrollDistance) {
          $(".nav_category a.active").removeClass("active");
          $(".nav_category a").eq(i).addClass("active");
        }
      });
  
      if (scrollDistance > 100) {
        $(".nav_bar").addClass("nav_bar_active");
      } else {
        $(".nav_bar").removeClass("nav_bar_active");
      }
    }).scroll();
  }