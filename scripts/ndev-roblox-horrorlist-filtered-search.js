//   _____   ____  ____  _      ______   __  _    _  ____  _____  _____   ____  _____  _      _____  _____ _______ 
//  |  __ \ / __ \|  _ \| |    / __ \ \ / / | |  | |/ __ \|  __ \|  __ \ / __ \|  __ \| |    |_   _|/ ____|__   __|
//  | |__) | |  | | |_) | |   | |  | \ V /  | |__| | |  | | |__) | |__) | |  | | |__) | |      | | | (___    | |   
//  |  _  /| |  | |  _ <| |   | |  | |> <   |  __  | |  | |  _  /|  _  /| |  | |  _  /| |      | |  \___ \   | |   
//  | | \ \| |__| | |_) | |___| |__| / . \  | |  | | |__| | | \ \| | \ \| |__| | | \ \| |____ _| |_ ____) |  | |   
//  |_|  \_\\____/|____/|______\____/_/ \_\ |_|  |_|\____/|_|  \_\_|  \_\\____/|_|  \_\______|_____|_____/   |_|   

// ID: NDev-ROBLOX-Horrorlist-FILTERED-SEARCH

//   For:
//   robloxhorrorlist.com

const maxUIDChunkSize = 100;
const API_BASE_URL = "https://ndevapi.com";

const data = {
    databaseData: [],
    gameData: [],
    gameIconData: [],
};

const CACHE_PREFIX = "filteredGameDataCache_";
const CACHE_EXPIRATION = 2592000000;
const DB_NAME = "filteredGameDataDB";
const DB_VERSION = 1;
let db;
let dataTable = null;

async function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onerror = event => reject(event.target.error);
        request.onsuccess = event => resolve(event.target.result);
        request.onupgradeneeded = event => {
            const db = event.target.result;
            db.createObjectStore("gameDataCache", { keyPath: "cacheKey" });
        };
    });
}

async function saveToCache(cacheKey, data) {
    const transaction = db.transaction(["gameDataCache"], "readwrite");
    const store = transaction.objectStore("gameDataCache");
    const cacheData = { cacheKey, data, timestamp: Date.now() };
    store.put(cacheData);
    await transaction.complete;
}

async function fetchFromCache(cacheKey) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["gameDataCache"], "readonly");
        const store = transaction.objectStore("gameDataCache");
        const request = store.get(cacheKey);
        request.onsuccess = event => resolve(event.target.result);
        request.onerror = event => reject(event.target.error);
    });
}

// Function to create a cache key with the category information
function getCategoryCacheKey(categoryKey, category) {
    return `${CACHE_PREFIX}${categoryKey}_${category}`;
}

async function fetchDataAndCache(endpoint, categoryKey, category) {
    const cacheKey = getCategoryCacheKey(categoryKey, category);
    const cachedData = await fetchFromCache(cacheKey);
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_EXPIRATION) {
        return cachedData.data;
    }

    const response = await fetch(endpoint);
    const freshData = await response.json();
    await saveToCache(cacheKey, freshData);
    return freshData;
}


window.onload = async function () {
    usageDisplay();
    $('header').hide();
    document.getElementsByClassName("loading-bar")[0].style.display = "none";
};

