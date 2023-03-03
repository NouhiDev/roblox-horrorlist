$(window).on("load", async function () {
  $(".loader").fadeOut(1000);
  delay(1000).then(() => $(".content").fadeIn(1000));
  $.getJSON(
    "https://opensheet.elk.sh/16vH1l9tcKMEs8MATdjrp_Op-sMIL9-0jRQnBqFEthGo/2",
    function (data) {
      // Build Table with data
      buildTable(data);
    }
  );
});

function buildTable(data) {
  var table = document.getElementById("table-to-populate");
  var playerClass = "";
  var genreClass = "";
  table.innerHTML = "";

  for (var i = 0; i < data.length; i++) {
    // Determine Player Color
    if (data[i].Players == "MP") {
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
      case "X":
        genreClass = "tag red-bg";
        break;
      case "UF":
        genreClass = "tag grey-bg";
        break;
      case "TBA":
        genreClass = "tag grey-bg";
        break;
      case "Port":
        genreClass = "tag dark-orange-bg";
        break;
    }

    var tooltipcontent = `${data[i].Scariness}!
    ${data[i].SoundDesign}§
    ${data[i].Story}$
    ${data[i].Visuals}%
    ${data[i].Ambience}&
    ${data[i].Gameplay}#
    ${data[i].Creativity}-
    ${data[i].Enjoyment}*
    ${data[i].ProductionQuality}:
    ${data[i].Technical}.
    ${data[i].Note}_
    ${data[i].Name} by ${data[i].Creator} | Updated: ${data[i].Date}°
    ${data[i].Genre}(${genreClass}^
    ${data[i].Players})${playerClass}`;

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
    toolTipDiv.style.top = e.pageY + "px";
    toolTipDiv.style.left = e.pageX + "px";
    toolTipDiv.style.opacity = .95;
    note.innerHTML = "Notes: " + obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf(".")+1,obj.dataset.tooltip.indexOf("_"));

    /*Scariness*/ scary.innerHTML = obj.dataset.tooltip.substring(0,obj.dataset.tooltip.indexOf("!"));
    /*Sound Design*/ sd.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("!")+1,obj.dataset.tooltip.indexOf("§"));
    /*Story*/ st.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("§")+1,obj.dataset.tooltip.indexOf("$"));
    /*Visuals*/ vis.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("$")+1,obj.dataset.tooltip.indexOf("%"));
    /*Ambience*/ amb.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("%")+1,obj.dataset.tooltip.indexOf("&"));
    /*Gameplay*/ gp.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("&")+1,obj.dataset.tooltip.indexOf("#"));
    /*Creativity*/ crea.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("#")+1,obj.dataset.tooltip.indexOf("-"));
    /*Enjoyment*/ enj.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("-")+1,obj.dataset.tooltip.indexOf("*"));
    /*Production Quality*/ pq.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("*")+1,obj.dataset.tooltip.indexOf(":"));
    /*Technical*/ technical.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf(":")+1,obj.dataset.tooltip.indexOf("."));
    /*Title*/ gametitle.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("_")+1,obj.dataset.tooltip.indexOf("°"));
    /*Players*/ players.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("^")+1,obj.dataset.tooltip.indexOf(")"));
    players.className = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf(")")+1,obj.dataset.tooltip.length);
    /*Genre*/ genre.innerHTML = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("°")+1,obj.dataset.tooltip.indexOf("("));
    genre.className = obj.dataset.tooltip.substring(obj.dataset.tooltip.indexOf("(")+1,obj.dataset.tooltip.indexOf("^"));
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
