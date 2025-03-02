const stateDistrictData = {
    "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"]
};

document.addEventListener("DOMContentLoaded", function () {

    const educationForm = document.getElementById("education-container");
const addEducationBtn = document.getElementById("add-education");
const submitBtn = document.getElementById("edusub");

const institutionInput = document.querySelector(".institution");
const qualificationInput = document.querySelector(".qualification");
const stateSelect = document.querySelector(".state-select");
const districtSelect = document.querySelector(".district-select");
const yearInput = document.querySelector(".year");

const educationFields = [
    { input: institutionInput, errorMsg: "Institution name is required not contain numbers.", regex: /^[A-Za-z\s]+$/ },
{ input: qualificationInput, errorMsg: "Qualification is required and should not contain numbers.", regex: /^[A-Za-z\s]+$/ },
{ input: stateSelect, errorMsg: "Please select a State .", regex: /^[A-Za-z\s]+$/ },
{ input: districtSelect, errorMsg: "Please select a district.", regex: /.+/ },
{ input: yearInput, errorMsg: "Enter a valid year within the past 50 years and next year.", 
  regex: new RegExp(`^(?:${new Date().getFullYear() - 50}|${Array.from({length: 52}, (_, i) => new Date().getFullYear() - 50 + i).join("|")})$`) }

];

function validateField(field) {
    let ediv = document.getElementById('error-mssg');
    const { input, regex, errorMsg } = field;
    if (!regex.test(input.value.trim())) {
        ediv.textContent = errorMsg;
        return false;
    } else if (input.classList.contains("year") && !regex.test(input.value)) {
        ediv.textContent = errorMsg;
        return false;
    } else {
        ediv.textContent = "";
        return true;
    }
}

educationFields.forEach(field => {
    field.input.addEventListener("blur", function () {
        validateField(field);
    });
});




    let uniqueIdCounter = 0;

    function initializeStateListeners(form) {
        let stateSelect = form.querySelector(".state-select");
        let districtSelect = form.querySelector(".district-select");

        stateSelect.addEventListener("change", function () {
            let selectedState = this.value;
            districtSelect.innerHTML = `<option value="">Select District</option>`;

            if (selectedState && stateDistrictData[selectedState]) {
                stateDistrictData[selectedState].forEach(district => {
                    let option = document.createElement("option");
                    option.value = district;
                    option.textContent = district;
                    districtSelect.appendChild(option);
                });
            }
        });
    }

    function addEducationForm() {
        let educationContainer = document.getElementById("education-container");
        let newEducationForm = document.createElement("div");
        newEducationForm.classList.add("education-form", "mt-3");

        let uniqueId = `edu-${uniqueIdCounter++}`;

        newEducationForm.innerHTML = `
        <hr>
        
            <div class="mb-3">
                <label class="form-label">Institution Name</label>
                <input type="text" class="form-control institution" required>
                
            </div>
            <div class="mb-3">
                <label class="form-label">Degree / Qualification</label>
                <input type="text" class="form-control qualification" required>
                <small class="text-danger error-msg"></small>
            </div>
            <div class="mb-3">
                <label class="form-label">State</label>
                <select class="form-control state-select" required>
                    <option value="">Select State</option>
                    ${Object.keys(stateDistrictData).map(state => `<option value="${state}">${state}</option>`).join('')}
                </select>
                <small class="text-danger error-msg"></small>
            </div>
            <div class="mb-3">
                <label class="form-label">District</label>
                <select class="form-control district-select" required>
                    <option value="">Select District</option>
                </select>
                <small class="text-danger error-msg"></small>
            </div>
            <div class="mb-3">
                <label class="form-label">Year of Passing</label>
                <input type="text" class="form-control year" required pattern="\\d{4}">
                <small class="text-danger error-msg"></small>
            </div>
            <button class="btn btn-danger remove-education">Remove</button>
        `;

        educationContainer.appendChild(newEducationForm);
        initializeStateListeners(newEducationForm);
        newEducationForm.querySelector(".remove-education").addEventListener("click", function () {
            newEducationForm.remove();
        });
        addValidation(newEducationForm);
    }

    function addValidation(form) {
        const institutionInput = form.querySelector(".institution");
        const qualificationInput = form.querySelector(".qualification");
        const stateSelect = form.querySelector(".state-select");
        const districtSelect = form.querySelector(".district-select");
        const yearInput = form.querySelector(".year");
    
        const educationFields = [
            { input: institutionInput, errorMsg: "Institution name is required and should not contain numbers.", regex: /^[A-Za-z\s]+$/ },
            { input: qualificationInput, errorMsg: "Qualification is required and should not contain numbers.", regex: /^[A-Za-z\s]+$/ },
            { input: stateSelect, errorMsg: "Please select a State.", regex: /^[A-Za-z\s]+$/ },
            { input: districtSelect, errorMsg: "Please select a district.", regex: /.+/ },
            { input: yearInput, errorMsg: "Enter a valid year within the past 50 years and next year.", 
              regex: new RegExp(`^(?:${new Date().getFullYear() - 50}|${Array.from({length: 52}, (_, i) => new Date().getFullYear() - 50 + i).join("|")})$`) }
        ];
    
        function validateField(field) {
            let ediv = document.getElementById('error-mssg');
            const { input, regex, errorMsg } = field;
            if (!regex.test(input.value.trim())) {
                ediv.textContent = errorMsg;
                return false;
            } else if (input.classList.contains("year") && !regex.test(input.value)) {
                ediv.textContent = errorMsg;
                return false;
            } else {
                ediv.textContent = "";
                return true;
            }
        }
    
        educationFields.forEach(field => {
            field.input.addEventListener("blur", function () {
                validateField(field);
            });
        });
    }

    

    document.getElementById("add-education").addEventListener("click", addEducationForm);

    document.getElementById("edusub").addEventListener("click", function (event) {
        event.preventDefault();  // Prevent form submission
        let educationForms = document.querySelectorAll(".education-form");
        let educationData = [];
        let allValid = true;
    
        educationForms.forEach(function (form) {
            let qualification = form.querySelector(".qualification");
            let institution = form.querySelector(".institution");
            let state = form.querySelector(".state-select");
            let district = form.querySelector(".district-select");
            let year = form.querySelector(".year");
    
            let validationRules = [
                { input: institution, errorMsg: "Institution name is required and should not contain numbers.", regex: /^[A-Za-z\s]+$/ },
                { input: qualification, errorMsg: "Qualification is required and should not contain numbers.", regex: /^[A-Za-z\s]+$/ },
                { input: state, errorMsg: "Please select a State.", regex: /^[A-Za-z\s]+$/ },
                { input: district, errorMsg: "Please select a district.", regex: /.+/ },
                { input: year, errorMsg: "Enter a valid year within the past 50 years and next year.", 
                  regex: new RegExp(`^(?:${new Date().getFullYear() - 50}|${Array.from({length: 52}, (_, i) => new Date().getFullYear() - 50 + i).join("|")})$`) }
            ];
    
            let formValid = true;
    
            function validateField(field) {
                let ediv = document.getElementById('error-mssg');
                if (!field.regex.test(field.input.value.trim())) {
                    ediv.textContent = field.errorMsg;
                    formValid = false;
                } else {
                    ediv.textContent = "";
                }
            }
    
            validationRules.forEach(validateField);
    
            if (!formValid) {
                allValid = false;
            } else {
                educationData.push({
                    institution: institution.value,
                    qualification: qualification.value,
                    state: state.value,
                    district: district.value,
                    year: year.value
                });
            }
        });
    
        if (allValid) {
            document.getElementById("json").innerHTML = `<pre>${JSON.stringify(educationData, null, 2)}</pre>`;
        }
    });
     
    document.querySelectorAll(".education-form").forEach(initializeStateListeners);
});
