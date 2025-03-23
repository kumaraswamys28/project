
// Initialize Ace Editor
const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");
editor.setOptions({
    fontSize: "14px",
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    showPrintMargin: false
});

// Load autocomplete extension for Ace
ace.require("ace/ext/language_tools");

// Sample code snippets
const sampleCode = {
    javascript: `/* jshint esversion: 6 */
function greet(name) {
return "Hello, " + name + "!";
}

const result = greet("World");
console.log(result);`,
    java: `public class Main {
public static void main(String[] args) {
System.out.println("Hello, World!");
}
}`,
    c_cpp: `#include <stdio.h>

int main() {
printf("Hello, World!\\n");
return 0;
}`,
    python: `def greet(name):
return f"Hello, {name}!"

print(greet("World"))`,
    ruby: `def greet(name)
"Hello, #{name}!"
end

puts greet("World")`,
    golang: `package main

import "fmt"

func main() {
fmt.Println("Hello, World!")
}`
};

// Set initial code
editor.setValue(sampleCode.javascript, -1);

// Language switching
const languageButtons = document.querySelectorAll("#language-nav button");
languageButtons.forEach(button => {
    button.addEventListener("click", () => {
        const language = button.getAttribute("data-lang");
        languageButtons.forEach(btn => btn.classList.remove("active", "bg-blue-500", "text-white"));
        button.classList.add("active", "bg-blue-500", "text-white");
        editor.session.setMode(`ace/mode/${language}`);
        editor.setValue(sampleCode[language] || "", -1);
        upres("");
    });
});

// Apply default active class
document.querySelector('[data-lang="javascript"]').classList.add("bg-blue-500", "text-white");

// Elements
const checkButton = document.getElementById("check-button");
const formatButton = document.getElementById("format-button");
const resultsDiv = document.getElementById("results");
const historyDiv = document.getElementById("history");

// Update results function
function upres(message, isError = false, output = null) {
    let resultHTML = `<div class="${isError ? 'text-red-500' : 'text-green-500'}">${message}</div>`;
    
    // If we have output from code execution
    if (output) {
        resultHTML += `
            <div class="mt-4">
                <h3 class="font-medium mb-2">Output:</h3>
                <pre class="bg-gray-800 text-white p-3 rounded-md overflow-x-auto">${escapeHTML(output)}</pre>
            </div>
        `;
    }
    
    resultsDiv.innerHTML = resultHTML;
}

// Map Ace editor language modes to Piston API language names
const plmap = {
"javascript": "javascript",
"java": "java",
"c_cpp": "c",
"python": "python3",
"ruby": "ruby",
"golang": "go"
};

// Updated versions to match what's available on the Piston API
const pistonversMap = {
"javascript": "18.15.0",
"java": "17.0.5",  // Updated Java version
"c_cpp": "10.2.0",
"python": "3.10.0",
"ruby": "3.0.0",   // Updated Ruby version
"golang": "1.16.2" // Updated Go version
};

// Run code using Piston API
async function runpiston(code, language) {
// Update results to show loading state
upres("⏳ Running code...");

// Set up API request parameters
const pistonLang = plmap[language] || language;
const version = pistonversMap[language] || "latest";

try {
console.log(`Executing ${pistonLang} code with version ${version}`);

// Make API request to Piston
const response = await fetch("https://emkc.org/api/v2/piston/execute", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        language: pistonLang,
        version: version,
        files: [{
            name: `main.${getFileExtension(language)}`,
            content: code
        }]
    })
});

// Log the response for debugging
console.log("API Response status:", response.status);

if (!response.ok) {
    // Try to get more detailed error info if available
    try {
        const errorData = await response.json();
        console.error("API error details:", errorData);
        throw new Error(`API request failed: ${errorData.message || response.status}`);
    } catch (jsonError) {
        throw new Error(`API request failed with status ${response.status}`);
    }
}

const data = await response.json();
console.log("API response data:", data);

