let certificationCount = 0;

function addCertification() {
    certificationCount++;
    const container = document.getElementById('certificationsContainer');
    const certDiv = document.createElement('div');
    certDiv.classList.add('p-3');
    certDiv.innerHTML = `
        <h5>Certification ${certificationCount}</h5>
        <label>Certification Name:<span class="text-danger">*</span></label>
        <input type="text" class="form-control" name="name${certificationCount}" required>
        
        <label>Issuer :<span class="text-danger">*</span></label>
        <input type="text" class="form-control" name="issuer${certificationCount}" required>
        
        <label>Date (Ex: March 2024):<span class="text-danger">*</span></label>
        <input type="text" class="form-control" name="date${certificationCount}" required>
    `;
    container.appendChild(certDiv);
}

document.getElementById("certisub").addEventListener("click", function (event) {
    event.preventDefault();
    const certifications = [];
    let isValid = false;
    for (let i = 1; i <= certificationCount; i++) {
        const name = document.querySelector(`[name=name${i}]`).value;
        const issuer = document.querySelector(`[name=issuer${i}]`).value;
        const date = document.querySelector(`[name=date${i}]`).value;

        if (!name || !date) {
            isValid = false;
            alert(`Please fill in all required fields for Certification ${i}`);
            break;
        }
        isValid=true
        
        certifications.push({ name, ...(issuer && { issuer }), date });
    }
    
    if (isValid) {
        alert(`Certificate detials added successfully`);
        localStorage.setItem("certifications", JSON.stringify(certifications));
        document.getElementById('output').textContent = JSON.stringify({ certifications }, null, 2);
    }
});