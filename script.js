const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

// Load saved tasks from the browser
let tasks = JSON.parse(localStorage.getItem("studentTasks")) || [];


// Add a new task
taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const taskName = document.getElementById("taskName").value;
    const taskCategory = document.getElementById("taskCategory").value;
    const dueDate = document.getElementById("dueDate").value;

    const task = {
        name: taskName,
        category: taskCategory,
        date: dueDate,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    displayTasks();

    taskForm.reset();
});


// Save tasks to Local Storage
function saveTasks() {
    localStorage.setItem("studentTasks", JSON.stringify(tasks));
}


// Display tasks
function displayTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        taskList.innerHTML =
            '<p id="emptyMessage">No tasks yet. Add your first task!</p>';

    } else {

        tasks.forEach(function(task, index) {

            const taskCard = document.createElement("div");

            taskCard.className = "task-card";

            taskCard.innerHTML = `
                <h3>${task.name}</h3>

                <p>Subject: ${task.category}</p>

                <p>Due Date: ${task.date}</p>

                <p>Status: ${task.completed ? "Completed" : "Pending"}</p>

                <button onclick="completeTask(${index})">
                    ${task.completed ? "Undo" : "Complete"}
                </button>

                <button onclick="deleteTask(${index})">
                    Delete
                </button>
            `;

            taskList.appendChild(taskCard);
        });
    }

    updateCounters();
}


// Complete or undo a task
function completeTask(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    displayTasks();
}


// Delete a task
function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    displayTasks();
}


// Update counters
function updateCounters() {

    const total = tasks.length;

    const completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    const pending = total - completed;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;
}


// Display saved tasks when page opens
displayTasks();