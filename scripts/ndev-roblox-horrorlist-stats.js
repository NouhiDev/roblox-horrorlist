//   _____   ____  ____  _      ______   __  _    _  ____  _____  _____   ____  _____  _      _____  _____ _______ 
//  |  __ \ / __ \|  _ \| |    / __ \ \ / / | |  | |/ __ \|  __ \|  __ \ / __ \|  __ \| |    |_   _|/ ____|__   __|
//  | |__) | |  | | |_) | |   | |  | \ V /  | |__| | |  | | |__) | |__) | |  | | |__) | |      | | | (___    | |   
//  |  _  /| |  | |  _ <| |   | |  | |> <   |  __  | |  | |  _  /|  _  /| |  | |  _  /| |      | |  \___ \   | |   
//  | | \ \| |__| | |_) | |___| |__| / . \  | |  | | |__| | | \ \| | \ \| |__| | | \ \| |____ _| |_ ____) |  | |   
//  |_|  \_\\____/|____/|______\____/_/ \_\ |_|  |_|\____/|_|  \_\_|  \_\\____/|_|  \_\______|_____|_____/   |_|   

// ID: NDev-ROBLOX-Horrorlist-STATS

//   For:
//   robloxhorrorlist.com

const DATA_URL = "https://robloxhorrorlist.com/weights-database.json";

function calculateAverageRatings(data) {
    const bars = [
        { bar: document.getElementsByClassName("overall")[0], tooltip: "rating" },
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
    ];

    const categories = Object.keys(data.games[0].ratings);
    const numGames = data.games.length;
    const averageRatings = {};

    categories.forEach(category => {
        averageRatings[category] = 0;
    });

    data.games.forEach(game => {
        categories.forEach(category => {
            averageRatings[category] += parseFloat(game.ratings[category]);
        });
    });

    let i = 0;
    categories.forEach(category => {
        averageRatings[category] /= numGames;
        bars[i].bar.style.width = `${averageRatings[category] * 10}%`;
        bars[i].bar.getElementsByClassName("tooltip")[0].innerHTML = `${averageRatings[category].toFixed(1)}/10`;
        i++;
    });

    for (const element of document.getElementsByClassName("rating-per")) {
        element.style.animation = "progress 0.4s ease-in-out forwards";
    }

    return averageRatings;
}

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

function init() {
    fetchData(DATA_URL)
        .then(data => {
            if (data) {
                calculateAverageRatings(data);
            } else {
                alert("Failed to load data.");
            }
        });
}

document.addEventListener("DOMContentLoaded", init);

function backBtn() {
    window.location.href = "https://robloxhorrorlist.com";
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