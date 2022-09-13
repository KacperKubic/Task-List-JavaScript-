const taskInput = document.querySelector('.task-input');
const addButton = document.querySelector('.add-task');
const taskList = document.querySelector('.task-list');
var width = document.documentElement.clientWidth;

//This part of code define how many characters user can put in the input based on devide width
window.onload = (event) => {
    if (width <= 500){
        taskInput.setAttribute('maxlength', '30');
    }
    else if (width <= 600){
        taskInput.setAttribute('maxlength', '38');
    }
    else{
        taskInput.setAttribute('maxlenght', '50');
    }
};

document.addEventListener('DOMContentLoaded', getTasks, false);
addButton.addEventListener('click', addTask, false);
taskList.addEventListener('click', delateTask, false);

//Function that create a task 
function addTask(event){
    event.preventDefault(); 

    //Create a task div
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    //Create new list item
    const newTask = document.createElement('li');
    newTask.innerText = taskInput.value;
    newTask.classList.add('task-item');
    taskDiv.appendChild(newTask);

    //Call the function that save a task in local storage
    saveLocalTasks(taskInput.value);

    //Add remove button
    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = "<i class='fas fa-trash'></i>";
    removeBtn.classList.add('removeBtn');
    taskDiv.appendChild(removeBtn);
    taskList.appendChild(taskDiv);

    //Clear task input
    taskInput.value = '';
}

//Remove list item
function delateTask(e){
    const item = e.target;

    const task = item.parentElement;
    task.classList.add('animation');
    task.addEventListener('transitionend', function(){ 
        task.remove();
    });
    
    removeLocalTasks(task);
}

//This function adds a task to local storage
function saveLocalTasks(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){  
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Function that loads and displays tasks from local storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }  

    //Loop through all the tasks and create task item for each of the tasks 
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
    })
}

//Remove items from local storage
function removeLocalTasks(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));  

    const taskIndex = task.children[0].innerText;
    tasks.splice(tasks.indexOf(taskIndex), 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

