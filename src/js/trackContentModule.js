export function initTrackContent() {
    const track_contents = document.querySelectorAll(".track_content");
  
    track_contents.forEach(btn => {
      btn.addEventListener("click", function () {
        const course_info = this.querySelector(".list");
        if (course_info === null) {
          this.style.cursor = "auto";
        } else {
          toggleCourseInfo(course_info, this);
        }
      });
    });
  }
  
  function toggleCourseInfo(course_info, btn) {
    const toggle_btn = btn.querySelector(".toggle_btn");
    if (course_info.style.display !== "block") {
      course_info.style.display = "block";
      toggle_btn.style.transform = "rotate(180deg)";
      toggle_btn.style.transition = "transform 0.3s ease";
    } else {
      course_info.style.display = "none";
      toggle_btn.style.transform = "rotate(0deg)";
      toggle_btn.style.transition = "transform 0.3s ease";
    }
  }