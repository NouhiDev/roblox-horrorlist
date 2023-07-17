// ██████╗░░█████╗░██████╗░██╗░░░░░░█████╗░██╗░░██╗
// ██╔══██╗██╔══██╗██╔══██╗██║░░░░░██╔══██╗╚██╗██╔╝
// ██████╔╝██║░░██║██████╦╝██║░░░░░██║░░██║░╚███╔╝░
// ██╔══██╗██║░░██║██╔══██╗██║░░░░░██║░░██║░██╔██╗░
// ██║░░██║╚█████╔╝██████╦╝███████╗╚█████╔╝██╔╝╚██╗
// ╚═╝░░╚═╝░╚════╝░╚═════╝░╚══════╝░╚════╝░╚═╝░░╚═╝

// ██╗░░██╗░█████╗░██████╗░██████╗░░█████╗░██████╗░██╗░░░░░██╗░██████╗████████╗  ░█████╗░██████╗░██╗
// ██║░░██║██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║░░░░░██║██╔════╝╚══██╔══╝  ██╔══██╗██╔══██╗██║
// ███████║██║░░██║██████╔╝██████╔╝██║░░██║██████╔╝██║░░░░░██║╚█████╗░░░░██║░░░  ███████║██████╔╝██║
// ██╔══██║██║░░██║██╔══██╗██╔══██╗██║░░██║██╔══██╗██║░░░░░██║░╚═══██╗░░░██║░░░  ██╔══██║██╔═══╝░██║
// ██║░░██║╚█████╔╝██║░░██║██║░░██║╚█████╔╝██║░░██║███████╗██║██████╔╝░░░██║░░░  ██║░░██║██║░░░░░██║
// ╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝╚══════╝╚═╝╚═════╝░░░░╚═╝░░░  ╚═╝░░╚═╝╚═╝░░░░░╚═╝

// Created by nouhidev
async function performChecks() {
    let spreadsheet_check = false;
    let api_check = false;

    try {
        const spreadsheetResponse = await new Promise((resolve, reject) => {
            $.getJSON("https://opensheet.elk.sh/16vH1l9tcKMEs8MATdjrp_Op-sMIL9-0jRQnBqFEthGo/2")
                .done(resolve)
                .fail(reject);
        });

        if (spreadsheetResponse.length > 0) {
            console.log("Google Spreadsheets: OK!");
            spreadsheet_check = true;
        } else {
            console.log("Google Spreadsheets: ERROR!");
        }
    } catch (error) {
        console.error("Google Spreadsheets: ERROR!", error);
    }

    try {
        const apiResponse = await new Promise((resolve, reject) => {
            $.getJSON("ndevapi.com:8080/game-info/140239261")
                .done(resolve)
                .fail(reject);
        });

        if (apiResponse.length > 0) {
            console.log("API Response: OK!");
            api_check = true;
        } else {
            console.log("API Response: ERROR!");
        }
    } catch (error) {
        console.error("API Response: ERROR!", error);
    }

    if (api_check && spreadsheet_check) {
        console.log("Status: OK!");
        fetchGames2();
    } else {
        console.log("Status: ERROR!");
        console.log("Try reloading the webpage. If this error persists contact a developer!");
    }
}

var tablePopulated = false;

async function fetchGames() {
    var table = document.getElementById("table-to-populate");
    await $.getJSON("https://opensheet.elk.sh/16vH1l9tcKMEs8MATdjrp_Op-sMIL9-0jRQnBqFEthGo/3", function (spreadSheetData) {

    for (let i = 0; i < spreadSheetData.length; i++) {

        $.getJSON(`ndevapi.com:8080/game-info/${spreadSheetData[i].UID}`, function (apiGameData) {
            $.getJSON(`ndevapi.com:8080/game-icon/${spreadSheetData[i].UID}`, function (apiGameIconData) {

                var row = ` <tr class="hover-reveal" data-tooltip="">
                            <td data-th="Placement">${i + 1}.</td>
                            <td data="Icon"><img class="game-icon" src="${apiGameIconData["data"][0].imageUrl}"></td>
                            <td data-th="Title" class="game-title">${apiGameData[0].name}</td>
                            <td data-th="Creator" class="align-left">${JSON.parse(JSON.stringify(apiGameData[0].creator))["name"]}</td>
                            <td data-th="Rating" class="align-left">${spreadSheetData[i].Rating}</td>
                            </tr>`;

                table.innerHTML += row;
            });
        });   
    }

    // Generate Table after populating it
    $("#game-table").DataTable({
        columnDefs: [{ orderable: false, targets: [1, 4] }],
    });
    });
    
}

