// Function to validate text fields
function validateTextField(value) {
    return /^[A-Za-z\s]{5,}$/.test(value);
}

// Function to validate address fields (allows numbers, spaces, commas, periods, and hyphens)
function validateAddressField(value) {
    return /^[A-Za-z0-9\s,.-]{5,}$/.test(value);
}

// Function to validate if at least one education entry exists and is valid
function validateEducation() {
    const educationEntries = document.querySelectorAll('.education-entry');
    if (educationEntries.length === 0) {
        return false;
    }
    
    // Validate each education entry
    let isValid = true;
    educationEntries.forEach(entry => {
        const requiredFields = entry.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
    });
    return isValid;
}

// Function to validate if at least one employment entry exists and is valid
function validateEmployment() {
    const employmentEntries = document.querySelectorAll('.employment-entry');
    if (employmentEntries.length === 0) {
        return false;
    }
    
    // Validate each employment entry
    let isValid = true;
    employmentEntries.forEach(entry => {
        const requiredFields = entry.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
    });
    return isValid;
}

function addEducation() {
    const container = document.getElementById('educationContainer');
    const educationEntry = document.createElement('div');
    educationEntry.className = 'education-entry';
    educationEntry.innerHTML = `
        <div class="form-grid">
            <div class="form-group">
                <label class="required">Education Level</label>
                <select name="education[][level]" required>
                    <option value="">Select Level</option>
                    <option value="High School">High School</option>
                    <option value="Bachelor's">Bachelor's</option>
                    <option value="Master's">Master's</option>
                    <option value="Doctorate">Doctorate</option>
                </select>
            </div>
            <div class="form-group">
                <label class="required">Stream/Specialization</label>
                <input type="text" name="education[][stream]" required pattern="^[A-Za-z\s]{5,}$">
                <div class="invalid-feedback">Please enter at least 5 alphabetical characters</div>
            </div>
            <div class="form-group">
                <label class="required">Institution</label>
                <input type="text" name="education[][institution]" required pattern="^[A-Za-z\s]{5,}$">
                <div class="invalid-feedback">Please enter at least 5 alphabetical characters</div>
            </div>
            <div class="form-group">
                <label class="required">Year of Completion</label>
                <input type="number" name="education[][year]" required min="1900" max="2099">
            </div>
            <div class="form-group">
                <label class="required">Percentage/CGPA</label>
                <input type="number" step="0.01" name="education[][percentage]" required min="0" max="100">
            </div>
            <div class="file-upload">
                <label class="required">Upload Document</label>
                <input type="file" name="panFile" required accept=".pdf,.jpg,.jpeg,.png">
                <div id="Edu" class="uploadEdu"></div>
                <div class="file-requirements">Accepted formats: PDF, JPG, PNG (Max size: 2MB)</div>
            </div>
        </div>
        <button type="button" class="btn-remove" onclick="this.parentElement.remove()">Remove</button>
    `;
    container.appendChild(educationEntry);
    
    // Add validation listeners to new fields
    const newFields = educationEntry.querySelectorAll('input[pattern]');
    newFields.forEach(field => {
        field.addEventListener('input', function() {
            validateField(this);
        });
    });
}

// Set max date for date of birth (20 years ago)
const currentDate = new Date();
const twentyYearsAgo = new Date(currentDate.setFullYear(currentDate.getFullYear() - 20));
const formattedDate = twentyYearsAgo.toISOString().split('T')[0];
document.getElementById('dob').setAttribute('max', formattedDate);

