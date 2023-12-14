document.addEventListener('DOMContentLoaded', function () {
    fetchDestinations()
      .then(destinations => {
        const destinationContainer = document.getElementById('destination-container');

        destinations.forEach(destination => {
          const destinationCard = createDestinationCard(destination);
          destinationContainer.appendChild(destinationCard);
        });
      })
      .catch(error => {
        console.error('Error fetching destinations:', error);
      });
  });

  let travelDestinationsArray = [];

  function fetchDestinations() {
    return fetch('http://127.0.0.1:5500/local_api.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        travelDestinationsArray = data.destinations;
        return travelDestinationsArray;
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }

  function createDestinationCard(destination) {
    const card = document.createElement('div');
    card.classList.add('product-destination-card');

    card.innerHTML = `
        <div class="destination-image">
            <img src="./public/masandaran.jpg" alt="${destination.destination}" />
            <div class="bookmark-icon">
                <img src="./public/494568.png" />
            </div>
        </div>
        <div class="card-description-bar">
            <div class="left-description">
                <h3 class="country-name">${destination.destination}</h3>
                <div class="destination-info">
                    <img class="navigation-icon" src="./public/location-icon.jpg" alt="Navigation Icon">
                    <span class="destination-name">${destination.country}</span>
                </div>
            </div>
            <div class="right-description">
                <div class="rating-container">${destination.rating}&nbsp;</div>
                <span class="days">${destination.days} days</span>
            </div>
        </div>
    `;

    return card;
  }

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