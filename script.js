// <!-- sourav -->
function updateTimer() {
    const countdownElement = document.getElementById('discounttimeleft');
    const timeArray = countdownElement.innerText.split(/\s+/); // Split hours, minutes, and seconds
    let hours = parseInt(timeArray[0]);
    let minutes = parseInt(timeArray[1]);
    let seconds = parseInt(timeArray[2]);

    // Calculate total seconds
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    // Update seconds, minutes, and hours
    hours = Math.floor(totalSeconds / 3600);
    minutes = Math.floor((totalSeconds % 3600) / 60);
    seconds = totalSeconds % 60;

    // Display the updated time in the HTML
    countdownElement.innerHTML = `${hours}<span style="font-size: smaller; font-weight: 400;">hrs</span> ${minutes}<span style="font-size: smaller; font-weight: 400;">Min</span> ${seconds}<span style="font-size: smaller; font-weight: 400;">Sec</span>`;

    // Decrease the time left
    totalSeconds--;

    // Check if the countdown has reached zero
    if (totalSeconds < 0) {
      clearInterval(timerInterval);
      countdownElement.innerHTML = "Expired";
      // Add code to handle the expiration, e.g., hide the discount or display a message
    }
  }

  // Update the countdown every second (1000 milliseconds)
  const timerInterval = setInterval(updateTimer, 1000);

// <!-- vishnu -->

document.addEventListener("DOMContentLoaded", function () {
    // Rating display logic
    const ratingContainers = document.querySelectorAll('.rating-container');
    ratingContainers.forEach(container => {
        const textContent = container.textContent.trim();
        const ratingValue = parseFloat(textContent);

        if (!isNaN(ratingValue) && ratingValue >= 1 && ratingValue <= 5) {
            displayRating(container, ratingValue);
        } else {
            console.error(`Invalid rating value`);
        }
    });

    //////////// Fetch data and navigate to destination.html/////
    const seeMoreButton = document.querySelector('.see-more-button');
    seeMoreButton.addEventListener('click', function (event) {
        event.preventDefault();
        fetchTravelDestinations();
    });
});

function displayRating(container, value) {
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.className = 'rating-star ' + (i <= value ? 'active' : '');
        star.innerHTML = '&#9733;';
        container.appendChild(star);
    }
}

let travelDestinationsArray = [];

function fetchTravelDestinations() {
    fetch('http://127.0.0.1:5500/local_api.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            travelDestinationsArray = data;
            window.location.href = 'destination.html';
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

// <!-- yogesh -->


// <!-- utkarsh -->


// <!-- nidhi -->
