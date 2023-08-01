// ░█▀▀█ ░█▀▀▀█ ░█▀▀█ ░█─── ░█▀▀▀█ ▀▄░▄▀ 
// ░█▄▄▀ ░█──░█ ░█▀▀▄ ░█─── ░█──░█ ─░█── 
// ░█─░█ ░█▄▄▄█ ░█▄▄█ ░█▄▄█ ░█▄▄▄█ ▄▀░▀▄ 

// ░█─░█ ░█▀▀▀█ ░█▀▀█ ░█▀▀█ ░█▀▀▀█ ░█▀▀█ ░█─── ▀█▀ ░█▀▀▀█ ▀▀█▀▀ 
// ░█▀▀█ ░█──░█ ░█▄▄▀ ░█▄▄▀ ░█──░█ ░█▄▄▀ ░█─── ░█─ ─▀▀▀▄▄ ─░█── 
// ░█─░█ ░█▄▄▄█ ░█─░█ ░█─░█ ░█▄▄▄█ ░█─░█ ░█▄▄█ ▄█▄ ░█▄▄▄█ ─░█── 

// ───░█ ░█▀▀▀█ 
// ─▄─░█ ─▀▀▀▄▄ 
// ░█▄▄█ ░█▄▄▄█

// EMERGENCY

// Created by nouhidev

const maxUIDChunkSize = 100;
const API_BASE_URL = "https://ndevapi.com";

const data = {
    databaseData: [],
    gameData: [],
    gameIconData: [],
};

window.onload = function () {
    usageDisplay();
    fetchData()
    $('header').hide();
};

async function fetchData() {
    const table = document.getElementById("table-to-populate");
    const elem = document.getElementById("myBar");

    const databaseDataResponse = await fetch(
        "https://robloxhorrorlist.com/database.json"
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

    const emergency_game_data = await fetch(
        "https://robloxhorrorlist.com/emergency-data/emergency-data.json"
    );
    data.gameData = await emergency_game_data.json();

    const emergency_game_icon_data = await fetch(
        "https://robloxhorrorlist.com/emergency-data/emergency-data-icons.json"
    );
    data.gameIconData = await emergency_game_icon_data.json();

    let gameDataFromAPI = data.gameData;
    let gameIconDataFromAPI = data.gameIconData;

    for (let i = 0; i < gameUIDS.length; i++) {
        try {
            var row = ` <tr class="hover-reveal">
            <td data-th="Placement">${i + 1}.</td>
            <td data="Icon"><img class="game-icon" src="${gameIconDataFromAPI["data"][i].imageUrl}"></td>
            <td data-th="Title" class="game-title"><a href="#" class="game-href" onclick="loadGame(
              ${i + 1}, 
              ${gameUIDS[i]})">${gameDataFromAPI["data"][i].name}</a></td>
            <td data-th="Creator" class="align-left">${JSON.parse(
                JSON.stringify(gameDataFromAPI["data"][i].creator)
            ).name}</td>
            <td data-th="Rating" class="align-left">${data.databaseData.games[i].ratings.rating}</td>
            </tr>`;

            table.innerHTML += row;
        } catch (e) {
            console.error(e);
        }
    }

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

    EMERGENCY MODE
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
    window.open('./pages/game.html', '_blank');
}