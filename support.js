// support.js
document.addEventListener('DOMContentLoaded', () => {
    const supportForm = document.querySelector('.supportForm');
    const errorMessageElement = document.getElementById('error-message');

    supportForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        // Check authentication before submitting the form
        const isAuthenticated = await checkAuthentication();

        if (isAuthenticated) {
            // User is authenticated, proceed with form submission
            try {
                const response = await fetch('http://localhost:3000/auth/submit-support-form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ name, phone, message }),
                });

                if (response.ok) {
                    // Form submission successful
                    console.log('Form submitted successfully');
                    // Optionally, redirect the user or show a success message
                } else {
                    // Form submission failed, handle the error
                    const { message } = await response.json();
                    console.error('Form submission failed:', message);
                    errorMessageElement.textContent = message;
                }
            } catch (error) {
                console.error('Error during form submission:', error.message);
                errorMessageElement.textContent = 'Error during form submission';
            }
        } else {
            // User is not authenticated, show an error message or redirect to the login page
            errorMessageElement.textContent = 'Authentication failed. Please log in.';
        }
    });

    async function checkAuthentication() {
        try {
            const response = await fetch('http://localhost:3000/auth/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            return response.ok;
        } catch (error) {
            console.error('Error during authentication check:', error.message);
            return false;
        }
    }
});
