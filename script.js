// <!-- sourav -->
// let headerBottomSection = document.getElementsByClassName("headerBottomSection")[0];
// let seemorepost = document.getElementById("seemorepost");
// let seebackpost = document.getElementById("seebackpost");
// let movevar = 0;
// seemorepost.addEventListener('click',(e)=> {
//     movevar-=200;
// headerBottomSection.style.transform = `translate(${movevar}px)`;
// })
// seebackpost.addEventListener('click',(e)=> {
//     movevar+=200;
// headerBottomSection.style.transform = `translate(${movevar}px)`;
// })



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
