$(window).on("load", async function () {
  //$(".loader").fadeOut(1000);
  //delay(1000).then(() => $(".content").style.opacity = 0);
  // Check if desktop or mobile
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    // Mobile
    $.getJSON(
      "https://opensheet.elk.sh/16vH1l9tcKMEs8MATdjrp_Op-sMIL9-0jRQnBqFEthGo/2",
      function (data) {
        // Build Table with data
        buildMobileTable(data);
      }
    );
  } else {
    // Desktop
    $.getJSON(
      "https://opensheet.elk.sh/16vH1l9tcKMEs8MATdjrp_Op-sMIL9-0jRQnBqFEthGo/2",
      function (data) {
        // Build Table with data
        buildTable(data);
      }
    );
  }
});


var genres = [];
var genreClasses = [];

function buildTable(data) {
  var table = document.getElementById("table-to-populate");
  var playerClass = "";
  table.innerHTML = "";

  for (var i = 0; i < data.length; i++) {

    // Determine Player Color
    if (data[i].Players == "Multiplayer") {
      playerClass = "tag blue-bg";
    } else {
      playerClass = "tag orange-bg";
    }

    genreClasses = [];
    genres = [];
    genres = data[i].Genre.split(", ");
    var genreAmount = genres.length;

    for (var j = 0; j < genreAmount; j++) {
      switch (genres[j]) {
        case "Chapters":
          genreClasses.push("tag purple-bg");
          break;
        case "Story":
          genreClasses.push("tag green-bg");
          break;
        case "Minigame":
          genreClasses.push("tag yellow-bg");
          break;
        case "Misc":
          genreClasses.push("tag dark-blue-bg");
          break;
        case "Myth":
          genreClasses.push("tag pink-bg");
          break;
        case "Exploration":
          genreClasses.push("tag dark-green-bg");
          break;
        case "Removed/Privated":
          genreClasses.push("tag red-bg");
          break;
        case "Unfinished/Abandonend":
          genreClasses.push("tag grey-bg");
          break;
        case "TBA":
          genreClasses.push("tag grey-bg");
          break;
        case "Port":
          genreClasses.push("tag dark-orange-bg");
          break;
        case "Survival Horror":
          genreClasses.push("tag survival-horror");
          break;
        case "Abstract":
          genreClasses.push("tag abstract");
          break;
        case "Fan Game":
          genreClasses.push("tag fan-game");
          break;
        case "Classic Horror":
          genreClasses.push("tag classic-horror");
          break;
      }
    }

    var tooltipcontent = `${data[i].Scariness}!
    ${data[i].SoundDesign}§
    ${data[i].Story}$
    ${data[i].Visuals}%
    ${data[i].Ambience}&
    ${data[i].Gameplay}#
    ${data[i].Creativity}{
    ${data[i].Enjoyment}*
    ${data[i].ProductionQuality}:
    ${data[i].Technical}<
    ${data[i].Note}_
    #${i + 1} | ${data[i].Name} by ${data[i].Creator} | Updated: ${
      data[i].Date
    }°
    ${genres}(${genreClasses}^
    ${data[i].Players})${playerClass}>${genres.length}`;

    var row = `<tr class="hover-reveal" data-tooltip="${tooltipcontent}">
                        <td data-th="Placement">${i + 1}.</td>
                        <td data="Icon"><img class="game-icon" src="${
                          data[i].IconURL
                        }"></td>
                        <td data-th="Title" class="game-title">${
                          data[i].Name
                        }</span></td>
                        <td data-th="Creator" class="align-left">${
                          data[i].Creator
                        }</td>
                        <td data-th="Rating" class="align-left">${
                          data[i].Rating
                        }</td>
                        </tr>`;
    table.innerHTML += row;
  }

  $("#game-table").DataTable({
    columnDefs: [{ orderable: false, targets: [1, 4] }],
  });

  setUpTooltip();
}

