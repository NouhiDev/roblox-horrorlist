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

const DATA_URL = "https://ndevapi.com/ratings";
const MAX_SCORE = 10;
const CONFIDENCE_INTERVAL = 10;

async function init() {
    const number = localStorage.getItem("number");
    const UID = localStorage.getItem("UID");

    const bar = document.getElementsByClassName("overall")[0];

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
    let gameRating = "0.0";
    let amountOfRatings = 0;
    try {
        gameRating = databaseData[databaseData.findIndex(item => item.game_id === UID)].avg_rating;
        amountOfRatings = databaseData[databaseData.findIndex(item => item.game_id === UID)].total_ratings;
        gameRating = (rating * amountOfRates) / (amountOfRates + CONFIDENCE_INTERVAL) * 2;
    } catch (e) {
        
    }

    document.getElementById("ratings-amt").textContent =`Calculated from ${amountOfRatings} user rating(s).`;

    const percentage = gameRating * (100 / MAX_SCORE);
    bar.style.width = `${percentage}%`;
    bar.getElementsByClassName("tooltip")[0].innerHTML = `${(parseFloat(gameRating)).toFixed(1)}/${MAX_SCORE}`;

    for (let i = 0; i < document.getElementsByClassName("rating-per").length; i++) {
        const element = document.getElementsByClassName("rating-per")[i];
        element.style.animation = "progress 0.4s ease-in-out forwards";
    }

    const gameTitle = document.getElementById("game-title");
    const gameCreator = document.getElementById("game-creator");
    const gameIcon = document.getElementById("game-icon");
    // const gameGenres = document.getElementById("game-genres");
    // const gameYT = document.getElementById("game-yt");
    // const release = document.getElementById("release");
    // const update = document.getElementById("update");
    // const favs = document.getElementById("favs");
    // const active = document.getElementById("active");
    // const visits = document.getElementById("visits");
    // const maxplayers = document.getElementById("maxplayers");
    // const pros = document.getElementById("pros");
    // const cons = document.getElementById("cons");
    // const conclusion = document.getElementById("conclusion");
    // const originalBtn = document.getElementsByClassName("originalBtn")[0];
    const playBtn = document.getElementById("playBtn");

    var gameRank = number;
    if (number == 1) gameRank = "🥇";
    if (number == 2) gameRank = "🥈";
    if (number == 3) gameRank = "🥉";
    gameTitle.innerText = `(#${gameRank}) ${gameDataByUID.name}`;

    gameCreator.innerText = "by " + gameDataByUID["creator"].name;

    // var genreArray = String(databaseData.games[number - 1].genres).split(",");
    // var genreHTMLText = genreArray.join(", ");
    // var genrePrefix = `Genre${genreArray.length > 1 ? "s" : ""}: `;
    // gameGenres.innerHTML = `${genrePrefix} ${genreHTMLText}`;

    // if (databaseData.games[number - 1].youtube_url != undefined) {
    //     var gameYTURL = databaseData.games[number - 1].youtube_url.slice(32, databaseData.games[number - 1].youtube_url.length);
    //     gameYT.src = `https://www.youtube.com/embed/${gameYTURL}`;;
    // }
    // else {
    //     document.getElementsByTagName("iframe")[0].remove();
    // }

    // const formatter = Intl.NumberFormat('en', { notation: 'compact' });

    // release.innerText = "Released: " + gameDataByUID.created.slice(0, 10);
    // update.innerText = "Last Update: " + gameDataByUID.updated.slice(0, 10);

    // favs.innerText += " " + formatter.format(gameDataByUID.favoritedCount);
    // active.innerText += " " + formatter.format(gameDataByUID.playing);
    // visits.innerText += " " + formatter.format(gameDataByUID.visits);
    // maxplayers.innerText += " " + gameDataByUID.maxPlayers;

    playBtn.addEventListener("click", function (event) {
        event.preventDefault();

        var linkUrl = `https://www.roblox.com/games/${gameDataByUID.rootPlaceId}`;

        window.open(linkUrl, "_blank");
    });
    playBtn.href = `https://www.roblox.com/games/${gameDataByUID.rootPlaceId}`;

    // pros.innerText += "\n";
    // cons.innerText += "\n";
    // conclusion.innerText += "\n";

    // if (databaseData.games[number - 1].rater_note.pros == undefined || databaseData.games[number - 1].rater_note.pros == "") pros.innerText = "Will be added soon.";
    // else pros.innerText = databaseData.games[number - 1].rater_note.pros;

    // if (databaseData.games[number - 1].rater_note.cons == undefined || databaseData.games[number - 1].rater_note.cons == "") cons.innerText = "Will be added soon.";
    // else cons.innerText = databaseData.games[number - 1].rater_note.cons;

    // if (databaseData.games[number - 1].rater_note.conclusion == undefined || databaseData.games[number - 1].rater_note.conclusion == "") conclusion.innerText = "Will be added soon.";
    // else conclusion.innerText = databaseData.games[number - 1].rater_note.conclusion;

    // if (databaseData.games[number - 1]["port_url"] !== "") {
    //     originalBtn.style.opacity = 1;
    //     originalBtn.innerText = "Play Original";
    //     originalBtn.addEventListener("click", function () {
    //         window.location.href = databaseData.games[number - 1].port_url;
    //     });
    // } else originalBtn.style.opacity = 0;

    // // Multiple chapters / parts / etc. functionality
    // if (databaseData.games[number - 1].hasOwnProperty("chapters")) {
    //     const dropdownContainer = document.getElementsByClassName("ratings-container")[0];
    //     const dropdown = document.createElement("select");
    //     dropdown.id = "dropdown";
    //     dropdown.classList.add("select-dropdown");

    //     var optionTexts = ["Overall"];

    //     for (let i = 0; i < databaseData.games[number - 1]["chapters"].length; i++) {
    //         optionTexts.push(databaseData.games[number - 1]["chapters"][i].name);
    //     }

    //     var optionValues = ["option0"];
    //     for (let i = 0; i < optionTexts.length - 1; i++) {
    //         optionValues.push(`option${i + 1}`);
    //     }

    //     for (let i = 0; i < optionValues.length; i++) {
    //         const option = document.createElement("option");
    //         option.value = optionValues[i];
    //         option.textContent = optionTexts[i];
    //         dropdown.appendChild(option);
    //     }

    //     dropdownContainer.insertBefore(dropdown, dropdownContainer.childNodes[2]);

    //     const optionHandlers = {
    //         option0: function () {
    //             for (let i = 0; i < bars.length; i++) {
    //                 const dataField = bars[i].tooltip;
    //                 updateProgressBar(bars[i].bar, databaseData.games[number - 1].ratings[dataField], dataField);
    //             }
    //         },
    //         option1: function () {
    //             for (let i = 0; i < bars.length; i++) {
    //                 const dataField = bars[i].tooltip;
    //                 updateProgressBar(bars[i].bar, databaseData.games[number - 1]["chapters"][0]["ratings"][dataField], dataField);
    //             }
    //         },
    //         option2: function () {
    //             for (let i = 0; i < bars.length; i++) {
    //                 const dataField = bars[i].tooltip;
    //                 updateProgressBar(bars[i].bar, databaseData.games[number - 1]["chapters"][1]["ratings"][dataField], dataField);
    //             }
    //         },
    //         option3: function () {
    //             for (let i = 0; i < bars.length; i++) {
    //                 const dataField = bars[i].tooltip;
    //                 updateProgressBar(bars[i].bar, databaseData.games[number - 1]["chapters"][2]["ratings"][dataField], dataField);
    //             }
    //         },
    //         option4: function () {
    //             for (let i = 0; i < bars.length; i++) {
    //                 const dataField = bars[i].tooltip;
    //                 updateProgressBar(bars[i].bar, databaseData.games[number - 1]["chapters"][3]["ratings"][dataField], dataField);
    //             }
    //         },
    //         option5: function () {
    //             for (let i = 0; i < bars.length; i++) {
    //                 const dataField = bars[i].tooltip;
    //                 updateProgressBar(bars[i].bar, databaseData.games[number - 1]["chapters"][4]["ratings"][dataField], dataField);
    //             }
    //         },
    //         option6: function () {
    //             for (let i = 0; i < bars.length; i++) {
    //                 const dataField = bars[i].tooltip;
    //                 updateProgressBar(bars[i].bar, databaseData.games[number - 1]["chapters"][5]["ratings"][dataField], dataField);
    //             }
    //         },
    //     };

    //     function handleOptionSelection(selectedOption) {
    //         const selectedHandler = optionHandlers[selectedOption];
    //         if (selectedHandler) {
    //             selectedHandler();
    //             for (let i = 0; i < document.getElementsByClassName("rating-per").length; i++) {
    //                 const element = document.getElementsByClassName("rating-per")[i];
    //                 element.style.animation = "none";
    //             }

    //             setTimeout(() => {
    //                 for (let i = 0; i < document.getElementsByClassName("rating-per").length; i++) {
    //                     const element = document.getElementsByClassName("rating-per")[i];
    //                     element.style.animation = "progress 0.4s ease-in-out forwards";
    //                 }
    //             }, 10);
    //         } else {
    //             console.error("No handler found for the selected option:", selectedOption);
    //         }
    //     }

    //     dropdown.addEventListener("change", function () {
    //         const selectedOption = dropdown.value;
    //         handleOptionSelection(selectedOption);
    //     });
    // }
}

document.addEventListener('DOMContentLoaded', function () {
    const ratingForm = document.getElementById('ratingForm');

    ratingForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const gameId = parseInt(localStorage.getItem("UID"));
        const rating = parseFloat(document.getElementById('rating').value);

        const data = {
            rating: rating
        };

        fetch(`https://ndevapi.com/rate/${gameId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                document.getElementById("submit-info").style.color = "#13FF1C";
                document.getElementById("submit-info").textContent = "Successfully submitted your rating!";
                setTimeout(() => {
                    location.reload();
                }, 1000);
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById("submit-info").textContent = "There was an error with your submission.";
            });
    });
});