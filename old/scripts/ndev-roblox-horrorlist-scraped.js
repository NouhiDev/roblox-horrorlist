function formatLargeNumber(number) {
    if (number >= 1e9) {
      return (number / 1e9).toFixed(2) + 'B';
    } else if (number >= 1e6) {
      return (number / 1e6).toFixed(2) + 'M';
    } else if (number >= 1e3) {
      return (number / 1e3).toFixed(2) + 'K';
    } else {
      return number.toString();
    }
  }

async function getScrapedGames() {
    const table = document.getElementById("table-to-populate");
    const databaseDataResponse = await fetch("https://ndevapi.com/scraped_horror_games");
    let databaseData = await databaseDataResponse.json();
    databaseData.sort((a, b) => parseFloat(b.visits) - parseFloat(a.visits));

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < databaseData.length; i++) {
        table.innerHTML = "";
        try {
         var row = ` <tr class="hover-reveal">
            <td data-th="Placement">${i + 1}.</td>
            <td data-th="UID" class="game-title">${databaseData[i].id}</td>
            <td data-th="Name""><a href='https://www.roblox.com/games/${databaseData[i].placeId}'>${databaseData[i].name}</a></td>
            <td data-th="Visits" class="align-left">${formatLargeNumber(databaseData[i].visits)}</td>
            </tr>`;

            const rowElement = document.createElement('tr');
            rowElement.innerHTML = row;
            fragment.appendChild(rowElement);
        } catch (e) {
            console.error(e);
        }
    }
    table.appendChild(fragment);

    // Generate Table after populating it
    dataTable = $("#game-table").DataTable({
        columnDefs: [{ orderable: false, targets: [2, 3] }],
        responsive: true
    });
}

document.addEventListener("DOMContentLoaded", () => {
    getScrapedGames();
});