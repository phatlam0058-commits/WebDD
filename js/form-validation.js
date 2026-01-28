// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('consultationForm');
    const feedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Prevent the default form submission (refreshing the page)
            e.preventDefault();

            // Get input values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Reset feedback style
            feedback.style.display = 'block';
            feedback.style.padding = '10px';
            feedback.style.marginTop = '15px';
            feedback.style.borderRadius = '5px';

            // Validation Logic
            if (name === "" || email === "" || message === "") {
                showFeedback("Please fill in all required fields.", "error");
                return;
            }

            if (!validateEmail(email)) {
                showFeedback("Please enter a valid email address.", "error");
                return;
            }

            // If validation passes - Simulate Success
            showFeedback("Thank you, " + name + "! Your consultation request has been sent successfully.", "success");
            
            // Clear the form
            contactForm.reset();
        });
    }

    // Helper function to validate email format using Regular Expression
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Helper function to display messages
    function showFeedback(message, type) {
        feedback.innerText = message;
        if (type === "error") {
            feedback.style.backgroundColor = "#f8d7da";
            feedback.style.color = "#721c24";
            feedback.style.border = "1px solid #f5c6cb";
        } else {
            feedback.style.backgroundColor = "#d4edda";
            feedback.style.color = "#155724";
            feedback.style.border = "1px solid #c3e6cb";
        }
    }
});