document.addEventListener("DOMContentLoaded", function () {
    const stateDistrictData = {
        "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore"],
        "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
        "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"]
    };

    const educationForm = document.getElementById("education-container");
    const addEducationBtn = document.getElementById("add-education");
    const submitBtn = document.getElementById("edusub");

    function validateField(input, errorMsg, regex) {
        let errorSpan = input.parentElement.querySelector(".error-msg");
        if (!regex.test(input.value.trim())) {
            errorSpan.textContent = errorMsg;
            return false;
        } else {
            errorSpan.textContent = "";
            return true;
        }
    }

    function addValidation(form) {
        const institutionInput = form.querySelector(".institution");
        const qualificationInput = form.querySelector(".qualification");
        const CGPAinput = form.querySelector(".CGPA");
        const stateSelect = form.querySelector(".state-select");
        const districtSelect = form.querySelector(".district-select");
        const yearInput = form.querySelector(".year");

        const currentYear = new Date().getFullYear();
        const yearRegex = new RegExp(`^(${currentYear - 50}|${Array.from({length: 52}, (_, i) => currentYear - 50 + i).join("|")})$`);

        const educationFields = [
            { input: institutionInput, errorMsg: "Institution name is required and should not contain numbers.", regex: /^[A-Za-z\s]+$/ },
            { input: qualificationInput, errorMsg: "Qualification is required and should not contain numbers.", regex: /^[A-Za-z\s]+$/ },
            { input: CGPAinput, errorMsg: "Cgpa is required and should contain numbers.", regex: /^(10(\.00?)?|[0-9](\.\d{1,2})?)$/
        },
            { input: stateSelect, errorMsg: "Please select a State.", regex: /^[A-Za-z\s]+$/ },
            { input: districtSelect, errorMsg: "Please select a district.", regex: /.+/ },
            { input: yearInput, errorMsg: `Enter a valid year between ${currentYear - 50} and ${currentYear + 1}.`, regex: yearRegex }
        ];

        educationFields.forEach(field => {
            field.input.addEventListener("blur", function () {
                validateField(field.input, field.errorMsg, field.regex);
            });
        });
    }

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
        let newEducationForm = document.createElement("div");
        newEducationForm.classList.add("education-form");

        newEducationForm.innerHTML = `
        <hr>
        <div class="mb-3">
            <label class="form-label">Institution Name<span class="text-danger">*</span></label>
            <input type="text" class="form-control institution" required>
            <small class="text-danger error-msg"></small>
        </div>
        <div class="mb-3">
            <label class="form-label">Degree / Qualification<span class="text-danger">*</span></label>
            <input type="text" class="form-control qualification" required>
            <small class="text-danger error-msg"></small>
        </div>
        <div class="mb-3">
            <label class="form-label">CGPA:<span class="text-danger">*</span></label>
            <input type="text" class="form-control CGPA" required>
            <small class="text-danger error-msg"></small>
        </div>
        <div class="mb-3">
            <label class="form-label">State<span class="text-danger">*</span></label>
            <select class="form-control state-select" required>
                <option value="">Select State</option>
                ${Object.keys(stateDistrictData).map(state => `<option value="${state}">${state}</option>`).join('')}
            </select>
            <small class="text-danger error-msg"></small>
        </div>
        <div class="mb-3">
            <label class="form-label">District<span class="text-danger">*</span></label>
            <select class="form-control district-select" required>
                <option value="">Select District</option>
            </select>
            <small class="text-danger error-msg"></small>
        </div>
        <div class="mb-3">
            <label class="form-label">Year of Passing<span class="text-danger">*</span></label>
            <input type="text" class="form-control year" required pattern="\\d{4}">
            <small class="text-danger error-msg"></small>
        </div>
        <button class="btn btn-danger remove-education">Remove</button>
        `;

        educationForm.appendChild(newEducationForm);
        initializeStateListeners(newEducationForm);
        addValidation(newEducationForm);

        newEducationForm.querySelector(".remove-education").addEventListener("click", function () {
            newEducationForm.remove();
        });
    }

    addEducationBtn.addEventListener("click", addEducationForm);

    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();
        let educationForms = document.querySelectorAll(".education-form");
        let educationData = [];
        let allValid = true;
        let isValid = false;

        educationForms.forEach(function (form) {
            let qualification = form.querySelector(".qualification");
            let institution = form.querySelector(".institution");
            let cgpa = form.querySelector(".CGPA");
            let state = form.querySelector(".state-select");
            let district = form.querySelector(".district-select");
            let year = form.querySelector(".year");

            const currentYear = new Date().getFullYear();
            const yearRegex = new RegExp(`^(${currentYear - 50}|${Array.from({length: 52}, (_, i) => currentYear - 50 + i).join("|")})$`);

            let validationRules = [
                { input: institution, errorMsg: "Institution name is required and should not contain numbers.", regex: /^[A-Za-z\s]+$/ },
                { input: qualification, errorMsg: "Qualification is required and should not contain numbers.", regex: /^[A-Za-z\s]+$/ },
                { input: cgpa, errorMsg: "Cgpa is required and should contain numbers.", regex: /^(10(\.00?)?|[0-9](\.\d{1,2})?)$/
        },
                { input: state, errorMsg: "Please select a State.", regex: /^[A-Za-z\s]+$/ },
                { input: district, errorMsg: "Please select a district.", regex: /.+/ },
                { input: year, errorMsg: `Enter a valid year between ${currentYear - 50} and ${currentYear + 1}.`, regex: yearRegex }
            ];

            let formValid = true;
            validationRules.forEach(field => {
                if (!validateField(field.input, field.errorMsg, field.regex)) {
                    formValid = false;
                }
            });

            if (!formValid) {
                allValid = false;
            } else {
                isValid=true;
                educationData.push({
                    institution: institution.value,
                    qualification: qualification.value,
                    cgpa: cgpa.value,
                    state: state.value,
                    district: district.value,
                    year: year.value
                });
            }
        });

        if (isValid && allValid) {
            alert("education details submitted successfully!");
            localStorage.setItem("education", JSON.stringify(educationData));
            document.getElementById("json").innerHTML = `<pre>${JSON.stringify(educationData, null, 2)}</pre>`;
        }
    });

    document.querySelectorAll(".education-form").forEach(initializeStateListeners);
});