// Handle API response
if (data.run) {
    // Check if there's an error in the output
    const isError = data.run.stderr && data.run.stderr.trim() !== "";
    const output = isError ? data.run.stderr : data.run.output;
    
    // Update results with the code execution output
    upres(
        isError ? "❌ Execution error" : "✅ Code executed successfully",
        isError,
        output
    );
    
    // Add to history
    addToHistory(language, code, isError, output);
} else if (data.message) {
    // API returned an error message
    upres(`❌ API Error: ${data.message}`, true);
} else {
    upres("❌ Error: No output from code execution", true);
}
} catch (error) {
console.error("Error executing code:", error);
upres(`❌ Error: ${error.message}`, true);
}
}
async function checkavail() {
try {
const response = await fetch("https://emkc.org/api/v2/piston/runtimes");
if (response.ok) {
    const runtimes = await response.json();
    console.log("Available runtimes:", runtimes);
    
    // Update version maps based on available runtimes
    runtimes.forEach(runtime => {
        // Map Piston language names back to our internal language keys
        const langKey = Object.keys(plmap).find(
            key => plmap[key] === runtime.language
        );
        
        if (langKey) {
            // Update to the latest version available
            pistonversMap[langKey] = runtime.version;
            console.log(`Updated ${langKey} to version ${runtime.version}`);
        }
    });
}
} catch (error) {
console.error("Could not fetch runtime information:", error);
}
}

// Call this function when the page loads
async function runCodeWithFallback(code, language) {
try {
await runpiston(code, language);
} catch (error) {
console.log("Primary API failed, trying fallback...");

// You could implement an alternative way to run the code here
// For example, using a different API or a client-side option

// For demonstration, we'll just show a mock output
const mockOutput = `[Fallback Mode] This is simulated output for ${lnname(language)}`;
upres("⚠️ Using fallback execution mode", false, mockOutput);
addToHistory(language, code, false, mockOutput);
}
}

// Get file extension based on language
function getFileExtension(language) {
    const extensions = {
        "javascript": "js",
        "java": "java",
        "c_cpp": "c",
        "python": "py",
        "ruby": "rb",
        "golang": "go"
    };
    return extensions[language] || language;
}

// Add execution result to history
function addToHistory(language, code, isError, output) {
    const historyItem = document.createElement("div");
    historyItem.className = "mb-4 p-3 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer";
    historyItem.setAttribute("data-language", language);
    
    const now = new Date();
    const dateStr = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
    
    historyItem.innerHTML = `
        <div class="flex justify-between items-start">
            <h3 class="font-medium text-${lncolor(language)}">${lnname(language)}</h3>
            <span class="text-xs text-gray-500">${dateStr}</span>
        </div>
        <pre class="mt-2 text-xs overflow-hidden text-gray-700 h-16"><code>${escapeHTML(code)}</code></pre>
        <div class="mt-2 text-xs ${isError ? 'text-red-500' : 'text-green-600'}">
            ${isError ? 'Error ✗' : 'Success ✓'}
        </div>
    `;
    
    // Store code and output in the history item as data attributes
    historyItem.setAttribute("data-code", code);
    historyItem.setAttribute("data-output", output);
    
    historyItem.addEventListener("click", () => {
        editor.session.setMode(`ace/mode/${language}`);
        editor.setValue(code, -1);
        languageButtons.forEach(btn => {
            btn.classList.remove("active", "bg-blue-500", "text-white");
            if (btn.getAttribute("data-lang") === language) {
                btn.classList.add("active", "bg-blue-500", "text-white");
            }
        });
        
        // Show the saved output when clicking on a history item
        upres(
            isError ? "❌ Execution error" : "✅ Code executed successfully",
            isError,
            output
        );
    });
    
    historyDiv.insertBefore(historyItem, historyDiv.firstChild);
}

// Handle run code button click
checkButton.addEventListener("click", () => {
    const code = editor.getValue();
    const currentMode = editor.session.getMode().$id.split("/").pop();
    
    // Run code using Piston API
    runpiston(code, currentMode);
});

// Format code function
formatButton.addEventListener("click", () => {
    const code = editor.getValue();
    const currentMode = editor.session.getMode().$id.split("/").pop();
    
    try {
        let formattedCode = code;
        let parser;
        
        switch (currentMode) {
            case "javascript":
                parser = "babel";
                break;
            default:
                throw new Error("Formatting is currently supported for JavaScript only");
        }
        
        if (parser) {
            formattedCode = prettier.format(code, {
                parser: parser,
                plugins: prettierPlugins,
                tabWidth: 2
            });
            editor.setValue(formattedCode, -1);
            upres("✅ Code formatted successfully.");
        }
    } catch (e) {
        upres("❌ Error formatting code: " + e.message, true);
    }
});

