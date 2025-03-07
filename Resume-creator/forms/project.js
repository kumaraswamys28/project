
let projectCount = 0;

function addProject() {
    projectCount++;
    const container = document.getElementById('projectsContainer');
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('p-1');
    projectDiv.innerHTML = `
                <h5>Project ${projectCount}</h5>
                <label>Project Name:<span class="text-danger">*</span></label>
                <input type="text" class="form-control" name="name${projectCount}"required>
                
                <label>Tools (comma-separated):<span class="text-danger">*</span></label>
                <input type="text" class="form-control" name="tools${projectCount}"required>
                
                <label>Duration  (Ex:June 2024 - Aug 2024):<span class="text-danger">*</span></label>
                <input type="text" class="form-control" name="duration${projectCount}"required>

                <label>Url(Ex:https://manojkumbi.github.io/project/):<span class="text-danger">*</span></label>
                <input type="text" class="form-control" name="link${projectCount}"required>
                
                <label>Feature 1:<span class="text-danger">*</span></label>
                <input type="text" class="form-control" name="feature${projectCount}_1"required>
                
                <label>Feature 2:<span class="text-danger">*</span></label>
                <input type="text" class="form-control" name="feature${projectCount}_2"required>
                
                <label>Feature 3:<span class="text-danger">*</span></label>
                <input type="text" class="form-control" name="feature${projectCount}_3"required>
            `;
    container.appendChild(projectDiv);
}
document.getElementById("skillsubmit").addEventListener("click", function (event) {
    event.preventDefault();
    const projects = [];
    let isValid = true;
    // Ensure projectCount is defined
    const projectCount = document.querySelectorAll("[name^=name]").length;

    for (let i = 1; i <= projectCount; i++) {
        const nameElement = document.querySelector(`[name=name${i}]`);
        const toolsElement = document.querySelector(`[name=tools${i}]`);
        const durationElement = document.querySelector(`[name=duration${i}]`);
const linkElement = document.querySelector(`[name=link${i}]`);


        const name = nameElement.value;
const url = linkElement.value;
        const tools = toolsElement.value.split(',').map(tool => tool.trim());
        const duration = durationElement.value;
        if (!name || !tools || !duration) {
            isValid = false;
            alert(`Please fill in all required fields for project ${i}`);
            break;
        }

        const features = [];
        for (let j = 1; j <= 3; j++) {
            const featureElement = document.querySelector(`[name=feature${i}_${j}]`);
            if (featureElement && featureElement.value.trim() !== "") {
                features.push(featureElement.value);
            }
        }

        projects.push({ name, tools, duration, features, url });
    }
    if (isValid) {
        alert(`Project detials added successfully`);
        localStorage.setItem("projects", JSON.stringify(projects));
        document.getElementById('output').textContent = JSON.stringify({ projects }, null, 2);
    }
});
