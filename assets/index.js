const fallbackThumbnail = "https://t2.rbxcdn.com/1aeabc4e05c21be9d96b648c7bd05ccf";

function getRecentlyAddedGames() {
  const url = "https://ndevapi.com/main_list_ratings";

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      let entries = []

      data.forEach(entry => {
        entries.push(entry)
      });

      const numberOfEntries = data.length;

      const recentlyAddedFour = [];

      for (let i = entries.length - 1; i >= Math.max(0, entries.length - 4); i--) {
        recentlyAddedFour.unshift(entries[i]);
      }

      let currentId = 1
      recentlyAddedFour.forEach(entry => {
        const card = document.getElementById(`rr-${currentId}`);

        const title = card.querySelector("h1");
        title.textContent = entry.name;

        const rating = card.querySelector(".card-rating");
        rating.textContent = entry["ratings"].rating;

        const review = card.querySelector(".card-desc");
        let reviewContent = "";
        if (entry["rater_note"].conclusion == "") {
          reviewContent = "At this point in time, there is no review provided. Please refer to the game's Roblox page for a description of the game, and take a look at the category ratings for further information."
        }
        else {
          reviewContent = entry["rater_note"].conclusion;
        }
        review.textContent = reviewContent;

        const thumb = card.querySelector(".card-img-container img");
        thumb.src = fallbackThumbnail;

        currentId += 1
      });
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  getRecentlyAddedGames();
});