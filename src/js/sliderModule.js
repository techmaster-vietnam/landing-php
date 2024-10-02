let slideIndex = 1;
let slides, dots;

export function initSlider() {
  slides = document.getElementsByClassName("mySlides");
  dots = document.getElementsByClassName("dot");

  const dot_bar = document.getElementById("dot_bar");
  const prev_btn = document.getElementById("prev_btn");
  const next_btn = document.getElementById("next_btn");

  // Tạo các dots nếu chúng chưa tồn tại
  if (dots.length === 0) {
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('span');
      dot.className = 'dot';
      dot.addEventListener('click', () => currentSlide(i + 1));
      dot_bar.appendChild(dot);
    }
    dots = document.getElementsByClassName("dot"); // Cập nhật lại dots sau khi tạo
  }

  prev_btn.addEventListener("click", () => plusSlides(-1));
  next_btn.addEventListener("click", () => plusSlides(1));

  showSlides(slideIndex);
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" slide_active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " slide_active";
}
