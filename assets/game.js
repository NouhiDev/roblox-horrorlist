function formatLargeNumber(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else {
      return num.toString();
    }
  }

async function loadGame() {
    const uid = localStorage.getItem("UID");
    const number = localStorage.getItem("number");

    const url = "https://ndevapi.com/main_list_ratings";

    await fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            numberOfGames = data.length;

            document.getElementsByClassName("game-infos")[0].innerHTML = `Tag(s): ${data[number-1].genres}<br><br>`;
            document.getElementsByClassName("rhl-score")[0].innerHTML = `${(parseFloat(data[number-1]["ratings"].rating)*10).toFixed(0)}%`;
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });

    await fetch(`https://ndevapi.com/game-info/${uid}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const updated = data["data"][0].updated.substring(0, 10);
            const updatedDate = new Date(updated)
            const today = new Date()
            const timeDifference = updatedDate - today;
            const daysDifference = formatLargeNumber(Math.abs(Math.floor(timeDifference / (1000 * 60 * 60 * 24))) - 1);

            document.getElementsByClassName("game-intro-title")[0].textContent = data["data"][0].name;
            document.getElementsByClassName("game-creator")[0].textContent = "By " + data["data"][0].creator.name;
            document.getElementsByClassName("game-infos")[0].innerHTML += `Favorites: ${formatLargeNumber(data["data"][0].favoritedCount)}<br>Max Players: ${formatLargeNumber(data["data"][0].maxPlayers)}<br>Active: ${formatLargeNumber(data["data"][0].playing)}<br>Visits: ${formatLargeNumber(data["data"][0].visits)}<br>Created: ${data["data"][0].created.substring(0, 10)}<br>Updated: ${data["data"][0].updated.substring(0, 10)} (${daysDifference} days ago)<br>`;
            document.getElementsByClassName("play-btn")[0].href = `https://www.roblox.com/games/${data["data"][0].rootPlaceId}`;
            document.getElementsByClassName("play-btn")[0].target = "_blank";
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });

    await fetch(`https://ndevapi.com/game-thumbnail/${uid}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            document.getElementById("game-icon").src = data["data"][0]["thumbnails"][0].imageUrl
        })
        .catch(error => {
            console.error("Fetch error:", error);
    });

    await fetch(`https://ndevapi.com/game-votes/${randomUID}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const thumbsUpCount = parseInt(data["data"][0].upVotes);
            const thumbsDownCount = parseInt(data["data"][0].downVotes);
            const totalVotes = thumbsUpCount + thumbsDownCount;
            document.getElementById("likes").innerText += `${thumbsUpCount})`;
            document.getElementById("dislikes").innerText += `${thumbsDownCount})`;

            const bar = document.getElementById('bar');
            const thumbsUpPercentage = (thumbsUpCount / totalVotes) * 100;

            bar.style.width = thumbsUpPercentage + '%';
        })
        .catch(error => {
            console.error("Fetch error:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    loadGame();
});