function lnname(mode) {
    const names = {
        "javascript": "JavaScript",
        "java": "Java",
        "c_cpp": "C",
        "python": "Python",
        "ruby": "Ruby",
        "golang": "Go"
    };
    return names[mode] || mode;
}

function lncolor(mode) {
    const colors = {
        "javascript": "yellow-600",
        "java": "red-600",
        "c_cpp": "purple-600",
        "python": "green-600",
        "ruby": "pink-600",
        "golang": "blue-600"
    };
    return colors[mode] || "gray-600";
}

function escapeHTML(str) {
    if (!str) return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

const style = document.createElement('style');
style.textContent = `
    .container { max-width: 1200px; margin-left: auto; margin-right: auto; }
    .bg-gray-100 { background-color: #f3f4f6; }
    .bg-gray-200 { background-color: #e5e7eb; }
    .bg-gray-800 { background-color: #1f2937; }
    .bg-white { background-color: #ffffff; }
    .bg-blue-500 { background-color: #3b82f6; }
    .bg-green-500 { background-color: #10b981; }
    .bg-green-600 { background-color: #059669; }
    .bg-blue-600 { background-color: #2563eb; }
    .hover\\:bg-blue-600:hover { background-color: #2563eb; }
    .hover\\:bg-green-600:hover { background-color: #059669; }
    .hover\\:bg-gray-200:hover { background-color: #e5e7eb; }
    .text-white { color: #ffffff; }
    .text-green-500 { color: #10b981; }
    .text-green-600 { color: #059669; }
    .text-red-500 { color: #ef4444; }
    .text-blue-600 { color: #2563eb; }
    .text-yellow-600 { color: #d97706; }
    .text-pink-600 { color: #db2777; }
    .text-purple-600 { color: #7c3aed; }
    .text-red-600 { color: #dc2626; }
    .text-gray-500 { color: #6b7280; }
    .text-gray-700 { color: #374151; }
    .font-sans { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
    .font-bold { font-weight: 700; }
    .font-semibold { font-weight: 600; }
    .font-medium { font-weight: 500; }
    .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
    .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
    .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
    .text-xs { font-size: 0.75rem; line-height: 1rem; }
    .p-4 { padding: 1rem; }
    .p-3 { padding: 0.75rem; }
    .p-2 { padding: 0.5rem; }
    .px-4 { padding-left: 1rem; padding-right: 1rem; }
    .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
    .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
    .m-1 { margin: 0.25rem; }
    .mb-4 { margin-bottom: 1rem; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mr-2 { margin-right: 0.5rem; }
    .mt-2 { margin-top: 0.5rem; }
    .mt-4 { margin-top: 1rem; }
    .mb-0 { margin-bottom: 0; }
    .h-6 { height: 1.5rem; }
    .w-6 { width: 1.5rem; }
    .h-96 { height: 24rem; }
    .h-16 { height: 4rem; }
    .min-h-32 { min-height: 8rem; }
    .max-h-64 { max-height: 16rem; }
    .max-h-96 { max-height: 24rem; }
    .overflow-hidden { overflow: hidden; }
    .overflow-x-auto { overflow-x: auto; }
    .overflow-y-auto { overflow-y: auto; }
    .rounded { border-radius: 0.25rem; }
    .rounded-md { border-radius: 0.375rem; }
    .rounded-lg { border-radius: 0.5rem; }
    .shadow-md { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
    .transition-colors { transition-property: background-color, border-color, color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
    .flex { display: flex; }
    .grid { display: grid; }
    .items-center { align-items: center; }
    .items-start { align-items: flex-start; }
    .justify-between { justify-content: space-between; }
    .justify-center { justify-content: center; }
    .flex-col { flex-direction: column; }
    .flex-wrap { flex-wrap: wrap; }
    .space-x-2 > * + * { margin-left: 0.5rem; }
    .cursor-pointer { cursor: pointer; }
    .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
    .gap-4 { gap: 1rem; }
    
    @media (min-width: 768px) {
        .md\\:flex-row { flex-direction: row; }
        .md\\:mb-0 { margin-bottom: 0; }
    }
    
    @media (min-width: 1024px) {
        .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        
        .lg\\:col-span-2 { grid-column: span 2 / span 2; }
    }
    
    pre { white-space: pre-wrap; word-wrap: break-word; }
`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", checkavail);
