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

  function openHalfWindow() {
    var width = window.innerWidth * 3 / 4;
    var height = window.innerHeight * 3.6 / 4;

    var left = window.screenX + window.innerWidth / 4;
    var top = window.screenY + window.innerHeight / 4;
    
    window.open("/signup/sign-in.html", "halfWindow", "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top);
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
        window.location.href = 'destination.html';
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
fetchTravelDestinations();
async function fetchTravelDestinations() {
   let response = await fetch('https://traveller-jt36.onrender.com/destinations')
   let data = await response.json();
            travelDestinationsArray = data;
           fetchsomecard(travelDestinationsArray);
            // console.log(travelDestinationsArray);
            
}
// <!-- yogesh -->
let caraouselcontainer = document.getElementById("caraouselcontainer");
let caraouselbutton = document.getElementById("caraouselbutton");
// fetchsomecard();

function fetchsomecard(arr) {
    for (let i = 0; i < 20; i++) {
        const element = arr[i];
        console.log(element);
        let cardnew = createDestinationCard(element);
        caraouselcontainer.append(cardnew);
    }
}
let moveitnow=0;
caraouselbutton.addEventListener('click',(e)=> {
    moveitnow-=400;
caraouselcontainer.style.transform = `translate(${moveitnow}px)`;
caraouselcontainer.style.transition = `transform 1s ease-out`
})
function createDestinationCard(destination) {
    const card = document.createElement('div');
    card.classList.add('caraousel-card-only');

    card.innerHTML = `
        <div class="destination-image">
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

    return card;
  }
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