if (localStorage.getItem("firstEntry") === "true") {
    const popupContainer = document.getElementById("popupContainer");
    popupContainer.style.display = "none";
  }

  function about() {
    window.open("pages/about.html", "_blank");
  }

  function statistics() {
    window.open("pages/statistics.html", "_blank");
  }

  function rating_scale() {
    window.open("pages/rating-overview.html", "_blank");
  }

  function contributors() {
    window.open("pages/contributors.html", "_blank");
  }

  function filtered() {
    window.location.href = "pages/filtered-search.html";
  }

  function donate() {
    window.open("https://www.buymeacoffee.com/robloxhorrorlist", "_blank");
  }

  function firstEnter() {
    localStorage.setItem("firstEntry", "true");
    const popupContainer = document.getElementById("popupContainer");
    popupContainer.style.display = "none";
  }