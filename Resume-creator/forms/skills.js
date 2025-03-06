const categoryDropdown = document.getElementById("category");
const subSkillInput = document.getElementById("subSkillInput");
const tagsWrapper = document.querySelector(".tags-wrapper");
const hiddenInput = document.getElementById("skills-hidden");
const resultDiv = document.getElementById("result");
const jsonOutput = document.getElementById("jsonOutput");
let isValid = false;

let skillsData = {}; // Stores the selected skills in JSON format

subSkillInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter" && subSkillInput.value.trim() !== "") {
        event.preventDefault();
        let category = categoryDropdown.value;
        let subSkill = subSkillInput.value.trim();

        if (category || subSkill) {
            isValid = true;

        } 
            if (!skillsData[category]) {
                skillsData[category] = new Set();
            }

            if (!skillsData[category].has(subSkill)) {
                skillsData[category].add(subSkill);
                let tag = document.createElement("div");
                tag.classList.add("tag");
                tag.innerHTML = `${subSkill} (${category}) <span onclick="removeSkill('${category}', '${subSkill}')">×</span>`;
                tagsWrapper.appendChild(tag);
            }
            subSkillInput.value = "";
            updateHiddenInput();
        
    }
});

function removeSkill(category, skill) {
    if (skillsData[category]) {
        skillsData[category].delete(skill);
        if (skillsData[category].size === 0) {
            delete skillsData[category];
        }
    }
    document.querySelectorAll(".tag").forEach(tag => {
        if (tag.innerText.includes(skill) && tag.innerText.includes(category)) {
            tag.remove();
        }
    });
    updateHiddenInput();
}

function updateHiddenInput() {
    let formattedData = {};
    for (let category in skillsData) {
        formattedData[category] = Array.from(skillsData[category]);
    }


    localStorage.setItem("skillsData", JSON.stringify(formattedData));

    hiddenInput.value = JSON.stringify(formattedData);
    resultDiv.textContent = JSON.stringify(formattedData, null, 2);
    jsonOutput.value = JSON.stringify(formattedData, null, 2);
}

function submitSkills() {
    !isValid? alert(`Please fill in all required fields for Skills`) :
        alert("Submitted Skills:\n" + hiddenInput.value)
}