// <!-- sourav -->
let hours = 3;
let minutes = 32;
let seconds = 7;
let totalSeconds = hours * 3600 + minutes * 60 + seconds;
function updateTimer() {
    const countdownElement = document.getElementById('discounttimeleft');
    hours = Math.floor(totalSeconds / 3600);
    minutes = Math.floor((totalSeconds % 3600) / 60);
    seconds = totalSeconds % 60;
    countdownElement.innerHTML = `${hours}<span style="font-size: smaller; font-weight: 400;">hrs</span> ${minutes}<span style="font-size: smaller; font-weight: 400;">Min</span> ${seconds}<span style="font-size: smaller; font-weight: 400;">Sec</span>`;
    totalSeconds-=1;
    if (totalSeconds < 0) {
      clearInterval(timerInterval);
      countdownElement.innerHTML = "Expired";
    }
  }

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
 // Contact Us 

  document.getElementById('supportForm').addEventListener('submit' , function(event){
    event.preventDefault();

    var name=document.getElementById('name').value;
    var phone=document.getElementById('phone').value;
    var message=document.getElementById('message').value;

    alert('Name' +name + '\nPhone:' + phone +'\nMessage:' + message);
  });    