function buildMobileTable(data) {
  var table = document.getElementById("mobile-table-to-populate");
  var tableDiv = document.getElementById("table-container");
  tableDiv.style.display = "none";
  tableDiv = document.getElementById("mobile-table-container");
  tableDiv.style.display = "block";
  var playerClass = "";
  var genreClass = "";
  table.innerHTML = "";

  for (var i = 0; i < data.length; i++) {
    // Determine Player Color
    if (data[i].Players == "Multiplayer") {
      playerClass = "tag blue-bg";
    } else {
      playerClass = "tag orange-bg";
    }

    // Determine Genre Color
    switch (data[i].Genre) {
      case "Chapters":
        genreClass = "tag purple-bg";
        break;
      case "Story":
        genreClass = "tag green-bg";
        break;
      case "Minigame":
        genreClass = "tag yellow-bg";
        break;
      case "Misc":
        genreClass = "tag dark-blue-bg";
        break;
      case "Myth":
        genreClass = "tag pink-bg";
        break;
      case "Exploration":
        genreClass = "tag dark-green-bg";
        break;
      case "Removed/Privated":
        genreClass = "tag red-bg";
        break;
      case "Unfinished/Abandonend":
        genreClass = "tag grey-bg";
        break;
      case "TBA":
        genreClass = "tag grey-bg";
        break;
      case "Port":
        genreClass = "tag dark-orange-bg";
        break;
      case "Survival Horror":
        genreClass = "tag survival-horror";
        break;
      case "Abstract":
        genreClass = "tag abstract";
        break;
      case "Fan Game":
        genreClass = "tag fan-game";
        break;
      case "Classic Horror":
        genreClass = "tag classic-horror";
        break;
    }

    var row = `<tr>
                        <td data-th="Placement">${i + 1}.</td>
                        <td data="Icon"><img class="game-icon" src="${
                          data[i].IconURL
                        }"></td>
                        <td data-th="Title" class="game-title">${
                          data[i].Name
                        }</span></td>
                        <td data-th="Rating" class="align-left">${
                          data[i].Rating
                        }</td>
                        </tr>`;
    table.innerHTML += row;
  }

  $("#mobile-game-table").DataTable({
    columnDefs: [{ orderable: false, targets: [1, 3] }],
  });
}

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

