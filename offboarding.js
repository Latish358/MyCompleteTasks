document.addEventListener('DOMContentLoaded', function() {
    // Get all necessary DOM elements
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    const form = document.getElementById('offboardingForm');
    const saveProgressBtn = document.getElementById('saveProgress');
    let currentSection = 'personal';
    let uploadedFiles = [];

    // Function to validate email format
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Function to validate date format and range
    function isValidDate(date) {
        const selectedDate = new Date(date);
        const today = new Date();
        return selectedDate >= today;
    }

    // Function to validate alphanumeric (Employee ID)
    function isValidEmpId(empId) {
        return /^ATS0\d{3}$/.test(empId); // Must be alphanumeric and at least 7 characters long
    }

    // Function to validate only alphabeticals (Full Name, Position)
    function isValidAlpha(value) {
        return /^[a-zA-Z\s]+$/.test(value); // Must contain only alphabets and spaces
    }

    // Function to show error message
    function showError(input, message) {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error')) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            input.classList.add('error-input');
        }
    }

    // Function to hide error message
    function hideError(input) {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error')) {
            errorElement.style.display = 'none';
            input.classList.remove('error-input');
        }
    }

    // Function to validate a section
    function validateSection(sectionId) {
        const section = document.getElementById(sectionId);
        const requiredInputs = section.querySelectorAll('[required]');
        let isValid = true;

        requiredInputs.forEach(input => {
            // Basic required field validation
            if (!input.value.trim()) {
                isValid = false;
                showError(input, 'This field is required');
                return;
            }

            // Specific validation for different input types
            switch(input.type) {
                case 'email':
                    if (!isValidEmail(input.value)) {
                        isValid = false;
                        showError(input, 'Please enter a valid email address');
                    }
                    break;

                case 'date':
                    if (!isValidDate(input.value)) {
                        isValid = false;
                        showError(input, 'Last working day must be in the future');
                    }
                    break;

                case 'text':
                case 'textarea':
                    if (input.id === 'fullName' || input.id === 'position') {
                        if (!isValidAlpha(input.value.trim())) {
                            isValid = false;
                            showError(input, 'Only alphabetic characters are allowed');
                        } else if (input.value.trim().length < 5) {
                            isValid = false;
                            showError(input, 'Please enter at least 5 characters');
                        }
                    } else if (input.id === 'empId') {
                        if (!isValidEmpId(input.value.trim())) {
                            isValid = false;
                            showError(input, 'Employee ID must be alphanumeric and at least 7 characters');
                        }
                    } else if (input.value.trim().length < 5) {
                        isValid = false;
                        showError(input, 'Please enter at least 5 characters');
                    }
                    break;

                case 'checkbox':
                    if (!input.checked) {
                        isValid = false;
                        showError(input, 'This confirmation is required');
                    }
                    break;
            }

            if (isValid) {
                hideError(input);
            }
        });

        return isValid;
    }

    // Function to update section status
    function updateSectionStatus(sectionId, status) {
        const section = document.getElementById(sectionId);
        const statusPill = section.querySelector('.status-pill');
        
        statusPill.className = 'status-pill status-' + status;
        statusPill.textContent = status.charAt(0).toUpperCase() + status.slice(1);
    }

    // Navigation handling
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.getAttribute('data-section');
            
            // Validate current section before moving
            if (currentSection && currentSection !== 'confirmation') {
                if (!validateSection(currentSection)) {
                    alert('Please complete all required fields in the current section');
                    return;
                }
                updateSectionStatus(currentSection, 'completed');
            }

            // Update navigation
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Update sections
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });

            currentSection = targetSection;
        });
    });

    // File upload handling
    const fileUpload = document.querySelector('.file-upload');
    
    function handleFiles(files) {
        const fileArray = Array.from(files);
        uploadedFiles = [...uploadedFiles, ...fileArray];
        
        // Update UI to show selected files
        const fileList = uploadedFiles.map(file => 
            `<div class="file-item">
                ${file.name} (${(file.size / 1024).toFixed(2)} KB)
                <button type="button" class="remove-file" data-name="${file.name}">×</button>
            </div>`  
        ).join('');
        
        const uploadArea = fileUpload.querySelector('p');
        uploadArea.innerHTML = fileList || 'Drag and drop files here or click to browse';
        
        // Add click handlers to remove buttons
        document.querySelectorAll('.remove-file').forEach(button => {
            button.onclick = (e) => {
                e.stopPropagation();
                const fileName = button.getAttribute('data-name');
                uploadedFiles = uploadedFiles.filter(f => f.name !== fileName);
                handleFiles(uploadedFiles);
            };
        });
    }

    // Click to upload
    fileUpload.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.accept = '.pdf,.doc,.docx,.txt';
        
        input.onchange = (e) => handleFiles(e.target.files);
        input.click();
    });

    // Drag and drop
    fileUpload.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUpload.classList.add('drag-over');
    });

    fileUpload.addEventListener('dragleave', (e) => {
        e.preventDefault();
        fileUpload.classList.remove('drag-over');
    });

    fileUpload.addEventListener('drop', (e) => {
        e.preventDefault();
        fileUpload.classList.remove('drag-over');
        handleFiles(e.dataTransfer.files);
    });

    // Save progress functionality
    saveProgressBtn.addEventListener('click', () => {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Add file information
        data.uploadedFiles = uploadedFiles.map(file => ({
            name: file.name,
            size: file.size,
            type: file.type
        }));
        
        // Save to localStorage with timestamp
        localStorage.setItem('offboardingProgress', JSON.stringify({
            data: data,
            timestamp: new Date().toISOString()
        }));

        alert('Progress saved successfully!');
    });

    // Load saved progress
    const savedProgress = localStorage.getItem('offboardingProgress');
    if (savedProgress) {
        const { data } = JSON.parse(savedProgress);
        
        // Populate form fields
        Object.entries(data).forEach(([key, value]) => {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) {
                if (input.type === 'checkbox') {
                    input.checked = value === 'on';
                } else {
                    input.value = value;
                }
            }
        });

        // Restore file list if present
        if (data.uploadedFiles) {
            uploadedFiles = data.uploadedFiles;
            handleFiles(uploadedFiles);
        }
    }

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all sections
        const sectionIds = ['personal', 'projects', 'assets', 'documents', 'confirmation'];
        let isValid = true;

        for (const sectionId of sectionIds) {
            if (!validateSection(sectionId)) {
                isValid = false;
                // Switch to the first invalid section
                document.querySelector(`[data-section="${sectionId}"]`).click();
                break;
            }
        }

        if (isValid) {
            try {
                // Collect all form data
                const formData = {
                    fullName: document.getElementById('fullName').value,
                    empId: document.getElementById('empId').value,
                    position: document.getElementById('position').value,
                    lastDay: document.getElementById('lastDay').value,
                    activeProjects: document.getElementById('activeProjects').value,
                    handoverPerson: document.getElementById('handoverPerson').value,
                    repositories: document.getElementById('repositories').value,
                    accessCredentials: document.getElementById('accessCredentials').value,
                    knowledgeBase: document.getElementById('knowledgeBase').value,
                    comments: document.getElementById('comments').value,
                    // Collect checkbox values
                    laptop: document.getElementById('laptop').checked,
                    monitor: document.getElementById('monitor').checked,
                    phone: document.getElementById('phone').checked,
                    accessCard: document.getElementById('accessCard').checked,
                    additionalAssets: document.getElementById('additionalAssets').value,
                    // Add metadata
                    submissionDate: new Date().toISOString(),
                    status: 'Pending',
                    id: 'EMP-' + Date.now() // Unique identifier
                };

                // Get existing submissions or initialize empty array
                let existingSubmissions = JSON.parse(localStorage.getItem('offboardingSubmissions') || '[]');
                
                // Add new submission
                existingSubmissions.push(formData);
                
                // Save back to localStorage
                localStorage.setItem('offboardingSubmissions', JSON.stringify(existingSubmissions));

                alert('Offboarding form submitted successfully! The HR team will review your submission.');
                
                // Reset the form
                form.reset();
                uploadedFiles = [];
                handleFiles([]);
                
                // Return to first section
                document.querySelector('[data-section="personal"]').click();
                
            } catch (error) {
                console.error('Submission error:', error);
                alert('An error occurred while submitting the form. Please try again.');
            }
        }
    });

    // Real-time validation
    form.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('input', () => {
            if (input.hasAttribute('required')) {
                if (!input.value.trim()) {
                    showError(input, 'This field is required');
                } else if (input.value.trim().length < 5 && input.type !== 'date') {
                    showError(input, 'Please enter at least 5 characters');
                } else {
                    hideError(input);
                }
            }
        });
    });
});
