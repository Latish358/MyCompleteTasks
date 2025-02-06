// Store requests in localStorage for demo purposes
let requests = JSON.parse(localStorage.getItem('assetRequests')) || [];

function openRequestForm() {
    document.getElementById('requestModal').style.display = 'block';
}

function closeRequestForm() {
    document.getElementById('requestModal').style.display = 'none';
}

function submitRequest(event) {
    event.preventDefault();

    // Get values from form fields
    const employeeId = document.getElementById('employeeId').value;
    
    // Regular expression for validating Employee ID (exactly 7 alphanumeric characters)
    const idRegex = /^ATS0\d{3}$/;

    // Validate Employee Name (at least 5 characters long)

    // Validate Employee ID (exactly 7 alphanumeric characters)
    if (!idRegex.test(employeeId)) {
        alert("Employee ID must be exactly 7 alphanumeric characters.");
        return;
    }

    // Create the asset request object
    const request = {
        id: Date.now(),
        employeeId: employeeId,
        assetType: document.getElementById('assetType').value,
        reason: document.getElementById('reason').value,
        status: 'pending',
        requestDate: new Date().toISOString(),
    };

    // Add the request to the requests array and store it in localStorage
    requests.push(request);
    localStorage.setItem('assetRequests', JSON.stringify(requests));

    // Reset the form and close the modal
    document.getElementById('assetRequestForm').reset();
    closeRequestForm();

    // Inform the user that the request has been successfully submitted
    alert('Request submitted successfully!');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('requestModal');
    if (event.target === modal) {
        closeRequestForm();
    }
}
