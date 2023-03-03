$.getJSON(
  "https://opensheet.elk.sh/16vH1l9tcKMEs8MATdjrp_Op-sMIL9-0jRQnBqFEthGo/5",
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

    var row = `<tr">
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

  $("#game-table").DataTable( {
    columnDefs: [
      { orderable: false, targets: 1 }
    ]
  } );
}