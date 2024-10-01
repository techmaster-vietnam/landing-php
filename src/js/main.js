/* purgecss start ignore */
// Các class động được sử dụng
// .valid, .invalid
/* purgecss end ignore */

import "../css/style.css";
import "lazysizes";

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

let bar = document.getElementById("bar");
let navbar = document.getElementById("nav-bar");
let closebar = document.getElementById("close-bar");
let body = document.querySelector("body");
let linklist = document.getElementById("link-list");
let nav_item = document.querySelectorAll(".nav_category");

let flag = false;

bar.onclick = function () {
  navbar.style.width = "250px";
  bar.style.visibility = "hidden";
  body.style.overflowY = "hidden";
  linklist.style.display = "block";
};

closebar.onclick = function () {
  navbar.style.width = "0px";
  body.style.overflowY = "inherit";
  linklist.style.display = "none";
  setTimeout(function () {
    bar.style.visibility = "inherit";
  }, 200);
};

nav_item.forEach(function (btn) {
  btn.addEventListener("click", function () {
    navbar.style.width = "0px";
    body.style.overflowY = "inherit";
    linklist.style.display = "none";
    setTimeout(function () {
      bar.style.visibility = "inherit";
    }, 200);
  });
});

let question_icon = document.querySelectorAll(".question_icon");

question_icon.forEach(function (btn) {
  btn.addEventListener("click", function () {
    let question_info =
      this.parentElement.parentElement.querySelector(".question_item");
    if (question_info.style.display == "block") {
      question_info.style.display = "none";
      this.querySelector("img").src = "img/down-arrow.svg";
    } else if (question_info.style.display == "none") {
      question_info.style.display = "block";
      this.querySelector("img").src = "img/up-arrow.svg";
    }
  });
});

console.log(question_icon);

question_icon.forEach(function (btn) {
  question_icon.onclick = function () {
    console.log("hi");
  };
});

function checkValid(name, phone, email) {
  let valid = true;

  const nameMessage = document.querySelector(".name-message");
  const phoneMessage = document.querySelector(".phone-message");
  const emailMessage = document.querySelector(".email-message");

  if (name.value.trim() == "") {
    name.classList.remove("valid");
    name.classList.add("invalid");
    nameMessage.innerText = "Vui lòng nhập đúng họ tên";
    valid = false;
  } else {
    name.classList.remove("invalid");
    name.classList.add("valid");
    nameMessage.innerText = "";
  }

  if (phone.value.trim() == "") {
    phone.classList.remove("valid");
    phone.classList.add("invalid");
    phoneMessage.innerText = "Vui lòng nhập đúng số điện thoại";
    valid = false;
  } else {
    phone.classList.remove("invalid");
    phone.classList.add("valid");
    phoneMessage.innerText = "";
  }

  if (email.value.trim() == "" || !email.value.includes("@")) {
    email.classList.remove("valid");
    email.classList.add("invalid");
    emailMessage.innerText = "Vui lòng nhập đúng email";
    valid = false;
  } else {
    email.classList.remove("invalid");
    email.classList.add("valid");
    emailMessage.innerText = "";
  }

  return valid;
}

function toggleModal() {
  const body = document.querySelector("body");
  successModal.classList.toggle("showUp");
  body.classList.toggle("preventScroll");
}

const successModal = document.getElementById("successModal");
successModal.addEventListener("click", function () {
  toggleModal();
});

document.getElementById("btn-register").addEventListener("click", function (e) {
  const name = document.getElementById("name");
  const phone = document.getElementById("phone");
  const email = document.getElementById("email");
  const note = document.getElementById("note");

  if (checkValid(name, phone, email)) {
    let nameVal = name.value;
    let phoneVal = phone.value;
    let emailVal = email.value;
    let noteVal = note.value;

    let req = {
      FullName: nameVal,
      Email: emailVal,
      Phone: phoneVal,
      Note: noteVal,
      Link: window.location.href,
      ItemId: "99NwITI0",
      // Type: 1,
    };

    let myJSON = JSON.stringify(req);

    $.ajax({
      url: "https://techmaster.vn/submit-advisory",
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: myJSON,
      dataType: "json",
      success: function () {
        name.value = phone.value = email.value = note.value = "";
        name.classList.remove("valid");
        phone.classList.remove("valid");
        email.classList.remove("valid");
        toggleModal();
      },
      error: function (result) {
        console.error(result);
      },
    });
  }
});