performChecks();

async function fetchGames2() {
    var table = document.getElementById("table-to-populate");

    var spreadSheetData = await $.getJSON(
      "https://opensheet.elk.sh/16vH1l9tcKMEs8MATdjrp_Op-sMIL9-0jRQnBqFEthGo/3"
    );

    for (let i = 0; i < spreadSheetData.length; i++) {
      const apiGameData = await $.getJSON(
        `http://3.121.199.0:8080/game-info/${spreadSheetData[i].UID}`
      );
      const apiGameIconData = await $.getJSON(
        `http://3.121.199.0:8080/game-icon/${spreadSheetData[i].UID}`
      );
  
      var row = ` <tr class="hover-reveal" data-tooltip="${toolTipContent(spreadSheetData, apiGameData, apiGameIconData, i)}">
                  <td data-th="Placement">${i + 1}.</td>
                  <td data="Icon"><img class="game-icon" src="${apiGameIconData["data"][0].imageUrl}"></td>
                  <td data-th="Title" class="game-title">${apiGameData[0].name}</td>
                  <td data-th="Creator" class="align-left">${JSON.parse(
                    JSON.stringify(apiGameData[0].creator)
                  )["name"]}</td>
                  <td data-th="Rating" class="align-left">${spreadSheetData[i].Rating}</td>
                  </tr>`;
  
      table.innerHTML += row;
    }
  
    // Generate Table after populating it
    $("#game-table").DataTable({
        columnDefs: [{ orderable: false, targets: [1, 4] }],
    });

    setUpTooltip();
}

function toolTipContent(spreadSheetData, apiGameData, apiGameIconData, i) {
    const formatter = Intl.NumberFormat('en', { notation: 'compact' });

    
    return `
    x01${apiGameData[0].name}
    x02${JSON.parse(JSON.stringify(apiGameData[0].creator))["name"]}
    x03${apiGameData[0].description.replaceAll('"', "")}
    x04${spreadSheetData[i].Date}
    xEND

    xR01${spreadSheetData[i].Scariness}
    xR02${spreadSheetData[i].SoundDesign}
    xR03${spreadSheetData[i].Story}
    xR04${spreadSheetData[i].Visuals}
    xR05${spreadSheetData[i].Ambience}
    xR06${spreadSheetData[i].Gameplay}
    xR07${spreadSheetData[i].Creativity}
    xR08${spreadSheetData[i].Enjoyment}
    xR09${spreadSheetData[i].ProductionQuality}
    xR10${spreadSheetData[i].Technical}
    xREND

    xSD01${formatter.format(apiGameData[0].playing)}
    xSD02${formatter.format(apiGameData[0].favoritedCount)}
    xSD03${formatter.format(apiGameData[0].visits)}
    xSD04${formatter.format(apiGameData[0].maxPlayers)}
    xSD05${(apiGameData[0].created.substring(0, 10))}
    xSD06${(apiGameData[0].updated.substring(0, 10))}
    xSDEND
    `;
}