async function fetchAndDisplayGames(categoryKey, genreKey, playerCountKey) {
    try {
        console.log(`Sorting by category: ${categoryKey}!`);
        console.log(`Sorting by genre: ${genreKey}!`);
        console.log(`Sorting by player count: ${playerCountKey}!`);

        if (dataTable != null) {
            dataTable.destroy();
            $('header').hide();
            document.getElementsByTagName("footer")[0].style.bottom = 0;
        }

        document.getElementsByClassName("loading-bar")[0].style.display = "block";

        const table = document.getElementById("table-to-populate");
        const mobileTable = document.getElementById("mobile-table-to-populate");
        const elem = document.getElementById("myBar");

        db = await openDB();

        const databaseDataResponse = await fetch("https://ndevapi.com/main_list_ratings");
        let databaseData = await databaseDataResponse.json();
        databaseData.sort((a, b) => parseFloat(b.ratings.rating) - parseFloat(a.ratings.rating));

        let gameUIDS = databaseData
            .filter(element => element.ambience !== "")
            .map(element => element.uid);

        let totalRatings = 0;

        function sortByGenre(category, databaseData) {
            for (let i = databaseData.length - 1; i >= 0; i--) {
                if (!databaseData[i].genres.includes(category)) {
                    databaseData.splice(i, 1);
                }
            }
        }

        switch (genreKey) {
            case "none":
                break;
            case "chapters":
                sortByGenre("Chapters", databaseData);
                break;
            case "story":
                sortByGenre("Story", databaseData);
                break;
            case "minigame":
                sortByGenre("Minigame", databaseData);
                break;
            case "survivalHorror":
                sortByGenre("Survival Horror", databaseData);
                break;
            case "misc":
                sortByGenre("Misc", databaseData);
                break;
            case "myth":
                sortByGenre("Myth", databaseData);
                break;
            case "abstract":
                sortByGenre("Abstract", databaseData);
                break;
            case "port":
                sortByGenre("Port", databaseData);
                break;
            case "mascotHorror":
                sortByGenre("Mascot Horror", databaseData);
                break;
            case "bodyHorror":
                sortByGenre("Body Horror", databaseData);
                break;
            case "exploration":
                sortByGenre("Exploration", databaseData);
                break;
            case "classicHorror":
                sortByGenre("Classic Horror", databaseData);
                break;
            case "pinoy":
                sortByGenre("Pinoy", databaseData);
                break;
            case "remake":
                sortByGenre("Remake", databaseData);
                break;
            case "backrooms":
                sortByGenre("Backrooms", databaseData);
                break;
            case "parody":
                sortByGenre("Parody", databaseData);
                break;
            case "unfinishedAbandoned":
                sortByGenre("Unfinished/Abandoned", databaseData);
                break;
            case "removedPrivated":
                sortByGenre("Removed/Privated", databaseData);
                break;
        }

        // Get the UIDS with the genre key applied
        gameUIDS = databaseData
            .filter(element => element.ambience !== "")
            .map(element => element.uid);

        function sortByCategory(categoryKey, category, gameUIDS, databaseData) {
            databaseData.sort(function (a, b) {
                return parseFloat(b.ratings[category]) - parseFloat(a.ratings[category]);
            });

            for (const game of databaseData) {
                totalRatings += parseFloat(game.ratings[categoryKey]);
            }

            // Overwrite ratings of database
            for (let i = 0; i < gameUIDS.length; i++) {
                const categoryRating = databaseData[i].ratings[categoryKey];
                databaseData[i].ratings.rating = categoryRating;
            }
        }

        switch (categoryKey) {
            case "overall":
                break;
            case "scariness":
                sortByCategory(categoryKey, "scariness", gameUIDS, databaseData);
                break;
            case "soundDesign":
                sortByCategory(categoryKey, "soundDesign", gameUIDS, databaseData);
                break;
            case "story":
                sortByCategory(categoryKey, "story", gameUIDS, databaseData);
                break;
            case "visuals":
                sortByCategory(categoryKey, "visuals", gameUIDS, databaseData);
                break;
            case "ambience":
                sortByCategory(categoryKey, "ambience", gameUIDS, databaseData);
                break;
            case "gameplay":
                sortByCategory(categoryKey, "gameplay", gameUIDS, databaseData);
                break;
            case "creativity":
                sortByCategory(categoryKey, "creativity", gameUIDS, databaseData);
                break;
            case "enjoyment":
                sortByCategory(categoryKey, "enjoyment", gameUIDS, databaseData);
                break;
            case "productionQuality":
                sortByCategory(categoryKey, "productionQuality", gameUIDS, databaseData);
                break;
            case "technical":
                sortByCategory(categoryKey, "technical", gameUIDS, databaseData);
                break;
        }

        // Get the UIDS again in correct order
        gameUIDS = databaseData
            .filter(element => element.ambience !== "")
            .map(element => element.uid);

        const chunks = [];
        for (let i = 0; i < gameUIDS.length; i += maxUIDChunkSize) {
            chunks.push(gameUIDS.slice(i, i + maxUIDChunkSize));
        }

        const fetchGameDataPromises = chunks.map(chunk =>
            fetchDataAndCache(`${API_BASE_URL}/game-info/${chunk.join(",")}`, categoryKey, `gameData_${chunk.join(",")}`)
        );

        const fetchIconDataPromises = chunks.map(chunk =>
            fetchDataAndCache(`${API_BASE_URL}/game-icon/${chunk.join(",")}`, categoryKey, `gameIconData_${chunk.join(",")}`)
        );

        const [gameDataResponses, iconDataResponses] = await Promise.all([
            Promise.all(fetchGameDataPromises),
            Promise.all(fetchIconDataPromises),
        ]);

        const gameDataFromAPI = gameDataResponses.flat()
            .map(item => item.data)
            .flat();

        const gameIconDataFromAPI = iconDataResponses.flat()
            .map(item => item.data)
            .flat();


        const numGames = databaseData.length;

        const averageRating = totalRatings / numGames;

        console.log(averageRating);

        const fragment = document.createDocumentFragment();

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            document.getElementsByClassName("mobile-table-container")[0].style.display = "block";
            document.getElementsByClassName("table-container")[0].style.display = "none";
            for (let i = 0; i < gameUIDS.length; i++) {
                mobileTable.innerHTML = "";
                try {
                    let differenceToAverageRating = (parseFloat(databaseData[i].ratings.rating) - averageRating).toFixed(1);
                    let spanHTML = "";
                    if (differenceToAverageRating < 0) spanHTML = `<span style="color: red; font-size: 10px;">${differenceToAverageRating}↓</span> `;
                    else spanHTML = `<span style="color: green; font-size: 10px;">${differenceToAverageRating}↑</span> `;
                    if (differenceToAverageRating == 0) spanHTML = `<span style="color: gray; font-size: 10px;">${Math.abs((parseFloat(databaseData[i].ratings.rating) - averageRating)).toFixed(1)}-</span> `;

                    var row = ` <tr class="hover-reveal">
                      <td data-th="Placement">${i + 1}.</td>
                      <td data="Icon"><img class="game-icon" src="${gameIconDataFromAPI[i].imageUrl}"></td>
                      <td data-th="Title" class="game-title"><a href="#" class="game-href" onclick="loadGame(
                        ${i + 1}, 
                        ${gameUIDS[i]})">${gameDataFromAPI[i].name}</a></td>
                      <td data-th="Rating" class="align-left">${databaseData[i].ratings.rating}/10  ${spanHTML}</td>
                      </tr>`;

                    const rowElement = document.createElement('tr');
                    rowElement.innerHTML = row;
                    fragment.appendChild(rowElement);
                } catch (e) {
                    console.error(e);
                }
            }
            mobileTable.appendChild(fragment);


            elem.style.width = "100%";

            await delay(500);

            $('header').show();
            document.getElementsByClassName("loading-bar")[0].style.display = "none";

            // Generate Table after populating it
            dataTable = $("#game-table").DataTable({
                columnDefs: [{ orderable: false, targets: [1, 3] }],
                responsive: true
            });
        }
        else {

            for (let i = 0; i < gameUIDS.length; i++) {
                table.innerHTML = "";
                try {
                    let differenceToAverageRating = (parseFloat(databaseData[i].ratings.rating) - averageRating).toFixed(1);
                    let spanHTML = "";
                    if (differenceToAverageRating < 0) spanHTML = `<span style="color: red; font-size: 10px;">${differenceToAverageRating}↓</span> `;
                    else spanHTML = `<span style="color: green; font-size: 10px;">${differenceToAverageRating}↑</span> `;
                    if (differenceToAverageRating == 0) spanHTML = `<span style="color: gray; font-size: 10px;">${Math.abs((parseFloat(databaseData[i].ratings.rating) - averageRating)).toFixed(1)}-</span> `;

                    var row = ` <tr class="hover-reveal">
                    <td data-th="Placement">${i + 1}.</td>
                    <td data="Icon"><img class="game-icon" src="${gameIconDataFromAPI[i].imageUrl}"></td>
                    <td data-th="Title" class="game-title"><a href="#" class="game-href" onclick="loadGame(
                        ${i + 1}, 
                        ${gameUIDS[i]})">${gameDataFromAPI[i].name}</a></td>
                    <td data-th="Creator" class="align-left">${JSON.parse(
                        JSON.stringify(gameDataFromAPI[i].creator)
                    ).name}</td>
                    <td data-th="Rating" class="align-left">${databaseData[i].ratings.rating}/10  ${spanHTML}</td>
                    </tr>`;

                    const rowElement = document.createElement('tr');
                    rowElement.innerHTML = row;
                    fragment.appendChild(rowElement);
                } catch (e) {
                    console.error(e);
                }
            }
            table.appendChild(fragment);

            elem.style.width = "100%";

            await delay(500);

            $('header').show();
            document.getElementsByClassName("loading-bar")[0].style.display = "none";

            // Generate Table after populating it
            dataTable = $("#game-table").DataTable({
                columnDefs: [{ orderable: false, targets: [1, 4] }],
                responsive: true
            });
        }

        document.getElementsByTagName("footer")[0].style.bottom = "auto";

    } catch (error) {
        console.error("An error occurred:", error);
    }

}

