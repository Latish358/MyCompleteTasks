
// Wait for the DOM to load before adding event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Select the form and attach event listener for login form submission
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form from submitting
        login(); // Call the login function
    });

    // Select the form and attach event listener for signup form submission
    const signupForm = document.getElementById("signupForm");
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form from submitting
        signup(); // Call the signup function
    });

    // Select the form and attach event listener for forgot password form submission
    const forgotPasswordForm = document.getElementById("forgotPasswordForm");
    forgotPasswordForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form from submitting
        resetPassword(); // Call the resetPassword function
    });

    // Password toggle functionality
    const togglePassword = document.getElementById("togglePassword");
    const passwordField = document.getElementById("password");

    // Add click event listener to toggle password visibility
    togglePassword.addEventListener("click", function () {
        if (passwordField.type === "password") {
            passwordField.type = "text";
            this.innerHTML = '<i class="fas fa-eye-slash"></i>';
            setTimeout(function () {
                passwordField.type = "password";
                togglePassword.innerHTML = '<i class="fas fa-eye"></i>';
            }, 1500);
        }
    });

    // Event listener for "Signup" link
    const signupLink = document.getElementById("signupLink");
    signupLink.addEventListener("click", function(event) {
        event.preventDefault();
        showSignupForm();
    });

    // Event listener for "Login" link in signup form
    const loginLink = document.getElementById("loginLink");
    loginLink.addEventListener("click", function(event) {
        event.preventDefault();
        showLoginForm();
    });

    // Event listener for "Forgot Password" link
    const forgotPasswordLink = document.getElementById("forgotPasswordLink");
    forgotPasswordLink.addEventListener("click", function(event) {
        event.preventDefault();
        showForgotPasswordForm();
    });

    // Event listener for "Back to Login" link in forgot password form
    const backToLoginFromForgot = document.getElementById("backToLoginFromForgot");
    backToLoginFromForgot.addEventListener("click", function(event) {
        event.preventDefault();
        showLoginForm();
    });
});

// Function to display login form
function showLoginForm() {
    document.getElementById("formContent").style.display = "block";
    document.getElementById("signupFormContent").style.display = "none";
    document.getElementById("forgotPasswordFormContent").style.display = "none";
}

// Function to display signup form
function showSignupForm() {
    document.getElementById("formContent").style.display = "none";
    document.getElementById("signupFormContent").style.display = "block";
    document.getElementById("forgotPasswordFormContent").style.display = "none";
}

// Function to display forgot password form
function showForgotPasswordForm() {
    document.getElementById("formContent").style.display = "none";
    document.getElementById("signupFormContent").style.display = "none";
    document.getElementById("forgotPasswordFormContent").style.display = "block";
}

function login() {
    const loginId = document.getElementById("loginId").value;
    const password = document.getElementById("password").value;

    if (loginId && password) {
        if (loginId.includes(' ') || password.includes(' ')) {
            alert("Login ID and Password cannot contain spaces.");
        } else {
            localStorage.setItem('username', loginId);
            window.location.href = '2.html'; 
        }
    } else {
        alert("Please enter both Login ID and Password.");
    }
}

function signup() {
    const username = document.getElementById("signupUsername").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (username && email && password && confirmPassword) {
        if (password === confirmPassword) {
            alert("Signup successful!");
            // Redirect or perform further actions after successful signup
        } else {
            alert("Passwords do not match.");
        }
    } else {
        alert("Please fill in all fields.");
    }
}

function resetPassword() {
    const email = document.getElementById("forgotEmail").value;
    const newPassword = document.getElementById("forgotPassword").value;
    const confirmPassword = document.getElementById("confirmForgotPassword").value;

    if (email && newPassword && confirmPassword) {
        if (newPassword === confirmPassword) {
            alert("Password reset successful!");
            // Redirect or perform further actions after password reset
        } else {
            alert("Passwords do not match.");
        }
    } else {
        alert("Please fill in all fields.");
    }
}
