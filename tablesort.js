$(window).on("load",function(){
    $(".loader").fadeOut(1000);
    delay(1000).then(() => $(".content").fadeIn(1000));
})

/**
 * Sorts a HTML table.
 * Yoinked from dcode
 * "Optimized" and modified by nouhi
 * 
 * @param {HTMLTableElement} table The table to sort
 * @param {number} column The index of the column to sort
 * @param {boolean} asc Determines if the sorting will be in ascending
 */
function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        const aColumnText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        const bColumnText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        const cColumnText = parseFloat(a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim());
        const dColumnText = parseFloat(b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim());

        if(isNaN(aColumnText) && isNaN(bColumnText)) {
            return aColumnText > bColumnText ? (1 * dirModifier) : (-1 * dirModifier);
        }
        else {
            return cColumnText > dColumnText ? (1 * dirModifier) : (-1 * dirModifier);
        }
    });

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
}

document.querySelectorAll(".table-sortable th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});

// TODO: FIX THIS UP ASAP

// Automatically sorts by rating

let counter = 0;

document.querySelectorAll(".table-sortable th").forEach(headerCell => {
    
    if (counter < 1) {

        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");
    
        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    }

    counter += 1;
});

counter = 0;

document.querySelectorAll(".table-sortable th").forEach(headerCell => {
    
    if (counter < 1) {

        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");
    
        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    }

    counter += 1;
});

// Determines how many games are listed
let count = document.querySelector(".amount");
// Updates text to amount of games rated
count.textContent = "Games rated: " + (document.querySelectorAll(".table-sortable tr").length - 1);

// Determine average rating
// Stores all ratings
let avg = document.querySelectorAll(".rating");
// Sum of all ratings
let sum = 0;
// Add stored ratings to sum
avg.forEach(function(item) {sum += parseFloat(item.textContent);});

// Stores average text container
let avg_2 = document.querySelector(".average");
// Updates text to average rating
avg_2.textContent = "Average Rating: " + Math.round((sum/(document.querySelectorAll(".table-sortable tr").length - 1))* 10) / 10;

// Adds delay
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }