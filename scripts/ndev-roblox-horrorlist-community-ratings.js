document.addEventListener('DOMContentLoaded', function () {
    const ratingForm = document.getElementById('ratingForm');

    ratingForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const gameId = parseInt(document.getElementById('gameId').value);
        const rating = parseFloat(document.getElementById('rating').value);

        const data = {
            rating: rating
        };

        fetch(`https://ndevapi.com/rate/${gameId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                console.log(result.message);
                // You can display a success message to the user or update the UI as needed
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle errors, display an error message, etc.
            });
    });
});

function getRatings() {
    // WIP
    fetch('https://ndevapi.com/ratings')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}