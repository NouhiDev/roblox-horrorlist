const DATA_URL = "https://robloxhorrorlist.com/weights-database.json";

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

    // Initialize the averageRatings object with all categories set to 0
    categories.forEach(category => {
        averageRatings[category] = 0;
    });

    data.games.forEach(game => {
        categories.forEach(category => {
            averageRatings[category] += parseFloat(game.ratings[category]);
        });
    });


    // Calculate the average for each category
    let i = 0;
    categories.forEach(category => {
        averageRatings[category] /= numGames;
        bars[i].bar.style.width = `${averageRatings[category] * 10}%`;
        bars[i].bar.getElementsByClassName("tooltip")[0].innerHTML = `${averageRatings[category].toFixed(1)}/10`;
        i++;
    });


    // function updateProgressBar(barElement, dataValue) {
    //     const percentage = dataValue * (100 / MAX_SCORE);
    //     barElement.style.width = `${percentage}%`;
    //     barElement.getElementsByClassName("tooltip")[0].innerHTML = `${dataValue}/${MAX_SCORE}`;
    // }

    // for (let i = 0; i < bars.length; i++) {
    //     const dataField = bars[i].tooltip;
    //     updateProgressBar(bars[i].bar, databaseData.games[number - 1].ratings[dataField]);
    // }

    for (let i = 0; i < document.getElementsByClassName("rating-per").length; i++) {
        const element = document.getElementsByClassName("rating-per")[i];
        element.style.animation = "progress 0.4s ease-in-out forwards";
    }

    return averageRatings;
}

async function init() {
    var databaseData = [];

    try {
        const databaseDataResponse = await fetch(DATA_URL);
        databaseData = await databaseDataResponse.json();
    } catch (error) {

        console.error("Error fetching data:", error);
        return;
    }

    calculateAverageRatings(databaseData);
}