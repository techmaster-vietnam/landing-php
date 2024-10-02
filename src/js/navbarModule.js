export function initNavbar() {
    const bar = document.getElementById("bar");
    const navbar = document.getElementById("nav-bar");
    const closebar = document.getElementById("close-bar");
    const body = document.querySelector("body");
    const linklist = document.getElementById("link-list");
    const nav_items = document.querySelectorAll(".nav_category");
  
    bar.onclick = function () {
      navbar.style.width = "250px";
      bar.style.visibility = "hidden";
      body.style.overflowY = "hidden";
      linklist.style.display = "block";
    };
  
    closebar.onclick = closeNavbar;
  
    nav_items.forEach(btn => btn.addEventListener("click", closeNavbar));
  
    function closeNavbar() {
      navbar.style.width = "0px";
      body.style.overflowY = "inherit";
      linklist.style.display = "none";
      setTimeout(() => bar.style.visibility = "inherit", 200);
    }
  }