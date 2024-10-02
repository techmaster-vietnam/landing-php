export function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    item.addEventListener("click", function() {
      const answer = this.querySelector(".faq-answer");
      toggleFAQ(answer);
    });
  });
}

function toggleFAQ(answer) {
  if (answer.style.display === "block") {
    answer.style.display = "none";
  } else {
    answer.style.display = "block";
  }
}