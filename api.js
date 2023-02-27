// -------------- LOADER --------------

$(window).on("load", function () {
  $(".loader").fadeOut(1000);
  delay(1000).then(() => $(".content").fadeIn(1000));
  document.body.style.zoom = "85%";
});

// -------------- BUILDING AND POPULATING TABLE --------------
// Credits: Dennis Ivy

$.getJSON(
  "https://opensheet.elk.sh/16vH1l9tcKMEs8MATdjrp_Op-sMIL9-0jRQnBqFEthGo/2",
  function (data) {
    // Build Table with data
    buildTable(data);
  }
);

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

    var row = `<tr class="${data[i].CreatorsChoice}">
                    <td class="rating">${data[i].Rating}</td>
                    <td>${data[i].Name} <span class="${playerClass}">${data[i].Players}</span> <span class="${genreClass}">${data[i].Genre}</span></td>
                    <td>${data[i].Creator}</td>
                    <td>${data[i].Scariness}</td>
                    <td>${data[i].SoundDesign}</td>
                    <td>${data[i].Story}</td>
                    <td>${data[i].Visuals}</td>
                    <td>${data[i].Ambience}</td>
                    <td>${data[i].Gameplay}</td>
                    <td>${data[i].Creativity}</td>
                    <td>${data[i].Enjoyment}</td>
                    <td>${data[i].ProductionQuality}</td>
                    <td>${data[i].Technical}</td>
                    </tr>`;
    table.innerHTML += row;
  }
}

// -------------- SORTING --------------
// Not working for some reason

$("th").on("click", function () {
  var column = $(this).data("column");
  var order = $(this).data("order");

  if (order == "desc") {
    $(this).data("order", "asc");
    myArray = myArray.sort((a, b) => (a[column] > b[column] ? 1 : -1));
  } else {
    $(this).data("order", "desc");
    myArray = myArray.sort((a, b) => (a[column] < b[column] ? 1 : -1));
  }

  $.getJSON(
    "https://opensheet.elk.sh/16vH1l9tcKMEs8MATdjrp_Op-sMIL9-0jRQnBqFEthGo/2",
    function (data) {
      // Build Table with data
      buildTable(data);
    }
  );
});
// -------------- STATS --------------

// Updates text to amount of games rated
$.getJSON(
  "https://opensheet.elk.sh/16vH1l9tcKMEs8MATdjrp_Op-sMIL9-0jRQnBqFEthGo/2",
  function (data) {
    // Determines how many games are listed
    let count = document.querySelector(".amount");
    count.textContent = "Games rated: " + data.length.toString();
  }
);

// Determine average rating
$.getJSON(
  "https://opensheet.elk.sh/16vH1l9tcKMEs8MATdjrp_Op-sMIL9-0jRQnBqFEthGo/2",
  function (data) {
    let avg = document.querySelector(".average");
    var sum = 0;
    for (var i = 0; i < data.length; i++) {
      sum += parseFloat(data[i].Rating);
    }
    var average = Math.round((sum / data.length) * 10);
    avg.textContent = "Average Rating: " + average / 10;
  }
);

// -------------- MISC --------------

// Adds Delay
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

