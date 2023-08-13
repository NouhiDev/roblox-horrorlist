//   _____   ____  ____  _      ______   __  _    _  ____  _____  _____   ____  _____  _      _____  _____ _______ 
//  |  __ \ / __ \|  _ \| |    / __ \ \ / / | |  | |/ __ \|  __ \|  __ \ / __ \|  __ \| |    |_   _|/ ____|__   __|
//  | |__) | |  | | |_) | |   | |  | \ V /  | |__| | |  | | |__) | |__) | |  | | |__) | |      | | | (___    | |   
//  |  _  /| |  | |  _ <| |   | |  | |> <   |  __  | |  | |  _  /|  _  /| |  | |  _  /| |      | |  \___ \   | |   
//  | | \ \| |__| | |_) | |___| |__| / . \  | |  | | |__| | | \ \| | \ \| |__| | | \ \| |____ _| |_ ____) |  | |   
//  |_|  \_\\____/|____/|______\____/_/ \_\ |_|  |_|\____/|_|  \_\_|  \_\\____/|_|  \_\______|_____|_____/   |_|   

// ID: NDev-ROBLOX-Horrorlist-COMMUNITY-RATINGS-GAME

//   For:
//   robloxhorrorlist.com

const DATA_URL = "https://ndevapi.com/ratings";
const MAX_SCORE = 10;
const CONFIDENCE_INTERVAL = 10;

async function init() {
    const number = localStorage.getItem("number");
    const UID = localStorage.getItem("UID");

    const bar = document.getElementsByClassName("overall")[0];

    let databaseData = {};

    try {
        const databaseDataResponse = await fetch(DATA_URL);
        databaseData = await databaseDataResponse.json();
    } catch (e) {
        console.error("Error fetching data:", error);
    }

    const gameData = await fetch(
        "https://ndevapi.com/game-info/" + UID
    );
    gameDataByUID = await gameData.json();

    gameDataByUID = gameDataByUID["data"][0];

    let rating = "0.0";
    let gameRating = 0;
    let amountOfRatings = 0;

    try {
        rating = databaseData[databaseData.findIndex(item => item.game_id === UID)].avg_rating;
        amountOfRatings = databaseData[databaseData.findIndex(item => item.game_id === UID)].total_ratings;
        gameRating = (rating * amountOfRatings) / (amountOfRatings + CONFIDENCE_INTERVAL) * 2;
    } catch (e) {
        console.error("Error getting rating, amount of ratings, or calculating the weighted rating:", e);
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
    const playBtn = document.getElementById("playBtn");

    var gameRank = number;
    if (number == 1) gameRank = "🥇";
    if (number == 2) gameRank = "🥈";
    if (number == 3) gameRank = "🥉";
    gameTitle.innerText = `(#${gameRank}) ${gameDataByUID.name}`;

    gameCreator.innerText = "by " + gameDataByUID["creator"].name;

    playBtn.addEventListener("click", function (event) {
        event.preventDefault();

        var linkUrl = `https://www.roblox.com/games/${gameDataByUID.rootPlaceId}`;

        window.open(linkUrl, "_blank");
    });
    playBtn.href = `https://www.roblox.com/games/${gameDataByUID.rootPlaceId}`;
}

document.addEventListener('DOMContentLoaded', function () {
    init();
    
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