const destinationContainer = document.getElementById('destination-container');

function display(cond,val) {
  fetchDestinations(cond,val)
      .then(destinations => {
        destinationContainer.innerHTML="";
        destinations.forEach(destination => {
          const destinationCard = createDestinationCard(destination);
          destinationContainer.appendChild(destinationCard);
        });
      })
      .catch(error => {
        console.error('Error fetching destinations:', error);
      });
}

  

  let travelDestinationsArray = [];

  function fetchDestinations(cond,val) {
    return fetch(`https://traveller-jt36.onrender.com/destinations?${cond}=${val}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        travelDestinationsArray = data;
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
        <div class="destination-image" style="height:70%">
            <img src="${destination.image}" alt="${destination.destination}" />
            <div class="bookmark-icon">
                <img src="./public/494568.png" />
            </div>
        </div>
        <div class="product-card-description-bar">
            <div class="left-description">
                <h3 class="country-name">${destination.destination}</h3>
                <div class="destination-info">
                    <span class="destination-name">${destination.country}</span>
                </div>
            </div>
            <div class="right-description">
                <div class="rating-container">${destination.rating}
                <span class="rating-star active">★</span>
                </div>
                <span class="days">${destination.days} days</span>
            </div>
        </div>
    `;

    card.addEventListener('click', function () {
      navigateToBookings(destination);
    });

  return card;

  }

  function navigateToBookings(destination) {
    const queryString = `?destination=${encodeURIComponent(destination.destination)}&country=${encodeURIComponent(destination.country)}`;
    window.location.href = `booking1.html${queryString}`;
  }


  document.addEventListener('DOMContentLoaded', function () {
    const itemsPerPage = 3; // Adjust as needed
    let currentPage = 1;
  
    const totalPages = Math.ceil(travelDestinationsArray.length / itemsPerPage);
  
    function displayDestinations(page) {
      const startIdx = (page - 1) * itemsPerPage;
      const endIdx = startIdx + itemsPerPage;
      const currentDestinations = travelDestinationsArray.slice(startIdx, endIdx);
  
      destinationContainer.innerHTML = ''; // Clear previous content
  
      currentDestinations.forEach(destination => {
        const destinationCard = createDestinationCard(destination);
        destinationContainer.appendChild(destinationCard);
      });
    }
  
    function updatePaginationButtons() {
      // Update prev and next buttons
      document.getElementById('prev-btn').disabled = currentPage === 1;
      document.getElementById('next-btn').disabled = currentPage === totalPages;
  
      // Update page number buttons
      const pagesContainer = document.getElementById('pages-container');
      pagesContainer.innerHTML = '';
  
      for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.innerText = i;
        pageBtn.addEventListener('click', function () {
          currentPage = i;
          displayDestinations(currentPage);
          updatePaginationButtons();
        });
  
        if (i === currentPage) {
          pageBtn.classList.add('active');
        }
  
        pagesContainer.appendChild(pageBtn);
      }
    }
  
    // Initial display
    displayDestinations(currentPage);
    updatePaginationButtons();
  });



function displayRating(container, value) {
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.className = 'rating-star ' + (i <= value ? 'active' : '');
        star.innerHTML = '&#9733;';
        container.appendChild(star);
    }
}
  let ratingsort = document.getElementById("ratingsort");
let myDropdown = document.getElementById("myDropdown");
let myInput = document.getElementById("myInput");

// 
let filternow = document.getElementById("filternow");
filternow.addEventListener('click',(e)=> {
  console.log(myDropdown.value,myInput.value);
display(myDropdown.value,myInput.value);
})

display();