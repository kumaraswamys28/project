// Select DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Event listener for adding a task
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");
    li.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", deleteTask);

    li.appendChild(deleteBtn);
    li.addEventListener("click", toggleComplete);

    taskList.appendChild(li);
    saveTask(taskText);

    taskInput.value = "";
}

// Function to mark task as complete/incomplete
function toggleComplete(e) {
    e.target.classList.toggle("completed");
}

// Function to delete a task
function deleteTask(e) {
    const li = e.target.parentElement;
    removeTask(li.textContent.replace("Delete", "").trim());
    taskList.removeChild(li);
}

// Function to save task in local storage
function saveTask(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to remove task from local storage
function removeTask(task) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to get tasks from local storage
function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
}

// Function to load tasks on page load
function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", deleteTask);

        li.appendChild(deleteBtn);
        li.addEventListener("click", toggleComplete);

        taskList.appendChild(li);
    });
}
