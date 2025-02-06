let claims = JSON.parse(localStorage.getItem('claims')) || [];

function validateEmployeeId(employeeId) {
    const pattern = /^ATS0\d{3}$/;
    return pattern.test(employeeId);
}

function submitClaim() {
    const employeeId = document.getElementById('employeeId').value;
    const employeeIdError = document.getElementById('employeeIdError');

    // Validate Employee ID
    if (!validateEmployeeId(employeeId)) {
        employeeIdError.textContent = 'Invalid Employee ID format. Must be ATS0 followed by 3 digits.';
        showNotification('Invalid Employee ID format', 'error');
        return;
    } else {
        employeeIdError.textContent = '';
    }

    const claim = {
        id: Date.now(),
        employeeId: employeeId,
        type: document.getElementById('claimType').value,
        date: document.getElementById('claimDate').value,
        amount: document.getElementById('claimAmount').value,
        description: document.getElementById('claimDescription').value,
        status: 'pending',
        submittedAt: new Date().toISOString()
    };

    if (!claim.date || !claim.amount || !claim.description) {
        showNotification('Please fill all fields', 'error');
        return;
    }

    claims.push(claim);
    localStorage.setItem('claims', JSON.stringify(claims));

    // Reset form
    document.getElementById('employeeId').value = '';
    document.getElementById('claimDate').value = '';
    document.getElementById('claimAmount').value = '';
    document.getElementById('claimDescription').value = '';

    loadEmployeeDashboard();
    showNotification('Claim submitted successfully!', 'success');
}

function clearClaims() {
    const confirmation = confirm("Are you sure you want to clear all claims? This action cannot be undone.");
    if (confirmation) {
        localStorage.removeItem('claims');
        claims = [];
        loadEmployeeDashboard();
        showNotification('All claims have been cleared!', 'success');
    }
}

function loadEmployeeDashboard() {
    const employeeClaimsList = document.getElementById('employeeClaimsList');
    employeeClaimsList.innerHTML = '<h2><i class="fas fa-list"></i> My Claims</h2>';

    // Update statistics
    document.getElementById('employeeClaimCount').textContent = claims.length;
    document.getElementById('employeeApprovedCount').textContent = 
        claims.filter(claim => claim.status === 'approved').length;
    document.getElementById('employeePendingCount').textContent = 
        claims.filter(claim => claim.status === 'pending').length;

    claims.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
        .forEach(claim => {
            const claimCard = document.createElement('div');
            claimCard.className = 'claim-card';
            claimCard.innerHTML = `
                <h3><i class="fas fa-file-alt"></i> ${claim.type.charAt(0).toUpperCase() + claim.type.slice(1)} Claim</h3>
                <p><strong>Employee ID:</strong> ${claim.employeeId}</p>
                <p><strong>Date:</strong> ${new Date(claim.date).toLocaleDateString()}</p>
                <p><strong>Amount:</strong> $${claim.amount}</p>
                <p><strong>Description:</strong> ${claim.description}</p>
                <p><strong>Status:</strong> <span class="status-badge status-${claim.status}">${claim.status.toUpperCase()}</span></p>
            `;
            employeeClaimsList.appendChild(claimCard);
        });
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.background = type === 'success' ? '#4CAF50' : '#f44336';
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Initialize dashboard on load
document.addEventListener('DOMContentLoaded', () => {
    loadEmployeeDashboard();
});