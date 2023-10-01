let tasks = [];

function createTask() {
    const taskName = document.getElementById('taskInput').value;
    if (taskName.trim() === '') {
        alert('Task name cannot be empty!');
        return;
    }

    const task = {
        id: new Date().getTime(),
        name: taskName,
        status: 'open'
    };

    tasks.push(task);
    updateTasks();
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event, status) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('taskId');
    const task = tasks.find(task => task.id == taskId);
    if (task) {
        task.status = status;
        updateTasks();
    }
}

function updateTasks() {
    const openDiv = document.getElementById('open');
    const inProgressDiv = document.getElementById('inProgress');
    const completedDiv = document.getElementById('completed');

    openDiv.innerHTML = '';
    inProgressDiv.innerHTML = '';
    completedDiv.innerHTML = '';

    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.innerText = task.name;
        taskDiv.draggable = true;
        taskDiv.setAttribute('draggable', true);
        taskDiv.setAttribute('ondragstart', 'drag(event)');
        taskDiv.setAttribute('data-task-id', task.id);

        if (task.status === 'open') {
            openDiv.appendChild(taskDiv);
        } else if (task.status === 'inProgress') {
            inProgressDiv.appendChild(taskDiv);
        } else if (task.status === 'completed') {
            completedDiv.appendChild(taskDiv);
        }
    });

   
function drag(event) {
    event.dataTransfer.setData('taskId', event.target.getAttribute('data-task-id'));
}