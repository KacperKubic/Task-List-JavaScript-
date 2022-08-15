const taskInput = document.querySelector('.task-input');
const addButton = document.querySelector('.add-task');
const taskList = document.querySelector('.task-list');
var width = document.documentElement.clientWidth;

window.onload = (event) => {
    if (width <= 500)
    {
        taskInput.setAttribute('maxlength', '30');
    }

    else if (width <= 600)
    {
        taskInput.setAttribute('maxlength', '38');
    }

    else
    {
        taskInput.setAttribute('maxlenght', '50');
    }
};
document.addEventListener('DOMContentLoaded', getTasks, false);
addButton.addEventListener('click', addTask, false);
taskList.addEventListener('click', delateCheck, false);


function addTask(event)
{
    event.preventDefault(); 

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    const newTask = document.createElement('li');
    newTask.innerText = taskInput.value;
    newTask.classList.add('task-item');
    taskDiv.appendChild(newTask);

    saveLocalTasks(taskInput.value);

    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = "<i class='fas fa-trash'></i>";
    removeBtn.classList.add('removeBtn');
    taskDiv.appendChild(removeBtn);

    taskList.appendChild(taskDiv);

    taskInput.value = '';
}

function delateCheck(e)
{
    const item = e.target;

    if(item.classList[0] === 'removeBtn')
    {
        const task = item.parentElement;
        task.classList.add('animation');
        task.addEventListener('transitionend', function(){ 
            task.remove();
        });
        removeLocalTasks(task);
    }


    if(item.classList[0] === 'completedBtn')
    {
        const task = item.parentElement;
        task.classList.toggle('completed');
    }
}

function saveLocalTasks(task)
{
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    } else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks()
{
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    } else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }  

    tasks.forEach(function(task){
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    const newTask = document.createElement('li');
    newTask.innerText = task;
    newTask.classList.add('task-item');
    taskDiv.appendChild(newTask);

    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = "<i class='fas fa-trash'></i>";
    removeBtn.classList.add('removeBtn');
    taskDiv.appendChild(removeBtn);

    taskList.appendChild(taskDiv);

    taskInput.value = '';
    })
}

function removeLocalTasks(task)
{
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    } else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));  

    const taskIndex = task.children[0].innerText;
    tasks.splice(tasks.indexOf(taskIndex), 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

