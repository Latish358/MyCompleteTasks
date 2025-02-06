
        // Set the min attribute for both the start and end date to tomorrow's date
        document.addEventListener('DOMContentLoaded', function() {
            const startDateInput = document.getElementById('startDate');
            const endDateInput = document.getElementById('endDate');
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1); // Add 1 day to the current date

            // Format the date to YYYY-MM-DD
            const tomorrowDate = tomorrow.toISOString().split('T')[0];

            // Set the min attribute for both start and end date
            startDateInput.min = tomorrowDate;
            endDateInput.min = tomorrowDate;
        });

        document.getElementById('leaveForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('employeeName').value;
            const id = document.getElementById('employeeId').value;
            const type = document.getElementById('leaveType').value;
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value;
            const comments = document.getElementById('comments').value;

            // Validation
            if (name.length < 5 || !/^[A-Za-z\s]+$/.test(name)) {
                alert('Please enter a valid name (minimum 5 characters, letters only)');
                return;
            }

            if (id.length < 5 || !/^ATS0\d{3}$/.test(id)) {
                alert('Please enter a valid employee ID (minimum 5 characters, alphanumeric only)');
                return;
            }

            if (!type) {
                alert('Please select a leave type');
                return;
            }

            if (new Date(startDate) > new Date(endDate)) {
                alert('End date cannot be earlier than start date');
                return;
            }

            if (comments.length < 10) {
                alert('Please provide detailed comments (minimum 10 characters)');
                return;
            }

            // Store in localStorage
            const leaveRequest = {
                id: Date.now(),
                name,
                employeeId: id,
                leaveType: type,
                startDate,
                endDate,
                comments,
                status: 'pending'
            };

            const existingRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
            existingRequests.push(leaveRequest);
            localStorage.setItem('leaveRequests', JSON.stringify(existingRequests));

            // Show success message
            const successMessage = document.getElementById('successMessage');
            successMessage.style.display = 'block';
            successMessage.className = 'success-message animate__animated animate__fadeIn';

            // Reset form
            this.reset();

            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.className = 'success-message animate__animated animate__fadeOut';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 500);
            }, 3000);
        });