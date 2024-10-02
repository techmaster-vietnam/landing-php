export function initZaloContact() {
    $(".button__zalo").on("click", function (e) {
      const $toggleZalo = $(this).siblings(".overlay");
      toggleZaloOverlay($toggleZalo);
  
      $toggleZalo.on("click", function (e) {
        if (e.target === this) {
          hideZaloOverlay($(this));
        }
      });
    });
  
    $(".close__button").on("click", function (e) {
      e.preventDefault();
      const $toggleZalo = $(this).parents(".overlay");
      hideZaloOverlay($toggleZalo);
    });
  }
  
  function toggleZaloOverlay($toggleZalo) {
    $toggleZalo.fadeToggle();
    if ($toggleZalo.is(":visible")) {
      $("body").css("overflow", "hidden");
    } else {
      $("body").css("overflow", "auto");
    }
  }
  
  function hideZaloOverlay($toggleZalo) {
    $toggleZalo.fadeOut();
    $("body").css("overflow", "auto");
  }