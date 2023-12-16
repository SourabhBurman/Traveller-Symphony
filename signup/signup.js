// const signUpButton = document.getElementById('signUp');
// const signInButton = document.getElementById('signIn');
// const container = document.getElementById('container');

// signUpButton.addEventListener('click', () => {
// 	container.classList.add("right-panel-active");
// });

// signInButton.addEventListener('click', () => {
// 	container.classList.remove("right-panel-active");
// });

// // client/signup.js

// document.addEventListener('DOMContentLoaded', () => {
//     const signUpForm = document.querySelector('.sign-up-container form');
//     const signInForm = document.querySelector('.sign-in-container form');

//     const handleFormSubmission = async (event, endpoint) => {
//         event.preventDefault();

//         const name = document.querySelector('.sign-up-container input[placeholder="Name"]').value;
//         const emailSignUp = document.querySelector('.sign-up-container input[placeholder="Email"]').value;
//         const passwordSignUp = document.querySelector('.sign-up-container input[placeholder="Password"]').value;

//         const emailSignIn = document.querySelector('.sign-in-container input[placeholder="Email"]').value;
//         const passwordSignIn = document.querySelector('.sign-in-container input[placeholder="Password"]').value;

//         const userData = {
//             name,
//             emailSignUp,
//             passwordSignUp,
//             emailSignIn,
//             passwordSignIn,
//         };

//         try {
//             // const response = await fetch(`http://localhost:3000/${endpoint}`, {
//                 const response = await fetch(`https://657d5ed3853beeefdb9aa132.mockapi.io/users`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(userData),
//             });

//             if (response.ok) {
//                 const { token } = await response.json();
//                 // Store the token securely (e.g., in localStorage or sessionStorage)
//                 sessionStorage.setItem('token', token);
//                 console.log('Token:', token);
//             } else {
//                 const { message } = await response.json();
//                 console.error('Authentication failed:', message);
//             }
//         } catch (error) {
//             console.error('Error during authentication:', error.message);
//         }
//     };

//     signUpForm.addEventListener('submit', event => handleFormSubmission(event, 'signup'));
//     signInForm.addEventListener('submit', event => handleFormSubmission(event, 'login'));
// });







// client/signup.js

document.addEventListener('DOMContentLoaded', () => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    const signUpForm = document.querySelector('.sign-up-container form');
    const signInForm = document.querySelector('.sign-in-container form');

    const handleFormSubmission = async (event, endpoint) => {
        event.preventDefault();

        const name = signUpForm.querySelector('input[placeholder="Name"]').value;
        const emailSignUp = signUpForm.querySelector('input[placeholder="Email"]').value;
        const passwordSignUp = signUpForm.querySelector('input[placeholder="Password"]').value;

        const emailSignIn = signInForm.querySelector('input[placeholder="Email"]').value;
        const passwordSignIn = signInForm.querySelector('input[placeholder="Password"]').value;

        const userData = {
            name,
            emailSignUp,
            passwordSignUp,
            emailSignIn,
            passwordSignIn,
        };

        try {
            const response = await fetch(`https://657d5ed3853beeefdb9aa132.mockapi.io/users/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const { token } = await response.json();
                sessionStorage.setItem('token', token);
                console.log('Token:', token);
            } else {
                const { message } = await response.json();
                console.error('Authentication failed:', message);
            }
        } catch (error) {
            console.error('Error during authentication:', error.message);
        }
    };

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    signUpForm.addEventListener('submit', event => handleFormSubmission(event, 'signup'));
    signInForm.addEventListener('submit', event => handleFormSubmission(event, 'login'));
});
