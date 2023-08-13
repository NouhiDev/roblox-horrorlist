//   _____   ____  ____  _      ______   __  _    _  ____  _____  _____   ____  _____  _      _____  _____ _______ 
//  |  __ \ / __ \|  _ \| |    / __ \ \ / / | |  | |/ __ \|  __ \|  __ \ / __ \|  __ \| |    |_   _|/ ____|__   __|
//  | |__) | |  | | |_) | |   | |  | \ V /  | |__| | |  | | |__) | |__) | |  | | |__) | |      | | | (___    | |   
//  |  _  /| |  | |  _ <| |   | |  | |> <   |  __  | |  | |  _  /|  _  /| |  | |  _  /| |      | |  \___ \   | |   
//  | | \ \| |__| | |_) | |___| |__| / . \  | |  | | |__| | | \ \| | \ \| |__| | | \ \| |____ _| |_ ____) |  | |   
//  |_|  \_\\____/|____/|______\____/_/ \_\ |_|  |_|\____/|_|  \_\_|  \_\\____/|_|  \_\______|_____|_____/   |_|   

// ID: NDev-ROBLOX-Horrorlist-MAIN

//   For:
//   robloxhorrorlist.com


if (localStorage.getItem("firstEntryNew") === "true") {
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
    localStorage.setItem("firstEntryNew", "true");
    const popupContainer = document.getElementById("popupContainer");
    popupContainer.style.display = "none";
}

async function init() {
    const a = await fetch("https://ndevapi.com/requests");
    const b = await a.json();
    document.getElementById("visitor-count").innerText = (Math.floor(b.requests / 100)) * 100;
}

document.addEventListener("DOMContentLoaded", init);        