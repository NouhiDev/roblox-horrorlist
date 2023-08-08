// ░█▀▀█ ░█▀▀▀█ ░█▀▀█ ░█─── ░█▀▀▀█ ▀▄░▄▀ 
// ░█▄▄▀ ░█──░█ ░█▀▀▄ ░█─── ░█──░█ ─░█── 
// ░█─░█ ░█▄▄▄█ ░█▄▄█ ░█▄▄█ ░█▄▄▄█ ▄▀░▀▄ 

// ░█─░█ ░█▀▀▀█ ░█▀▀█ ░█▀▀█ ░█▀▀▀█ ░█▀▀█ ░█─── ▀█▀ ░█▀▀▀█ ▀▀█▀▀ 
// ░█▀▀█ ░█──░█ ░█▄▄▀ ░█▄▄▀ ░█──░█ ░█▄▄▀ ░█─── ░█─ ─▀▀▀▄▄ ─░█── 
// ░█─░█ ░█▄▄▄█ ░█─░█ ░█─░█ ░█▄▄▄█ ░█─░█ ░█▄▄█ ▄█▄ ░█▄▄▄█ ─░█── 

// ───░█ ░█▀▀▀█ 
// ─▄─░█ ─▀▀▀▄▄ 
// ░█▄▄█ ░█▄▄▄█

// Created by nouhidev

const maxUIDChunkSize = 100;
const API_BASE_URL = "https://ndevapi.com";

const data = {
    databaseData: [],
    gameData: [],
    gameIconData: [],
};

const CACHE_PREFIX = "gameDataCache_";
const CACHE_EXPIRATION = 2592000000;

const dataCache = new Map();

window.onload = function () {
    usageDisplay();
    fetchData()
    $('header').hide();
};

function initializeCache() {
    // Load cached data from local storage
    for (let key in localStorage) {
        if (key.startsWith(CACHE_PREFIX)) {
            const cacheKey = key.substring(CACHE_PREFIX.length);
            const cacheData = JSON.parse(localStorage.getItem(key));
            if (cacheData && Date.now() - cacheData.timestamp < CACHE_EXPIRATION) {
                dataCache.set(cacheKey, cacheData.data);
            } else {
                // Remove expired cache data
                localStorage.removeItem(key);
            }
        }
    }
}

function saveToCache(cacheKey, data) {
    dataCache.set(cacheKey, data);
    const cacheData = { data, timestamp: Date.now() };
    localStorage.setItem(CACHE_PREFIX + cacheKey, JSON.stringify(cacheData));
}

async function fetchDataWithCaching(endpoint, cacheKey) {
    if (dataCache.has(cacheKey)) {
        return dataCache.get(cacheKey);
    }

    var aTag = document.querySelector("#myProgressText .tit-credits a");
    aTag.textContent = "Updating...";
    const response = await fetch(endpoint);
    const freshData = await response.json();
    saveToCache(cacheKey, freshData);
    return freshData;
}

async function fetchData() {
    initializeCache();
    const table = document.getElementById("table-to-populate");
    const elem = document.getElementById("myBar");

    const databaseDataResponse = await fetch(
        "https://robloxhorrorlist.com/weights-database.json"
    );
    data.databaseData = await databaseDataResponse.json();

    gameUIDS = [];

    for (let i = 0; i < data.databaseData.games.length; i++) {
        const element = data.databaseData.games[i];
        if (element.ambience !== "") gameUIDS.push(element.uid);
    }

    const chunks = [];
    for (let i = 0; i < gameUIDS.length; i += maxUIDChunkSize) {
        chunks.push(gameUIDS.slice(i, i + maxUIDChunkSize));
    }

    const fetchGameDataPromises = chunks.map((chunk) =>
        fetchDataWithCaching(`${API_BASE_URL}/game-info/${chunk.join(",")}`, `gameData_${chunk.join(",")}`, 300000)
    );

    const fetchIconDataPromises = chunks.map((chunk) =>
        fetchDataWithCaching(`${API_BASE_URL}/game-icon/${chunk.join(",")}`, `gameIconData_${chunk.join(",")}`, 300000)
    );

    elem.style.width = "50%";

    console.time("Get all Promises");
    const [gameDataResponses, iconDataResponses] = await Promise.all([
        Promise.all(fetchGameDataPromises),
        Promise.all(fetchIconDataPromises),
    ]);

    data.gameData = gameDataResponses.flat();
    data.gameIconData = iconDataResponses.flat();

    const gameDataFromAPI = data.gameData.reduce((result, item) => {
        return [...result, ...item["data"]];
    }, []);

    const gameIconDataFromAPI = data.gameIconData.reduce((result, item) => {
        return [...result, ...item["data"]];
    }, []);

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < gameUIDS.length; i++) {
        try {
            var row = ` <tr class="hover-reveal">
                  <td data-th="Placement">${i + 1}.</td>
                  <td data="Icon"><img class="game-icon" src="${gameIconDataFromAPI[i].imageUrl}"></td>
                  <td data-th="Title" class="game-title"><a href="#" class="game-href" onclick="loadGame(
                    ${i + 1}, 
                    ${gameUIDS[i]})">${gameDataFromAPI[i].name}</a></td>
                  <td data-th="Creator" class="align-left">${JSON.parse(
                JSON.stringify(gameDataFromAPI[i].creator)
            ).name}</td>
                  <td data-th="Rating" class="align-left">${data.databaseData.games[i].ratings.rating}</td>
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
    document.getElementById("myProgress").style.display = "none";

    // Generate Table after populating it
    $("#game-table").DataTable({
        columnDefs: [{ orderable: false, targets: [1, 4] }],
    });

    document.getElementsByTagName("footer")[0].style.bottom = "auto";

    const elementToRemove = document.getElementById("myProgressText");
    if (elementToRemove) {
        elementToRemove.parentNode.removeChild(elementToRemove);
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
    window.open('../pages/game.html', '_blank');
}