$(window)
  .scroll(function () {
    var scrollDistance = $(window).scrollTop();

    // Assign active class to nav links while scolling
    $(".menu-section").each(function (i) {
      if ($(this).position().top <= scrollDistance) {
        $(".nav_category a.active").removeClass("active");
        $(".nav_category a").eq(i).addClass("active");
      }
    });

    if (scrollDistance > 100) {
      // $('.nav_bar').css("background-color","#233329");
      $(".nav_bar").addClass("nav_bar_active");
    }

    if (scrollDistance < 100) {
      // $('.nav_bar').css("background-color","none");
      $(".nav_bar").removeClass("nav_bar_active");
    }

  })
  .scroll();

var slideIndex = 1;

let dot_bar = document.getElementById("dot_bar");
var allslides = document.getElementsByClassName("mySlides");

for (let i = 1; i <= allslides.length; i++) {
  dot_bar.innerHTML += `
    <span class="dot"></span>
  `;
}

let dot = document.getElementsByClassName("dot");

$.each(dot, function (index, icon) {
  console.log("index ", index, icon);
  icon.addEventListener("click", function () {
    slideIndex = index + 1;
    console.log(slideIndex);
    showSlides(slideIndex);
  });
});

showSlides(slideIndex);

let prev_btn = document.getElementById("prev_btn");

prev_btn.addEventListener("click", function () {
  slideIndex--;
  console.log(slideIndex);
  showSlides(slideIndex);
});

prev_btn.addEventListener("click", function () {
  console.log("hello");
});

let next_btn = document.getElementById("next_btn");

next_btn.addEventListener("click", function () {
  slideIndex++;
  console.log(slideIndex);
  showSlides(slideIndex);
});

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    // console.log("i m called");
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" slide_active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " slide_active";
}

let track_content = document.querySelectorAll(".track_content");

track_content.forEach(function (btn) {
  btn.addEventListener("click", function () {
    let course_info = this.querySelector(".list");
    if (course_info === null) {
      this.style.cursor = "auto";
    } else {
      if (course_info.style.display == "") {
        course_info.style.display = "block";
        console.log(this.src);
        this.querySelector("toggle_btn").src = "img/up-arrow.svg";
      } else if (course_info.style.display == "block") {
        console.log("block");
        course_info.style.display = "none";
        this.querySelector("toggle_btn").src = "img/down-arrow.svg";
      } else if (course_info.style.display == "none") {
        course_info.style.display = "block";
        console.log(this.src);
        this.querySelector("toggle_btn").src = "img/up-arrow.svg";
      }
    }
  });
});
function ShowQuestion() {
  $(".faq-item").on("click", function (e) {
    $(e.target.closest(".faq-item")).children().next().fadeToggle();
  });
}
ShowQuestion();

$(document).ready(function(){
  // Zalo contact
  $(".button__zalo").on("click", function (e) {
    const $toggleZalo = $(this).siblings(".overlay");
    $toggleZalo.fadeToggle();
    if ($toggleZalo.is(":visible")) {
      $("body").css("overflow", "hidden");
    } else {
      $("body").css("overflow", "auto");
    }

    // Thêm lắng nghe sự kiện "click" trên phần tử "overlay"
    $toggleZalo.on("click", function (e) {
      // Kiểm tra xem sự kiện được kích hoạt có từ phần tử "overlay" hay không
      if (e.target === this) {
        // Nếu không phải, ẩn lớp overlay và đặt lại trạng thái "overflow" cho phần tử "body"
        $(this).fadeOut();
        $("body").css("overflow", "auto");
      }
    });
  });

  $(".close__button").on("click", function (e) {
    e.preventDefault();
    const $toggleZalo = $(this).parents(".overlay");
    $toggleZalo.fadeToggle();
    $("body").css("overflow", "auto");
  });
})