/* Tooltip */
let setUpTooltip = function () {
    let tooltip = "",
        toolTipDiv = document.querySelector(".tooltip-class"),
        toolTipElements = Array.from(document.querySelectorAll(".hover-reveal"));

    // Game General Info Display  
    let gameTitle = document.getElementById("game_tooltip_title");
    let gameCreator = document.getElementById("game_tooltip_creator");
    let gameDescription = document.getElementById("game_tooltip_description");
    let lastUpdate = document.getElementById("game_tooltip_lastUpdate");

    // Game Ranking Display
    let note = document.getElementById("note");
    let scary = document.getElementById("game_rating_scariness");
    let soundDesign = document.getElementById("game_rating_soundDesign");
    let story = document.getElementById("game_rating_story");
    let visuals = document.getElementById("game_rating_visuals");
    let ambience = document.getElementById("game_rating_ambience");
    let gameplay = document.getElementById("game_rating_gameplay");
    let creativity = document.getElementById("game_rating_creativity");
    let enjoyment = document.getElementById("game_rating_enjoyment");
    let productionQuality = document.getElementById("game_rating_productionQuality");
    let technical = document.getElementById("game_rating_technical");
    let players = document.getElementById("players");
    let genre = document.getElementById("genre");

    // Game Stats Display
    let active = document.getElementById("game_stats_container_active");
    let favorites = document.getElementById("game_stats_container_favorites");
    let visits = document.getElementById("game_stats_container_visits");
    let max_players = document.getElementById("game_stats_container_maxPlayers");
    let created = document.getElementById("game_stats_container_created");
    let updated = document.getElementById("game_stats_container_updated");

    let displayTooltip = function (e, obj) {
        tooltip = obj.dataset.tooltip;
        toolTipDiv.style.top = e.pageY + ($(window).scrollTop() * -1) + "px";
        toolTipDiv.style.left = e.pageX + "px";
        toolTipDiv.style.opacity = .95;

        // Game General Information  
        gameTitle.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("x01") + 3, obj.dataset.tooltip.indexOf("x02"));
        gameCreator.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("x02") + 3, obj.dataset.tooltip.indexOf("x03"));
        gameDescription.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("x03") + 3, obj.dataset.tooltip.indexOf("x04"));
        lastUpdate.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("x04") + 3, obj.dataset.tooltip.indexOf("xEND"));

        // Game Rating Details
        scary.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("xR01") + 4, obj.dataset.tooltip.indexOf("xR02"));
        soundDesign.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("xR02") + 4, obj.dataset.tooltip.indexOf("xR03"));
        story.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("xR03") + 4, obj.dataset.tooltip.indexOf("xR04"));
        visuals.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("xR04") + 4, obj.dataset.tooltip.indexOf("xR05"));
        ambience.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("xR05") + 4, obj.dataset.tooltip.indexOf("xR06"));
        gameplay.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("xR06") + 4, obj.dataset.tooltip.indexOf("xR07"));
        creativity.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("xR07") + 4, obj.dataset.tooltip.indexOf("xR08"));
        enjoyment.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("xR08") + 4, obj.dataset.tooltip.indexOf("xR09"));
        productionQuality.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("xR09") + 4, obj.dataset.tooltip.indexOf("xR10"));
        technical.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("xR10") + 4, obj.dataset.tooltip.indexOf("xREND"));

        // Game Stats Display Text Update
        active.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("xSD01") + 5, obj.dataset.tooltip.indexOf("xSD02"));
        favorites.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("xSD02") + 5, obj.dataset.tooltip.indexOf("xSD03"));
        visits.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("xSD03") + 5, obj.dataset.tooltip.indexOf("xSD04"));
        max_players.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("xSD04") + 5, obj.dataset.tooltip.indexOf("xSD05"));
        created.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("xSD05") + 5, obj.dataset.tooltip.indexOf("xSD06"));
        updated.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("xSD06") + 5, obj.dataset.tooltip.indexOf("xSDEND"));
    };

    toolTipElements.forEach(function (elem) {
        elem.addEventListener("mouseenter", function (e) {
            displayTooltip(e, this);
        });
        elem.addEventListener("mouseleave", function (e) {
            toolTipDiv.style.opacity = 0;
        });
    });
};

window.addEventListener("click", () => {
    setUpTooltip();
});