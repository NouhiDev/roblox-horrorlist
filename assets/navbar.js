document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.getElementById("check");
    const icon = document.getElementById("nav-icon");

    checkbox.addEventListener("click", function () {
        if (checkbox.checked) {
            icon.className = "fa fa-times";
            icon.style.transform = "rotate(90deg)";
        } else {
            icon.className = "fa fa-bars";
            icon.style.transform = "rotate(0deg)";
        }
    });
});