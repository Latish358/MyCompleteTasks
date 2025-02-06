
// Employee module JavaScript
const employeeIdInput = document.getElementById('employeeId');
const employeeNameInput = document.getElementById('employeeName');
const statusBadge = document.querySelector('.status-badge');
const statusText = document.querySelector('.status-text');
const punchButton = document.getElementById('punchButton');
const timeDisplay = document.querySelector('.time');

let status = 'out';

// Validation for Employee ID (alphanumeric only)
function validateEmployeeId(input) {
    const employeeIdRegex = /^ATS0\d{3}$/;  // ATS followed by 0 and 3 digits
    return employeeIdRegex.test(input);
}

// Validation for Employee Name (only alphabets and spaces)
function validateEmployeeName(input) {
    const alphabetSpaceRegex = /^[a-zA-Z\s]{5,}$/;  // Only alphabets and spaces, at least 5 characters
    return alphabetSpaceRegex.test(input);
}

function updateValidation() {
    const isIdValid = validateEmployeeId(employeeIdInput.value);  // ID must be alphanumeric and at least 7 characters
    const isNameValid = validateEmployeeName(employeeNameInput.value);  // Name must be alphabetic and at least 5 characters
    punchButton.disabled = !(isIdValid && isNameValid);
}

function updateTime() {
    const now = new Date();
    timeDisplay.textContent = now.toLocaleTimeString();
}

function toggleStatus() {
    status = status === 'in' ? 'out' : 'in';
    
    statusBadge.className = `status-badge status-${status}`;
    statusText.textContent = `Punched ${status.charAt(0).toUpperCase() + status.slice(1)}`;
    punchButton.textContent = `Punch ${status === 'in' ? 'Out' : 'In'}`;

    const record = {
        id: employeeIdInput.value,
        name: employeeNameInput.value,
        status: status,
        timestamp: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString()
    };

    const records = JSON.parse(localStorage.getItem('punchRecords') || '[]');
    records.push(record);
    localStorage.setItem('punchRecords', JSON.stringify(records));

    employeeIdInput.disabled = status === 'in';
    employeeNameInput.disabled = status === 'in';
}

employeeIdInput.addEventListener('input', updateValidation);
employeeNameInput.addEventListener('input', updateValidation);
punchButton.addEventListener('click', toggleStatus);

setInterval(updateTime, 1000);
updateTime();


