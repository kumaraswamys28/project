const personnel=``
let user={}

document.addEventListener("DOMContentLoaded", function () {
 
    
    const personnel_form = document.getElementById("personnel-form");

    const firstNamei = document.querySelector(".first-name");
    const lastNamei = document.querySelector(".last-name");
    const emaili = document.getElementById("email");
    const coni = document.getElementById("country-code");
    const phonei = document.getElementById("phone");
    const githubi = document.getElementById("git-url");
    const linkedini = document.getElementById("link-url");
    const websitei = document.getElementById("web-url");
    const careerObjectivei = document.getElementById("career-objective");

    const fields = [
        { input: firstNamei, ediv: document.getElementById("first-name-er"), regex: /^[A-Za-z]+$/, message: "Only letters allowed." },
        { input: lastNamei, ediv: document.getElementById("last-name-er"), regex: /^[A-Za-z]+$/, message: "Only letters allowed." },
        { input: emaili, ediv: document.getElementById("email-er"), regex: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, message: "Enter a valid email." },
        { input: phonei, ediv: document.getElementById("phone-er"), regex: /^\d{8,15}$/, message: "Phone number must be 8 to 15 digits." },
        { input: careerObjectivei, ediv: document.getElementById("career-objective-er"), regex: /.+/, message: "This field is required." }
    ];

    function validateField(field) {
        const { input, ediv, regex, message } = field;
        if (!regex.test(input.value.trim())) {
            ediv.textContent = message;
            return false;
        }
        ediv.textContent = "";
        return true;
    }

    fields.forEach(field => {
        field.input.addEventListener("blur", function () {
            validateField(field);
        });
    });

    personnel_form.addEventListener("submit", function (event) {
        event.preventDefault();

        let isValid = true;
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (isValid) {
            user = {
                firstName: firstNamei.value.trim(),
                lastName: lastNamei.value.trim(),
                email: emaili.value.trim(),
                phone: coni.value + phonei.value.trim(),
                github: githubi.value.trim(),
                linkedin: linkedini.value.trim(),
                website: websitei.value.trim(),
                careerObjective: careerObjectivei.value.trim()
            };
            localStorage.setItem("personnel", JSON.stringify(user));
            
            alert("Form submitted successfully!");
        }
    });
});

