const todoList = [];

function addTask() {
    const input = document.getElementById('todo-input');
    const taskText = input.value.trim();
    
    if (taskText !== '') {
        const newTask = {
            id: Date.now(),
            text: taskText,
            done: false,
        };
        todoList.push(newTask);
        renderTasks(); // Call to render the tasks
        input.value = ''; // Clear the input field
    }
}

function toggleTask(id) {
    const task = todoList.find(task => task.id === id);
    if (task) {
        task.done = !task.done;
        renderTasks();
    }
}

function deleteTask(id) {
    const taskIndex = todoList.findIndex(task => task.id === id);
    if (taskIndex > -1) {
        todoList.splice(taskIndex, 1);
        renderTasks();
    }
}

function renderTasks() {
    const todoListElement = document.getElementById('todo-list');
    todoListElement.innerHTML = '';
    todoList.forEach(task => {
        const listItem = document.createElement('li');
        listItem.className = "todo-item";
        listItem.innerHTML = `<span class=${task.done ? 'done' : ''}>${task.id} - ${task.text}</span>`;
        listItem.onclick = () => toggleTask(task.id);
        listItem.ondblclick = () => deleteTask(task.id);
        todoListElement.appendChild(listItem);
    });
}

if (typeof module !== 'undefined') {
    module.exports = {
        addTask,
        toggleTask,
        deleteTask,
        todoList,
    };
}