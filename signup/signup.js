document.addEventListener('DOMContentLoaded', () => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    const signUpForm = document.querySelector('.sign-up-container form');
    const signInForm = document.querySelector('.sign-in-container form');

    const handleLoginSubmission = async (event) => {
        event.preventDefault();
    
        const emailInput = document.querySelector('.sign-in-container input[placeholder="Email"]');
        const passwordInput = document.querySelector('.sign-in-container input[placeholder="Password"]');
        const errorMessage = document.getElementById('errorMessage');
    
        const email = emailInput.value;
        const password = passwordInput.value;
    
        const userData = {
            email,
            password
        };
    
        try {
            const response = await fetch('https://jwt-auth2.onrender.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData),
            });
    
            if (response.ok) {
                const { access_token } = await response.json();
                sessionStorage.setItem('token', access_token);
                console.log('Login successful. Token:', access_token);
                errorMessage.textContent = 'Login Successful    ';
            } else {
                const { message } = await response.json();
                console.error('Login failed:', message);
                errorMessage.textContent = 'Invalid credentials';

    
            }
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    const handleSignupSubmission = async (event) => {
        event.preventDefault();

        const email = document.querySelector('.sign-up-container input[placeholder="Email"]').value;
        const password = document.querySelector('.sign-up-container input[placeholder="Password"]').value;

        const userData = {
            email,
            password,
        };

        try {
            const response = await fetch('https://jwt-auth2.onrender.com/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const { access_token } = await response.json();
                sessionStorage.setItem('token', access_token);
                console.log('Signup successful. Token:', access_token);
            } else {
                const { message } = await response.json();
                console.error('Signup failed:', message);
            }
        } catch (error) {
            console.error('Error during signup:', error.message);
        }
    };

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    signInForm.addEventListener('submit', handleLoginSubmission);
    signUpForm.addEventListener('submit', handleSignupSubmission);
});

document.addEventListener('DOMContentLoaded', () => {
    const signUpButton = document.getElementById('signup');
    const signInModal = document.getElementById('signinModal');

    signUpButton.addEventListener('click', () => {
        signInModal.style.display = 'block';
    });
});

// Function to close the modal