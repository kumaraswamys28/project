// DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskGrid = document.getElementById("taskGrid");

// Event listeners
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", e => {
    if (e.key === "Enter") addTask();
});
document.addEventListener("DOMContentLoaded", loadTasks);

// Functions
function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) {
        alert("Please enter a task!");
        return;
    }
    createTaskCard(taskText);
    saveTask(taskText);
    taskInput.value = "";
}

function createTaskCard(taskText, completed = false) {
    const card = document.createElement("div");
    card.className = "task-card";
    if (completed) card.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", e => {
        removeTask(taskText);
        taskGrid.removeChild(card);
    });

    card.appendChild(span);
    card.appendChild(deleteBtn);
    card.addEventListener("click", e => {
        if (e.target !== deleteBtn) card.classList.toggle("completed");
    });

    taskGrid.appendChild(card);
}

// Local storage functions
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach(task => createTaskCard(task));
}
