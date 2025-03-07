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
    
</div>
` : `
<div id="test">
    
    <button onclick="printDiv()">Print A4 Div</button>
</div>
        
               
            `
printarea.innerHTML=resume