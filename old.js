const addButton = document.getElementById("add");
const taskInput = document.getElementById("add-element");
const bigParent = document.getElementById("big-contain");
const searchTagButton = document.getElementById("search");
let taskContainer = [];

addButton.addEventListener("click", callAdd);

function callAdd() {
    var taskText = taskInput.innerText;
    if (taskText.length > 0) {
        const tag = prompt("Entrez une catégorie pour votre tâche");
        taskInput.value = "";

        while (tag === null || tag === "") {
            alert("Veuillez entrer une catégorie");
            tag = prompt("Entrez une catégorie pour votre tâche");
        }

        addNewElement(taskText, tag);
    } else {
        alert("Veuillez saisir une tâche");
    }
}

function addNewElement(taskDescription, tag) {
    bigParent.className = "big-container";

    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    todoItem.id = "todoItem";

    const toDoElement = document.createElement("div");
    toDoElement.classList.add("to-do-element");
    toDoElement.id = "toBedone";

    const task = document.createElement("p");
    task.innerText = taskDescription;
    task.id = "task";

    const checkDelete = document.createElement("div");
    checkDelete.classList.add("check-delete");

    const deleteButton = document.createElement("button");
    deleteButton.id = "delete";

    deleteButton.addEventListener("click", () => {
        deleteTodoItem(todoItem);
        
    });

    const doneButton = document.createElement("button");
    doneButton.innerText = "Terminé";

    doneButton.addEventListener("click", () => {
        task.style.textDecoration = "line-through";
        task.style.color = "rgb(161, 161, 161)";
        doneButton.style.backgroundColor = "rgba(255,60,60,0.84)";
        doneButton.style.color = "black";
        toDoElement.style.backgroundColor = "rgb(179,255,181)";
        storeInLocalStorage();
    });

    checkDelete.appendChild(deleteButton);
    checkDelete.appendChild(doneButton);

    toDoElement.appendChild(task);
    toDoElement.appendChild(checkDelete);

    todoItem.appendChild(toDoElement);
    bigParent.appendChild(todoItem);

    taskContainer.push(createObject(taskDescription, tag));
    storeInLocalStorage();
}

function deleteTodoItem(toRemove) {
    const parentSuppression = toRemove.parentNode;
    const taskIndex = Array.from(parentSuppression.children).indexOf(toRemove.innerText);
    taskContainer.splice(taskIndex, 1);
    parentSuppression.removeChild(toRemove);
    removeFromLocalStorage();
}

function createObject(taskDescription, taskTag) {
    return {
        taskDescription: taskDescription,
        tag: taskTag,
    };
}

function storeInLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(taskContainer));
    localStorage.setItem("structure", bigParent.innerHTML);
}

function removeFromLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(taskContainer));
    localStorage.setItem("structure", bigParent.innerHTML);
}

function restoreFromLocalStorage() {
    const saved = localStorage.getItem("todoList");
    const structure = localStorage.getItem("structure");

    if (saved) {
        taskContainer = JSON.parse(saved);
        bigParent.innerHTML = structure;
    }
}

// function filterTasks() {
//     const tagToSearch = prompt("Entrez une catégorie à rechercher");

//     if (tagToSearch && tagToSearch.length > 0) {
//         const foundTasks = searchByTag(tagToSearch);
//         displayFilteredTasks(foundTasks);
//     }
// }

// function displayFilteredTasks(filteredTasks) {
//     bigParent.innerHTML = "";
//     filteredTasks.forEach((task) => {
//         alert(task.taskDescription);
//     });
// }

function searchByTag(tag) {
    var tasks = JSON.parse(localStorage.getItem('todoList')) || [];
    var filteredTasks = tasks.filter(function (task) {
        return task.tag === tag;
    });

    return filteredTasks;
}

document.addEventListener("DOMContentLoaded", () => {
    restoreFromLocalStorage();
});

bigParent.addEventListener("click", (e) => {
    const targetButton = e.target;

    if (targetButton.tagName === "BUTTON" && targetButton.id === "delete") {
        const todoItemToDelete = targetButton.closest(".todo-item");
        deleteTodoItem(todoItemToDelete);
        removeFromLocalStorage();
    }

    if (targetButton.tagName === "BUTTON" && targetButton.id === "add") {
        callAdd();
    }

    if (targetButton.tagName === "BUTTON" && targetButton.id === "search") {
        searchBydescription();
    }
});

taskInput.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        if (taskInput.value.length > 0) {
            const tag = prompt("Entrez une catégorie pour votre tâche");
            addNewElement(taskInput.value, tag);
            taskInput.value = "";
        } else {
            alert("Veuillez entrer une tâche");
        }
    }
});
