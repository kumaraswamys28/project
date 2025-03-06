const skillsData = JSON.parse(localStorage.getItem("skillsData")) || {};
const certifications = JSON.parse(localStorage.getItem("certifications")) || [];
const education = JSON.parse(localStorage.getItem("education")) || [];
const personnel = JSON.parse(localStorage.getItem("personnel")) || {};
const project = JSON.parse(localStorage.getItem("projects")) || [];



document.getElementById("test").innerHTML =project==[] && education==[] && certifications==[] && personnel=={} && skillsData=={} ? `
<div id="test">
    <ul id="no-data-message">
        <li><span class="emoji">📜</span> Your resume is currently a blank scroll of wisdom...</li>
        <li><span class="emoji">🚀</span> Great things start with zero, but this is a bit too empty!</li>
        <li><span class="emoji">📝</span> Please provide some details so we can craft your masterpiece.</li>
        <li><span class="emoji">💡</span> Even Shakespeare had to start with words!</li>
    </ul>
    <button onclick="printDiv()">Print A4 Div</button>
</div>
` : `<section id="about-me">
    <div class="about-container">
        <h2>About Me</h2>
        <p class="about-container__intro">
            👋 Hi, I'm <strong>${personnel.firstName} ${personnel.lastName}</strong>, a passionate software developer. 
            With expertise in multiple technologies, I strive to build impactful solutions.
        </p>

        <div class="about-container__section">
            <h3>🎯 Career Objective</h3>
            <p class="about-container__text">
                ${personnel.careerObjective}
            </p>
        </div>

        <div class="about-container__section">
            <h3>🚀 Skills & Tools</h3>
            <ul class="about-container__list">
                ${Object.entries(skillsData).map(([domain, skills]) => 
                    `<li>🔧 <strong>${domain}:</strong> ${skills.join(', ')}</li>`
                ).join('')}
            </ul>
        </div>

        <div class="about-container__section">
            <h3>🎓 Education</h3>
            <ul class="about-container__list">
                ${
                    education.map(e => 
                        `<li>🏫 <strong>${e.institution}</strong> (${e.year})<br>
                            📜 ${e.qualification} | CGPA: <strong>${e.cgpa}</strong> <br>
                            📍 ${e.district}, ${e.state}
                        </li>`
                    ).join('')
                }
            </ul>
        </div>

        <div class="about-container__section">
            <h3>💡 Projects</h3>
            <ul class="about-container__list">
                ${project.map(e => `
                    <li>🛠 <strong>${e.name}</strong> (${e.duration})<br>
                        ⚙ Tools: ${e.tools.join(', ')}<br>
                        📌 Features:
                        <ul>${e.features.map(feature => `<li>✅ ${feature}</li>`).join('')}</ul>
                    </li>
                `).join('')}
            </ul>
        </div>

        <div class="about-container__section">
            <h3>🏆 Certifications</h3>
            <ul class="about-container__list">
                ${certifications.map(e => 
                    `<li>📜 <strong>${e.name}</strong> - ${e.issuer}, ${e.date}</li>`
                ).join('')}
            </ul>
        </div>

        <div class="about-container__section">
            <h3>📞 Contact</h3>
            <p>
                📱 <a href="tel:${personnel.phone}">${personnel.phone}</a> <br>
                📧 <a href="mailto:${personnel.email}">${personnel.email}</a> <br>
                🔗 <a href="${personnel.website}" target="_blank">Website</a> | 
                💼 <a href="${personnel.linkedin}" target="_blank">LinkedIn</a> | 
                🖥 <a href="${personnel.github}" target="_blank">GitHub</a>
            </p>
        </div>
    </div>
</section>
`;


const printarea=document.getElementById("printArea")
let resume=`  <header>
                    <h1>${personnel.firstName} ${personnel.lastName}</h1>
                    <p>
                        <a href="tel:${personnel.phone}">${personnel.phone}</a> |
                        <a href="mailto:${personnel.email}">${personnel.email}</a>
                    </p>
                    <p>
                    <a href="${personnel.website}" target="_blank">Website</a> |
                        <a href="${personnel.linkedin}" target="_blank">LinkedIn</a> |
                        <a href="${personnel.gjithub}" target="_blank">GitHub</a>
                    </p>
                </header>
        
                <section class="career-objective">
                    <h6>Career Objective</h6>
                    <p>${personnel.careerObjective}</p>
                </section>
                <br>
                <section class="skills">
                    <h6>Skills & Tools</h6>
                    <ul>
                    ${Object.entries(skillsData).map(([domain, skills]) => 
                        `<li><strong>${domain}:</strong> ${skills.join(', ')}</li>`
                    ).join('')}
                    
                        
                    </ul>
                </section>
        
                <section class="education">
                    <h6>Education</h6>
                    <ul>
                    ${
                        education.map(e => 
                            `<li>
                                <div class="edu-item">
                                    <div class="top-row">
                                        <strong>${e.institution}</strong>
                                        <span class="year">${e.year}</span>
                                    </div>
                                    <div class="bottom-row
                                    "><span>${e.qualification}</span>
                                        <span>CGPA: <strong>${e.cgpa}</strong></span>
                                    </div>
                                    <div class="location">${e.district},${e.state}</div>
                                </div>
                            </li>`
                        ).join('')
                    }
                        
                    </ul>
                </section>
        
                <section class="projects">
                    <h6>Projects</h6>
                    <ul>



                    ${project.map(e => `
                        <li>
                            <div class="project">
                                <div class="top-row">
                                    <strong>${e.name}</strong>
                                    <span class="year">${e.duration}</span>
                                </div>
                                <div class="bottom-row">
                                    <i>Tools: ${e.tools.join(', ')}</i>
                                    <a href="[Project GitHub]">GitHub</a>
                                </div>
                            </div>
                            <ul>
                                ${e.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </li>
                    `).join('')}
                    
                    </ul>
                </section>
        
               <section class="certifications">
    <h6>Certifications</h6>
    <ul>
        ${certifications.map(e => 
            `<li><strong>${e.name}</strong> - ${e.issuer}, ${e.date}</li>`
        ).join('')}
    </ul>
</section>

        
               
            `;
printarea.innerHTML=resume