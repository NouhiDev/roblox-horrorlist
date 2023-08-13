//   _____   ____  ____  _      ______   __  _    _  ____  _____  _____   ____  _____  _      _____  _____ _______ 
//  |  __ \ / __ \|  _ \| |    / __ \ \ / / | |  | |/ __ \|  __ \|  __ \ / __ \|  __ \| |    |_   _|/ ____|__   __|
//  | |__) | |  | | |_) | |   | |  | \ V /  | |__| | |  | | |__) | |__) | |  | | |__) | |      | | | (___    | |   
//  |  _  /| |  | |  _ <| |   | |  | |> <   |  __  | |  | |  _  /|  _  /| |  | |  _  /| |      | |  \___ \   | |   
//  | | \ \| |__| | |_) | |___| |__| / . \  | |  | | |__| | | \ \| | \ \| |__| | | \ \| |____ _| |_ ____) |  | |   
//  |_|  \_\\____/|____/|______\____/_/ \_\ |_|  |_|\____/|_|  \_\_|  \_\\____/|_|  \_\______|_____|_____/   |_|   

// ID: NDev-ROBLOX-Horrorlist-BUTTONS

//   For:
//   robloxhorrorlist.com

function backBtn() {
    window.location.href = "https://robloxhorrorlist.com";
}

function backBtnFilter() {
    window.location.href = "https://robloxhorrorlist.com/pages/filtered-search.html";
}

function githubButton() {
    window.open("https://github.com/NouhiDev/roblox-horrorlist", "_blank");
}

function youtubeButton() {
    window.open("https://www.youtube.com/@robloxhorrorlist", "_blank");
}

function discordButton() {
    window.open("https://discord.gg/Zbxst3g4ts", "_blank");
}

function twitterButton() {
    window.open("https://twitter.com/RBLXHorrorlist", "_blank");
}

function main_list() {
    window.location.href = "https://robloxhorrorlist.com";
}

function about() {
    window.open("about.html", "_blank");
}

function statistics() {
    window.open("statistics.html", "_blank");
}

function rating_scale() {
    window.open("rating-overview.html", "_blank");
}

function contributors() {
    window.open("contributors.html", "_blank");
}

function donate() {
    window.open("https://www.buymeacoffee.com/robloxhorrorlist", "_blank");
}

async function random() {
    const databaseDataResponse = await fetch(DATA_URL);
    databaseData = await databaseDataResponse.json();
    localStorage.setItem("UID", Math.floor(Math.random() * databaseData.length));
    let foundIndex = -1;
    for (let i = 0; i < databaseData.length; i++) {
        if (databaseData[i].uid === UID) {
          foundIndex = i;
          break;
    }
    }   
    localStorage.setItem("number", foundIndex+1);
    window.open("pages/game.html", "_blank");
}