async function usageDisplay() {
    console.log(`                                                                                         
    #     # ######  ####### #     #                                             
    ##    # #     # #       #     #                                             
    # #   # #     # #       #     #                                             
    #  #  # #     # #####   #     #                                             
    #   # # #     # #        #   #                                              
    #    ## #     # #         # #                                               
    #     # ######  #######    #          

    ######  ####### ######  #       ####### #     #                             
    #     # #     # #     # #       #     #  #   #                              
    #     # #     # #     # #       #     #   # #                               
    ######  #     # ######  #       #     #    #                                
    #   #   #     # #     # #       #     #   # #                               
    #    #  #     # #     # #       #     #  #   #                              
    #     # ####### ######  ####### ####### #     #      

    #     # ####### ######  ######  ####### ######  #       ###  #####  ####### 
    #     # #     # #     # #     # #     # #     # #        #  #     #    #    
    #     # #     # #     # #     # #     # #     # #        #  #          #    
    ####### #     # ######  ######  #     # ######  #        #   #####     #    
    #     # #     # #   #   #   #   #     # #   #   #        #        #    #    
    #     # #     # #    #  #    #  #     # #    #  #        #  #     #    #    
    #     # ####### #     # #     # ####### #     # ####### ###  #####     #    

          #  #####                                                              
          # #     #                                                             
          # #                                                                   
          #  #####                                                              
    #     #       #                                                             
    #     # #     #                                                             
     #####   #####                                                              
                        
    Learn more at
    
    https://nouhi.dev/ndev-assets-docs/.
      `);
}

function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
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

function loadGame(number, UID) {
    localStorage.setItem('number', number);
    localStorage.setItem('UID', UID);
    window.open('game.html', '_blank');
}

document.addEventListener("DOMContentLoaded", () => {
    const ratingDropdown = document.getElementById("ratingDropdown");
    const genreDropdown = document.getElementById("genreDropdown");
    const playerCountDropdown = document.getElementById("playerDropdown");
    const submitButton = document.getElementById("submitButton");

    submitButton.addEventListener("click", () => {
        const selectedCategory = ratingDropdown.value;
        const selectedGenre = genreDropdown.value;
        const selectedPlayerCount = playerCountDropdown.value;
        fetchAndDisplayGames(selectedCategory, selectedGenre, selectedPlayerCount);
    });
});