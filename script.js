// script of message

const messageInput = document.getElementById('messageInput');
const charCount = document.getElementById('charCount');
const progressBar = document.getElementById('progressBar');
const warningMessage = document.getElementById('warningMessage');
const wordCount = document.getElementById('wordCount');
const lineCount = document.getElementById('lineCount');
const remainingCount = document.getElementById('remainingCount');

const maxLength = 200;

messageInput.addEventListener('input', updateStats);
messageInput.addEventListener('keydown', handleKeyDown);

function updateStats() {
    const text = messageInput.value;
    const currentLength = text.length;
    const remaining = maxLength - currentLength;
    const progress = (currentLength / maxLength) * 100;

    // Update character count
    charCount.textContent = `${currentLength}/${maxLength} characters`;

    // Update progress bar
    progressBar.style.width = `${Math.min(progress, 100)}%`;

    // Update remaining count
    remainingCount.textContent = Math.max(remaining, 0);

    // Update word count
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    wordCount.textContent = words;

    // Update line count
    const lines = text === '' ? 1 : text.split('\n').length;
    lineCount.textContent = lines;

    // Handle warning states
    if (currentLength >= maxLength * 0.9) {
        charCount.classList.add('warning');
        progressBar.classList.add('warning');

        if (currentLength >= maxLength) {
            progressBar.classList.remove('warning');
            progressBar.classList.add('danger');
            warningMessage.classList.add('show');
            messageInput.classList.add('warning');
        } else {
            progressBar.classList.remove('danger');
            warningMessage.classList.remove('show');
            messageInput.classList.remove('warning');
        }
    } else {
        charCount.classList.remove('warning');
        progressBar.classList.remove('warning', 'danger');
        warningMessage.classList.remove('show');
        messageInput.classList.remove('warning');
    }

    // Add visual feedback for typing
    messageInput.style.borderColor = currentLength > 0 ? 'rgba(255, 215, 0, 0.6)' : 'rgba(255, 215, 0, 0.3)';
}

function handleKeyDown(e) {
    const currentLength = messageInput.value.length;

    // Prevent typing if at max length (except for backspace, delete, arrow keys, etc.)
    if (currentLength >= maxLength &&
        ![8, 9, 27, 46, 37, 38, 39, 40].includes(e.keyCode) &&
        !e.ctrlKey && !e.metaKey) {
        e.preventDefault();

        // Add shake animation
        messageInput.style.animation = 'none';
        setTimeout(() => {
            messageInput.style.animation = 'shake 0.5s ease-in-out';
        }, 10);
    }
}

// Add typing sound effect (visual feedback)
messageInput.addEventListener('keypress', function () {
    if (this.value.length < maxLength) {
        this.style.transform = 'scale(1.001)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    }
});

updateStats();


// script of student form
        const form = document.getElementById('registrationForm');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const submitBtn = document.getElementById('submitBtn');

        // Validation state
        let isValid = {
            name: false,
            email: false,
            password: false
        };

        // Name validation
        nameInput.addEventListener('input', function() {
            const name = this.value.trim();
            const nameError = document.getElementById('nameError');
            const nameSuccess = document.getElementById('nameSuccess');

            if (name.length === 0) {
                showError(this, nameError, nameSuccess, 'Name is required');
                isValid.name = false;
            } else if (name.length < 2) {
                showError(this, nameError, nameSuccess, 'Name must be at least 2 characters long');
                isValid.name = false;
            } else if (!/^[a-zA-Z\s]+$/.test(name)) {
                showError(this, nameError, nameSuccess, 'Name can only contain letters and spaces');
                isValid.name = false;
            } else {
                showSuccess(this, nameError, nameSuccess, 'Valid name');
                isValid.name = true;
            }
            updateSubmitButton();
        });

        // Email validation
        emailInput.addEventListener('input', function() {
            const email = this.value.trim();
            const emailError = document.getElementById('emailError');
            const emailSuccess = document.getElementById('emailSuccess');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email.length === 0) {
                showError(this, emailError, emailSuccess, 'Email is required');
                isValid.email = false;
            } else if (!emailRegex.test(email)) {
                showError(this, emailError, emailSuccess, 'Please enter a valid email address');
                isValid.email = false;
            } else {
                showSuccess(this, emailError, emailSuccess, 'Valid email address');
                isValid.email = true;
            }
            updateSubmitButton();
        });

        // Password validation
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const passwordError = document.getElementById('passwordError');
            const passwordSuccess = document.getElementById('passwordSuccess');
            const strengthIndicator = document.getElementById('passwordStrength');
            const strengthBar = document.getElementById('passwordStrengthBar');

            if (password.length === 0) {
                showError(this, passwordError, passwordSuccess, 'Password is required');
                strengthIndicator.classList.remove('show');
                isValid.password = false;
            } else {
                strengthIndicator.classList.add('show');
                const strength = checkPasswordStrength(password);
                
                if (strength.score < 3) {
                    showError(this, passwordError, passwordSuccess, strength.message);
                    isValid.password = false;
                } else {
                    showSuccess(this, passwordError, passwordSuccess, 'Strong password');
                    isValid.password = true;
                }

                // Update strength bar
                strengthBar.className = 'password-strength-bar ' + strength.class;
            }
            updateSubmitButton();
        });

        function checkPasswordStrength(password) {
            let score = 0;
            let message = '';
            let className = '';

            if (password.length >= 8) score++;
            if (/[a-z]/.test(password)) score++;
            if (/[A-Z]/.test(password)) score++;
            if (/[0-9]/.test(password)) score++;
            if (/[^A-Za-z0-9]/.test(password)) score++;

            if (score < 3) {
                message = 'Password must be at least 8 characters with uppercase, lowercase, and numbers';
                className = 'strength-weak';
            } else if (score < 4) {
                message = 'Good password - consider adding special characters';
                className = 'strength-medium';
            } else {
                message = 'Strong password';
                className = 'strength-strong';
            }

            return { score, message, class: className };
        }

        function showError(input, errorElement, successElement, message) {
            input.classList.remove('valid');
            input.classList.add('invalid');
            errorElement.textContent = message;
            errorElement.classList.add('show');
            successElement.classList.remove('show');
        }

        function showSuccess(input, errorElement, successElement, message) {
            input.classList.remove('invalid');
            input.classList.add('valid');
            successElement.textContent = message;
            successElement.classList.add('show');
            errorElement.classList.remove('show');
        }

        function updateSubmitButton() {
            const allValid = isValid.name && isValid.email && isValid.password;
            submitBtn.disabled = !allValid;
        }

        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (isValid.name && isValid.email && isValid.password) {
                // Simulate successful registration
                submitBtn.textContent = 'Registering...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Registration successful! Welcome aboard!');
                    form.reset();
                    
                    // Reset validation state
                    Object.keys(isValid).forEach(key => {
                        isValid[key] = false;
                    });
                    
                    // Reset input classes and messages
                    document.querySelectorAll('.form-input').forEach(input => {
                        input.classList.remove('valid', 'invalid');
                    });
                    
                    document.querySelectorAll('.error-message, .success-message').forEach(msg => {
                        msg.classList.remove('show');
                    });
                    
                    document.getElementById('passwordStrength').classList.remove('show');
                    
                    submitBtn.textContent = 'Submit';
                    updateSubmitButton();
                }, 2000);
            }
        });

        // Real-time validation on blur
        [nameInput, emailInput, passwordInput].forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.classList.remove('valid', 'invalid');
                }
            });
        });

