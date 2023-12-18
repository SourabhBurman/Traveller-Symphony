let inputAddress1 = document.getElementById("inputAddress1");
let inputAddress2 = document.getElementById("inputAddress2");
let inputEmail4 = document.getElementById("inputEmail4");
let inputDate = document.getElementById("inputDate");
let inputPrice = document.getElementById("inputPrice");
let inputPhone = document.getElementById("inputPhone");
let booknowbutton = document.getElementById("booknowbutton");
let popupbox = document.getElementById("popupbox");
let sname = document.getElementById("sname");
let sfrom = document.getElementById("sfrom");
let sto = document.getElementById("sto");
let sdate = document.getElementById("sdate");
let sprice = document.getElementById("sprice");
let closeit = document.getElementById("closeit");
booknowbutton.addEventListener('click',(e)=> {
    console.log("ok");
   sname.textContent = inputAddress1.value;
   sfrom.textContent = inputAddress2.value;
   sto.textContent = inputEmail4.value;
   sdate.textContent = inputDate.value;
   sprice.textContent = getRandomInt(1000,1500);
   if(inputAddress1.value) {
    setTimeout(()=> {
        popupbox.style.visibility="visible";
        fetchrequest();
    },1000)
   } else {
alert("please enter required fields")
   }
    
})
function fetchrequest() {
    fetch("https://traveller-jt36.onrender.com/bookings",{
        method:"POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({
           username : inputAddress1.value,
           from : inputAddress2.value,
           to : inputEmail4.value,
           date : inputDate.value,
           price : getRandomInt(1000,1500)
        })
    })
}
closeit.addEventListener('click',(e)=> {
    popupbox.style.visibility = "hidden"
})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

//   document.addEventListener('DOMContentLoaded', function () {
//     const urlParams = new URLSearchParams(window.location.search);
//     const destinationName = urlParams.get('destination');
//     const destinationCountry = urlParams.get('country');

//     document.getElementById('inputEmail4').value = destinationName;
// });

document.addEventListener("DOMContentLoaded", function () {
    var bookNowButton = document.getElementById("booknowbutton");

    bookNowButton.addEventListener("click", function (event) {
        event.preventDefault();

        var token = sessionStorage.getItem("token"); 

        if (token) {
            // If a token is present, allow the form submission
            document.forms[0].submit();
        } else {
            // If no token, redirect to the sign-in page
            window.location.href = "/signup/sign-in.html";
        }
    });
});


let populardestinations = document.getElementById("popularDestinations");


document.addEventListener('DOMContentLoaded', function () {
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
  });

  let travelDestinationsArray = [];

  function fetchDestinations() {
    return fetch('https://traveller-jt36.onrender.com/destinations?_limit=8')
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
        inputEmail4.value = destination.destination;
    });

  return card;

  }
