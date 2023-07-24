function getInformationFromIndex() {
    const number = localStorage.getItem("number");
    const UID = localStorage.getItem("UID");

    updateInformation(number, UID);
}

async function updateInformation(number, UID) {
    var gameDataByUID = [];
    const gameData = await fetch(
        "https://ndevapi.com/game-info/" + UID
    );
    gameDataByUID = await gameData.json()["data"][0];

    const gameTitle = document.getElementById("game-title");

    if (gameDataByUID === undefined) gameTitle.innerText = "Roblox Horrorlist: Error";
    else {
        gameTitle.innerText = "Roblox Horrorlist: " + gameDataByUID.name;
    }
}

getInformationFromIndex();