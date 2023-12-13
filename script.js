// <!-- sourav -->


// <!-- vishnu -->

document.addEventListener("DOMContentLoaded", function () {
    const ratingContainers = document.querySelectorAll('.rating-container');

    ratingContainers.forEach(container => {
        const textContent = container.textContent.trim();
        const ratingValue = parseFloat(textContent);

        if (!isNaN(ratingValue) && ratingValue >= 1 && ratingValue <= 5) {
            displayRating(container, ratingValue);
        } else {
            console.error(`Invalid rating value `);
        }
    });

    function displayRating(container, value) {

        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.className = 'rating-star ' + (i <= value ? 'active' : '');
            star.innerHTML = '&#9733;'; 
            container.appendChild(star);
        }
    }
});



// <!-- yogesh -->


// <!-- utkarsh -->


// <!-- nidhi -->