/* Tooltip */
let setUpTooltip = function () {
  let tooltip = "",
    toolTipDiv = document.querySelector(".tooltip-class"),
    toolTipElements = Array.from(document.querySelectorAll(".hover-reveal"));
  let gametitle = document.getElementById("game-tooltip-title");
  let note = document.getElementById("note");
  let scary = document.getElementById("scariness");
  let sd = document.getElementById("sd");
  let st = document.getElementById("st");
  let vis = document.getElementById("vis");
  let amb = document.getElementById("amb");
  let gp = document.getElementById("gp");
  let crea = document.getElementById("crea");
  let enj = document.getElementById("enj");
  let pq = document.getElementById("pq");
  let technical = document.getElementById("technical");
  let players = document.getElementById("players");
  let genre = document.getElementById("genre");

  let displayTooltip = function (e, obj) {
    tooltip = obj.dataset.tooltip;
    toolTipDiv.style.top = e.pageY + $(window).scrollTop() * -1 + "px";
    toolTipDiv.style.left = screen.width / 3 + "px";
    toolTipDiv.style.opacity = 0.95;
    note.innerHTML =
      "Notes: " +
      obj.dataset.tooltip.substring(
        obj.dataset.tooltip.indexOf("<") + 1,
        obj.dataset.tooltip.indexOf("_")
      );

    /*Scariness*/ scary.innerHTML = obj.dataset.tooltip.substring(
      0,
      obj.dataset.tooltip.indexOf("!")
    );
    /*Sound Design*/ sd.innerHTML = obj.dataset.tooltip.substring(
      obj.dataset.tooltip.indexOf("!") + 1,
      obj.dataset.tooltip.indexOf("§")
    );
    /*Story*/ st.innerHTML = obj.dataset.tooltip.substring(
      obj.dataset.tooltip.indexOf("§") + 1,
      obj.dataset.tooltip.indexOf("$")
    );
    /*Visuals*/ vis.innerHTML = obj.dataset.tooltip.substring(
      obj.dataset.tooltip.indexOf("$") + 1,
      obj.dataset.tooltip.indexOf("%")
    );
    /*Ambience*/ amb.innerHTML = obj.dataset.tooltip.substring(
      obj.dataset.tooltip.indexOf("%") + 1,
      obj.dataset.tooltip.indexOf("&")
    );
    /*Gameplay*/ gp.innerHTML = obj.dataset.tooltip.substring(
      obj.dataset.tooltip.indexOf("&") + 1,
      obj.dataset.tooltip.indexOf("#")
    );
    /*Creativity*/ crea.innerHTML = obj.dataset.tooltip.substring(
      obj.dataset.tooltip.indexOf("#") + 1,
      obj.dataset.tooltip.indexOf("{")
    );
    /*Enjoyment*/ enj.innerHTML = obj.dataset.tooltip.substring(
      obj.dataset.tooltip.indexOf("{") + 1,
      obj.dataset.tooltip.indexOf("*")
    );
    /*Production Quality*/ pq.innerHTML = obj.dataset.tooltip.substring(
      obj.dataset.tooltip.indexOf("*") + 1,
      obj.dataset.tooltip.indexOf(":")
    );
    /*Technical*/ technical.innerHTML = obj.dataset.tooltip.substring(
      obj.dataset.tooltip.indexOf(":") + 1,
      obj.dataset.tooltip.indexOf("<")
    );
    /*Title*/ gametitle.innerHTML = obj.dataset.tooltip.substring(
      obj.dataset.tooltip.indexOf("_") + 1,
      obj.dataset.tooltip.indexOf("°")
    );
    /*Players*/ players.innerHTML = obj.dataset.tooltip.substring(
      obj.dataset.tooltip.indexOf("^") + 1,
      obj.dataset.tooltip.indexOf(")")
    );
    players.className = obj.dataset.tooltip.substring(
      obj.dataset.tooltip.indexOf(")") + 1,
      obj.dataset.tooltip.indexOf(">")
    );
    /*Genre*/
    genre.innerHTML = "";
    for (
      let index = 0;
      index <
      parseInt(
        obj.dataset.tooltip.substring(
          obj.dataset.tooltip.indexOf(">") + 1,
          obj.dataset.tooltip.length
        )
      );
      index++
    ) {
      genres = obj.dataset.tooltip.substring(
        obj.dataset.tooltip.indexOf("°") + 1,
        obj.dataset.tooltip.indexOf("(")
      ).split(",")
      genreClasses = obj.dataset.tooltip.substring(
        obj.dataset.tooltip.indexOf("(") + 1,
        obj.dataset.tooltip.indexOf("^")
      ).split(",")
      var genreTemplate = `<span class="${genreClasses[index]}" id="genre">${genres[index]}</span>`;
      genre.innerHTML += genreTemplate;
    }
  };

  toolTipElements.forEach(function (elem) {
    elem.addEventListener("mouseenter", function (e) {
      displayTooltip(e, this);
    });
    elem.addEventListener("mouseleave", function (e) {
      toolTipDiv.style.opacity = 0;
      toolTipDiv.style.top = "9999999px";
      toolTipDiv.style.left = "9999999px";
    });
  });
};

$(document).click(function (event) {
  setUpTooltip();
});

function gh() {
  window.location.href = "https://github.com/NouhiDev/roblox-horrorlist";
}

function yt() {
  window.location.href = "https://www.youtube.com/@robloxhorrorlist";
}

function tt() {
  window.location.href = "https://www.tiktok.com/@robloxhorrorlist?lang=en";
}
