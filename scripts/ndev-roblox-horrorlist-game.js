// ░█▀▀█ ░█▀▀▀█ ░█▀▀█ ░█─── ░█▀▀▀█ ▀▄░▄▀ 
// ░█▄▄▀ ░█──░█ ░█▀▀▄ ░█─── ░█──░█ ─░█── 
// ░█─░█ ░█▄▄▄█ ░█▄▄█ ░█▄▄█ ░█▄▄▄█ ▄▀░▀▄ 

// ░█─░█ ░█▀▀▀█ ░█▀▀█ ░█▀▀█ ░█▀▀▀█ ░█▀▀█ ░█─── ▀█▀ ░█▀▀▀█ ▀▀█▀▀ 
// ░█▀▀█ ░█──░█ ░█▄▄▀ ░█▄▄▀ ░█──░█ ░█▄▄▀ ░█─── ░█─ ─▀▀▀▄▄ ─░█── 
// ░█─░█ ░█▄▄▄█ ░█─░█ ░█─░█ ░█▄▄▄█ ░█─░█ ░█▄▄█ ▄█▄ ░█▄▄▄█ ─░█── 

// ░█▀▀█ ─█▀▀█ ░█▀▄▀█ ░█▀▀▀ 
// ░█─▄▄ ░█▄▄█ ░█░█░█ ░█▀▀▀ 
// ░█▄▄█ ░█─░█ ░█──░█ ░█▄▄▄ 

// ───░█ ░█▀▀▀█ 
// ─▄─░█ ─▀▀▀▄▄ 
// ░█▄▄█ ░█▄▄▄█

// Created by nouhidev

if (typeof jQuery === "undefined") {
    var script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js";

    script.onload = function () {
        $(document).ready(function () {
            init()
        });
    };

    document.head.appendChild(script);
} else {
    $(document).ready(function () {
        init();
    });
}

const DATA_URL = "https://nouhi.dev/roblox-horrorlist/database.json";
const MAX_SCORE = 10;

