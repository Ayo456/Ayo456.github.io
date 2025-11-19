// ===================================
// Form Validation Script for Contact Form
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        // Form submission handler
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous error messages
            clearErrors();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const contactMethod = document.getElementById('contact-method').value;
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Validate name
            if (name === '') {
                showError('nameError', 'Name is required');
                document.getElementById('name').classList.add('error');
                isValid = false;
            } else if (name.length < 2) {
                showError('nameError', 'Name must be at least 2 characters');
                document.getElementById('name').classList.add('error');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '') {
                showError('emailError', 'Email is required');
                document.getElementById('email').classList.add('error');
                isValid = false;
            } else if (!emailRegex.test(email)) {
                showError('emailError', 'Please enter a valid email address');
                document.getElementById('email').classList.add('error');
                isValid = false;
            }
            
            // Validate phone
            const phoneRegex = /^[\d\s\-\(\)]+$/;
            if (phone === '') {
                showError('phoneError', 'Phone number is required');
                document.getElementById('phone').classList.add('error');
                isValid = false;
            } else if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 10) {
                showError('phoneError', 'Please enter a valid phone number (at least 10 digits)');
                document.getElementById('phone').classList.add('error');
                isValid = false;
            }
            
            // Validate contact method
            if (contactMethod === '') {
                showError('contactMethodError', 'Please select a preferred contact method');
                document.getElementById('contact-method').classList.add('error');
                isValid = false;
            }
            
            // Validate message
            if (message === '') {
                showError('messageError', 'Message is required');
                document.getElementById('message').classList.add('error');
                isValid = false;
            } else if (message.length < 10) {
                showError('messageError', 'Message must be at least 10 characters');
                document.getElementById('message').classList.add('error');
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                showSuccessMessage();
                form.reset();
            }
        });
        
        // Add real-time validation on input
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    this.classList.remove('error');
                    const errorId = this.id + 'Error';
                    const errorElement = document.getElementById(errorId);
                    if (errorElement) {
                        errorElement.textContent = '';
                    }
                }
            });
        });
    }
});

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// Clear all error messages
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
    });
    
    const errorInputs = document.querySelectorAll('.error');
    errorInputs.forEach(input => {
        input.classList.remove('error');
    });
}

// Show success message
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.textContent = 'Thank you for contacting us! Bimpe will respond within 24 hours.';
        successMessage.classList.add('show');
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }
}

// ===================================
// Phone Number Formatting
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = value;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }
            e.target.value = value;
        });
    }
});