function addEmployment() {
    const container = document.getElementById('employmentContainer');
    const employmentEntry = document.createElement('div');
    employmentEntry.className = 'employment-entry';
    employmentEntry.innerHTML = `
        <div class="form-grid">
            <div class="form-group">
                <label class="required">Company Name</label>
                <input type="text" name="employment[][company]" required pattern="^[A-Za-z\s]{5,}$">
                <div class="invalid-feedback">Please enter at least 5 alphabetical characters</div>
            </div>
            <div class="form-group">
                <label class="required">Designation</label>
                <input type="text" name="employment[][designation]" required pattern="^[A-Za-z\s]{5,}$">
                <div class="invalid-feedback">Please enter at least 5 alphabetical characters</div>
            </div>
            <div class="form-group">
                <label class="required">Employment Type</label>
                <select name="employment[][type]" required>
                    <option value="">Select Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                </select>
            </div>
            <div class="form-group">
                <label class="required">Start Date</label>
                <input type="date" name="employment[][startDate]" required>
            </div>
            <div class="form-group">
                <label>End Date</label>
                <input type="date" name="employment[][endDate]">
            </div>
            <div class="file-upload">
                <label class="required">Upload Document</label>
                <input type="file" name="panFile" required accept=".pdf,.jpg,.jpeg,.png">
                <div id="Emp" class="upload-Emp"></div>
                <div class="file-requirements">Accepted formats: PDF, JPG, PNG (Max size: 2MB)</div>
            </div>
            <div class="form-group"><br><br>
                <label>
                    <input type="checkbox" name="employment[][currentEmployer]">
                    Current Employer
                </label>
            </div>
        </div>
        <button type="button" class="btn-remove" onclick="this.parentElement.remove()">Remove</button>
    `;
    container.appendChild(employmentEntry);
    
    // Add validation listeners to new fields
    const newFields = employmentEntry.querySelectorAll('input[pattern]');
    newFields.forEach(field => {
        field.addEventListener('input', function() {
            validateField(this);
        });
    });
}

// Function to validate fields
function validateField(field) {
    const isValid = field.checkValidity();
    const feedbackElement = field.nextElementSibling;
    if (feedbackElement && feedbackElement.classList.contains('invalid-feedback')) {
        feedbackElement.style.display = isValid ? 'none' : 'block';
    }
    return isValid;
}

// Handle same as current address checkbox
document.getElementById('sameAsCurrentAddress').addEventListener('change', function() {
    const permanentAddressDiv = document.getElementById('permanentAddress');
    const permanentFields = permanentAddressDiv.querySelectorAll('input, textarea');
    
    if (this.checked) {
        permanentAddressDiv.style.display = 'none';
        permanentFields.forEach(field => {
            field.removeAttribute('required');
        });
    } else {
        permanentAddressDiv.style.display = 'block';
        permanentFields.forEach(field => {
            if (field.name !== 'sameAsCurrentAddress') {
                field.setAttribute('required', 'required');
            }
        });
    }
});

// Add validation listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add validation to all fields with pattern attribute
    const patternFields = document.querySelectorAll('input[pattern], textarea[pattern]');
    patternFields.forEach(field => {
        field.addEventListener('input', function() {
            validateField(this);
        });
    });

    // Form submission handler
    document.getElementById('onboardingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all required fields
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        // Validate education section
        if (!validateEducation()) {
            alert('Please add and fill at least one education entry');
            return;
        }

        // Validate employment section
        if (!validateEmployment()) {
            alert('Please add and fill at least one employment entry');
            return;
        }

        if (!isValid) {
            alert('Please fill all required fields correctly');
            return;
        }

        document.getElementById('loading').style.display = 'block';
        document.querySelector('.submit-btn').disabled = true;

        // Process form submission
        const formData = new FormData(this);
        try {
            const employeeData = {
                employeeId: 'EMP' + Date.now(),
                submissionDate: new Date().toISOString(),
                status: 'Pending'
            };

            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                if (!key.includes('[]')) {
                    employeeData[key] = value;
                }
            }

            // Save to localStorage
            const existingEmployees = JSON.parse(localStorage.getItem('hrEmployees')) || [];
            existingEmployees.push(employeeData);
            localStorage.setItem('hrEmployees', JSON.stringify(existingEmployees));
            
            // Show success message
            document.getElementById('successMessage').style.display = 'block';
            
            // Reset form
            this.reset();
            document.getElementById('educationContainer').innerHTML = '';
            document.getElementById('employmentContainer').innerHTML = '';
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                document.getElementById('successMessage').style.display = 'none';
            }, 5000);
        } catch (error) {
            console.error('Error saving employee data:', error);
            alert('Error saving employee data. Please try again.');
        } finally {
            document.getElementById('loading').style.display = 'none';
            document.querySelector('.submit-btn').disabled = false;
        }
    });
});