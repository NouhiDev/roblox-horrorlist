function getInformationFromIndex() {
    const number = localStorage.getItem("number");
    const UID = localStorage.getItem("UID");
    console.log(UID);
    console.log(number);

    updateInformation(number, UID);
}

async function updateInformation(number, UID) {
    var gameDataByUID = [];
    const gameData = await fetch(
        "https://ndevapi.com/game-info/" + UID
    );
    gameDataByUID = await gameData.json();

    console.log(gameDataByUID);

    const gameTitle = document.getElementById("game-title");

    if (gameDataByUID[number] === undefined) gameTitle.innerText = "Roblox Horrorlist: Error";
    else {
        gameTitle.innerText = "Roblox Horrorlist: " + spreadSheetData[number].Name;
    }
}

getInformationFromIndex();