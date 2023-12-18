// Get references to DOM elements
const inputAddress1 = document.getElementById("inputAddress1");
const inputAddress2 = document.getElementById("inputAddress2");
const inputEmail4 = document.getElementById("inputEmail4");
const inputDate = document.getElementById("inputDate");
const inputPrice = document.getElementById("inputPrice");
const inputPhone = document.getElementById("inputPhone");
const booknowbutton = document.getElementById("booknowbutton");
const popupbox = document.getElementById("popupbox");
const sname = document.getElementById("sname");
const sfrom = document.getElementById("sfrom");
const sto = document.getElementById("sto");
const sdate = document.getElementById("sdate");
const sprice = document.getElementById("sprice");
const closeit = document.getElementById("closeit");
const populardestinations = document.getElementById("popularDestinations");

// Event listener for 'Book Now' button click
booknowbutton.addEventListener('click', (e) => {
    if (inputAddress1.value) {
        sname.textContent = inputAddress1.value;
        sfrom.textContent = inputAddress2.value;
        sto.textContent = inputEmail4.value;
        sdate.textContent = inputDate.value;
        sprice.textContent = getRandomInt(1000, 1500);

        // Show popup box
        setTimeout(()=> {
          popupbox.style.visibility = "visible";
        },1500)
       
        
        // Send booking request
        fetchRequest();
        e.preventDefault();
    } else {
        alert("Please enter required fields");
    }
});

// Event listener for closing the popup
closeit.addEventListener('click', () => {
    popupbox.style.visibility = "hidden";
});

// Fetch destinations on DOM content load
document.addEventListener('DOMContentLoaded', () => {

    fetchDestinations()
        .then(destinations => {
            destinations.forEach(destination => {
                const destinationCard = createDestinationCard(destination);
                populardestinations.appendChild(destinationCard);
            });
        })
        .catch(error => {
            console.error('Error fetching destinations:', error);
        });

        const urlParams = new URLSearchParams(window.location.search);
    const destinationName = urlParams.get('destination');
    const destinationCountry = urlParams.get('country');

    document.getElementById('inputEmail4').value = destinationName;
});

// Function to fetch destinations
function fetchDestinations() {
    return fetch('https://traveller-jt36.onrender.com/destinations?_limit=8')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

// Function to create destination card
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

    // Event listener for destination card click
    card.addEventListener('click', () => {
        inputEmail4.value = destination.destination;
    });

    return card;
}

// Function to send booking request
function fetchRequest() {
    fetch("https://traveller-jt36.onrender.com/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: inputAddress1.value,
            from: inputAddress2.value,
            to: inputEmail4.value,
            date: inputDate.value,
            price: getRandomInt(1000, 1500)
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Handle the response, if needed
        return response.json();  // Assuming the response is in JSON format
    })
    .catch(error => {
        console.error('Error during fetchRequest:', error);
    });
}

// Function to generate random integer
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



// 

// document.addEventListener('DOMContentLoaded', function () {
//     const urlParams = new URLSearchParams(window.location.search);
//     const destinationName = urlParams.get('destination');
//     const destinationCountry = urlParams.get('country');

//     document.getElementById('inputEmail4').value = destinationName;
// });