async function init() {
    const number = localStorage.getItem("number");
    const UID = localStorage.getItem("UID");

    const bars = [
        { bar: document.getElementsByClassName("scariness")[0], tooltip: "scariness" },
        { bar: document.getElementsByClassName("sound-design")[0], tooltip: "soundDesign" },
        { bar: document.getElementsByClassName("story")[0], tooltip: "story" },
        { bar: document.getElementsByClassName("visuals")[0], tooltip: "visuals" },
        { bar: document.getElementsByClassName("ambience")[0], tooltip: "ambience" },
        { bar: document.getElementsByClassName("gameplay")[0], tooltip: "gameplay" },
        { bar: document.getElementsByClassName("creativity")[0], tooltip: "creativity" },
        { bar: document.getElementsByClassName("enjoyment")[0], tooltip: "enjoyment" },
        { bar: document.getElementsByClassName("production-quality")[0], tooltip: "productionQuality" },
        { bar: document.getElementsByClassName("technical")[0], tooltip: "technical" },
        { bar: document.getElementsByClassName("overall")[0], tooltip: "rating" },
    ];

    var databaseData = [];

    try {
        const databaseDataResponse = await fetch(DATA_URL);
        databaseData = await databaseDataResponse.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return;
    }

    const gameData = await fetch(
        "https://ndevapi.com/game-info/" + UID
    );
    gameDataByUID = await gameData.json();
    gameDataByUID = gameDataByUID["data"][0];

    function updateProgressBar(barElement, dataValue, tooltipText) {
        const percentage = dataValue * (100 / MAX_SCORE);
        barElement.style.width = `${percentage}%`;
        barElement.getElementsByClassName("tooltip")[0].innerHTML = `${dataValue}/${MAX_SCORE}`;
    }

    for (let i = 0; i < bars.length; i++) {
        const dataField = bars[i].tooltip;
        updateProgressBar(bars[i].bar, databaseData.games[number - 1].ratings[dataField], dataField);
    }

    for (let i = 0; i < document.getElementsByClassName("rating-per").length; i++) {
        const element = document.getElementsByClassName("rating-per")[i];
        element.style.animation = "progress 0.4s ease-in-out forwards";
    }

    const gameTitle = document.getElementById("game-title");
    const gameCreator = document.getElementById("game-creator");
    const gameIcon = document.getElementById("game-icon");
    const gameGenres = document.getElementById("game-genres");
    const gameYT = document.getElementById("game-yt");
    const release = document.getElementById("release");
    const update = document.getElementById("update");
    const favs = document.getElementById("favs");
    const active = document.getElementById("active");
    const visits = document.getElementById("visits");
    const maxplayers = document.getElementById("maxplayers");
    const pros = document.getElementById("pros");
    const cons = document.getElementById("cons");
    const conclusion = document.getElementById("conclusion");
    const originalBtn = document.getElementsByClassName("originalBtn")[0];
    const playBtn = document.getElementsByClassName("playbtn")[0];

    var gameRank = number;
    if (number == 1) gameRank = "🥇";
    if (number == 2) gameRank = "🥈";
    if (number == 3) gameRank = "🥉";
    gameTitle.innerText = `(#${gameRank}) ${gameDataByUID.name}`;

    gameCreator.innerText = "by " + gameDataByUID["creator"].name;

    var genreArray = String(databaseData.games[number - 1].genres).split(", ");
    var genreHTMLText = genreArray.join(", ");
    var genrePrefix = `Genre${genreArray.length > 1 ? "s" : ""}: `;
    gameGenres.innerHTML = `${genrePrefix} ${genreHTMLText}`;

    if (databaseData.games[number - 1].youtube_url != undefined) {
        var gameYTURL = databaseData.games[number - 1].youtube_url.slice(32, databaseData.games[number - 1].youtube_url.length);
        gameYT.src = `https://www.youtube.com/embed/${gameYTURL}`;;
    }
    else {
        document.getElementsByTagName("iframe")[0].remove();
    }

    const formatter = Intl.NumberFormat('en', { notation: 'compact' });
    
    release.innerText = "Released: " + gameDataByUID.created.slice(0, 10);
    update.innerText = "Last Update: " + gameDataByUID.updated.slice(0, 10);

    favs.innerText += " " + formatter.format(gameDataByUID.favoritedCount);
    active.innerText += " " + formatter.format(gameDataByUID.playing);
    visits.innerText += " " + formatter.format(gameDataByUID.visits);
    maxplayers.innerText += " " + gameDataByUID.maxPlayers;

    playBtn.href = `https://www.roblox.com/games/${gameDataByUID.rootPlaceId}`;

    pros.innerText += "\n";
    cons.innerText += "\n";
    conclusion.innerText += "\n";

    if (databaseData.games[number - 1].rater_note.pros == undefined || databaseData.games[number - 1].rater_note.pros == "") pros.innerText = "No pros provided.";
    else pros.innerText = databaseData.games[number - 1].rater_note.pros;

    if (databaseData.games[number - 1].rater_note.cons == undefined || databaseData.games[number - 1].rater_note.cons == "") cons.innerText = "No cons provided.";
    else cons.innerText = databaseData.games[number - 1].rater_note.cons;

    if (databaseData.games[number - 1].rater_note.conclusion == undefined || databaseData.games[number - 1].rater_note.conclusion == "") conclusion.innerText = "No conclusion provided.";
    else conclusion.innerText = databaseData.games[number - 1].rater_note.conclusion;

    if (databaseData.games[number - 1].port_url != undefined || databaseData.games[number - 1].portUrl == "") 
    {
        originalBtn.style.opacity = 1;
        originalBtn.innerText ="Play Original";
        originalBtn.href = databaseData.games[number - 1].port_url;
    }
}