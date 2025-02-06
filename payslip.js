
function searchPayslip() {
    const searchId = document.getElementById('searchEmployeeId').value;
    const payslips = JSON.parse(localStorage.getItem('payslips')) || {};
    const storedPayslips = payslips[searchId];
    const container = document.getElementById('stored-payslips');

    if (!storedPayslips || storedPayslips.length === 0) {
        container.innerHTML = '<div class="payslip"><p style="text-align: center; color: #e53e3e;">No payslips found for this Employee ID.</p></div>';
        container.style.display = 'block';
        return;
    }

    // Display the most recent payslip
    const latestPayslip = storedPayslips[storedPayslips.length - 1];
    container.innerHTML = `
        <div class="payslip">
            <div class="payslip-header">
                <h2>ATS - ASTROLITE TECH SOLUTIONS</h2>
                <div class="payslip-title">
                    <h3>Payslip for ${latestPayslip.month}</h3>
                </div>
            </div>
            <div class="employee-details">
                <div>
                    <div class="detail-row">
                        <span>Employee Name:</span>
                        <span>${latestPayslip.employeeName}</span>
                    </div>
                    <div class="detail-row">
                        <span>Employee ID:</span>
                        <span>${latestPayslip.employeeId}</span>
                    </div>
                </div>
                <div>
                    <div class="detail-row">
                        <span>Designation:</span>
                        <span>${latestPayslip.designation}</span>
                    </div>
                    <div class="detail-row">
                        <span>Pay Period:</span>
                        <span>${latestPayslip.month}</span>
                    </div>
                </div>
            </div>
            <div class="salary-details">
                <div>
                    <h3>Earnings</h3>
                    <div class="detail-row">
                        <span>Basic Salary</span>
                        <span>${latestPayslip.basicSalary}</span>
                    </div>
                    <div class="detail-row">
                        <span>Allowance</span>
                        <span>${latestPayslip.allowance}</span>
                    </div>
                </div>
                <div>
                    <h3>Deductions</h3>
                    <div class="detail-row">
                        <span>Total Deductions</span>
                        <span>${latestPayslip.deductions}</span>
                    </div>
                </div>
            </div>
            <div class="total-row">
                <div class="detail-row" style="border: none;">
                    <span>Net Salary</span>
                    <span>${latestPayslip.netSalary}</span>
                </div>
            </div>
            <div style="text-align: center; margin-top: 1rem;">
                <button onclick="downloadPayslip('${searchId}')">Download Payslip</button>
                <button onclick="viewPayslipHistory('${searchId}')">View History</button>
            </div>
        </div>
    `;
    container.style.display = 'block';
}

function viewPayslipHistory(employeeId) {
    const payslips = JSON.parse(localStorage.getItem('payslips')) || {};
    const storedPayslips = payslips[employeeId];
    const container = document.getElementById('stored-payslips');

    let historyHTML = `
        <div class="payslip">
            <h3 style="text-align: center; margin-bottom: 2rem;">Payslip History</h3>
            <div class="history-section">
    `;

    storedPayslips.reverse().forEach((payslip, index) => {
        historyHTML += `
            <div class="history-card" onclick="displaySelectedPayslip('${employeeId}', ${storedPayslips.length - 1 - index})">
                <div class="detail-row">
                    <span>Pay Period:</span>
                    <span>${payslip.month}</span>
                </div>
                <div class="detail-row">
                    <span>Net Salary:</span>
                    <span>${payslip.netSalary}</span>
                </div>
            </div>
        `;
    });

    historyHTML += `
            </div>
            <button onclick="searchPayslip()" style="width: 100%; margin-top: 1rem;">Back to Current Payslip</button>
        </div>
    `;

    container.innerHTML = historyHTML;
}

function displaySelectedPayslip(employeeId, index) {
    const payslips = JSON.parse(localStorage.getItem('payslips')) || {};
    const selectedPayslip = payslips[employeeId][index];
    const container = document.getElementById('stored-payslips');

    container.innerHTML = `
        <div class="payslip">
            <div class="payslip-header">
                <h2>ATS - ASTROLITE TECH SOLUTIONS</h2>
                <div class="payslip-title">
                    <h3>Payslip for ${selectedPayslip.month}</h3>
                </div>
            </div>
            <!-- Rest of the payslip content similar to searchPayslip() -->
            <div class="employee-details">
                <div>
                    <div class="detail-row">
                        <span>Employee Name:</span>
                        <span>${selectedPayslip.employeeName}</span>
                    </div>
                    <div class="detail-row">
                        <span>Employee ID:</span>
                        <span>${selectedPayslip.employeeId}</span>
                    </div>
                </div>
                <div>
                    <div class="detail-row">
                        <span>Designation:</span>
                        <span>${selectedPayslip.designation}</span>
                    </div>
                    <div class="detail-row">
                        <span>Pay Period:</span>
                        <span>${selectedPayslip.month}</span>
                    </div>
                </div>
            </div>
            <div class="salary-details">
                <div>
                    <h3>Earnings</h3>
                    <div class="detail-row">
                        <span>Basic Salary</span>
                        <span>${selectedPayslip.basicSalary}</span>
                    </div>
                    <div class="detail-row">
                        <span>Allowance</span>
                        <span>${selectedPayslip.allowance}</span>
                    </div>
                </div>
                <div>
                    <h3>Deductions</h3>
                    <div class="detail-row">
                        <span>Total Deductions</span>
                        <span>${selectedPayslip.deductions}</span>
                    </div>
                </div>
            </div>
            <div class="total-row">
                <div class="detail-row" style="border: none;">
                    <span>Net Salary</span>
                    <span>${selectedPayslip.netSalary}</span>
                </div>
            </div>
            <div style="text-align: center; margin-top: 1rem;">
                <button onclick="downloadPayslip('${employeeId}')">Download Payslip</button>
                <button onclick="viewPayslipHistory('${employeeId}')">Back to History</button>
            </div>
        </div>
    `;
}

function downloadPayslip(employeeId) {
    const payslips = JSON.parse(localStorage.getItem('payslips')) || {};
    const payslip = payslips[employeeId][payslips[employeeId].length - 1];
    
    const printContent = `
ATS - ASTROLITE TECH SOLUTIONS
Payslip for ${payslip.month}

Employee Details:
Name: ${payslip.employeeName}
ID: ${payslip.employeeId}
Designation: ${payslip.designation}

Salary Details:
Basic Salary: ${payslip.basicSalary}
Allowance: ${payslip.allowance}
Deductions: ${payslip.deductions}
Net Salary: ${payslip.netSalary}

Generated on: ${new Date(payslip.generatedDate).toLocaleDateString()}
    `;

    const blob = new Blob([printContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Payslip_${payslip.employeeId}_${payslip.month.replace(' ', '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}
