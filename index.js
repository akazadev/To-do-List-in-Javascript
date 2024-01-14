const conteneur = document.getElementById("big-contain");
const bouttonAjouter = document.getElementById("add");
const bouttonRechercher = document.getElementById("search");
let taskContainer = [];


//Créer un objet tâche
function createObject(taskDescription) {
    return {
        taskDescription: taskDescription,
        done: false,
    };
}

//fonction pour ajouter une tache
const addItem = () => {
    var taskInput = document.getElementById('add-element'); // Assurez-vous que taskInput est correctement défini
    var taskText = taskInput.value;

    if (taskText.length > 0) {
        addNewElement(taskText);
        taskInput.value = ""; 
    } else {
        alert("Veuillez saisir une tâche");
    }
}

// Fonction qui permet de supprimer une tâche
const deleteTodoItem = (toRemove) => {
    const parentSuppression = toRemove.parentNode;
    // Récupérer l'index de l'élément à supprimer
    const taskIndex = Array.from(parentSuppression.children).indexOf(toRemove.innerText);
    // // Supprimer l'élément du tableau taskContainer
    taskContainer.splice(taskIndex, 1);
    // Supprimer l'élément du DOM
    parentSuppression.removeChild(toRemove);
    // Mettre à jour le localStorage
    storeInLocalStorage;
};

//fonction pour créer l'élément sur la page
function addNewElement(taskDescription) {
    //création de la div qui va contenir toutes les tâches
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    todoItem.id = "todoItem";

    //div qui va contenir une et une tâche
    const toDoElement = document.createElement("div");
    toDoElement.classList.add("to-do-element");
    toDoElement.id = "toBedone";

    //div contenant le texte de la tâche
    const task = document.createElement("p");
    task.innerText = taskDescription;
    task.id = "task";

    //div contenant les icônes supprimer et terminé
    const checkDelete = document.createElement("div");
    checkDelete.classList.add("check-delete");

    //boutton Supprimer
    const deleteButton = document.createElement("button");
    deleteButton.id = "delete";

    const doneButton = document.createElement("button");
    doneButton.id = "done"
    doneButton.innerText = "Terminé";

    checkDelete.appendChild(deleteButton);
    checkDelete.appendChild(doneButton);

    toDoElement.appendChild(task);
    toDoElement.appendChild(checkDelete);

    todoItem.appendChild(toDoElement);
    conteneur.appendChild(todoItem);

    taskContainer.push(createObject(taskDescription));
    storeInLocalStorage();
}

//retrouver un objet passé en paramètre et basculer d'un état accompli à un état non fait
function changeState (textInLabel){
    for (let task of taskContainer){
        if (task.taskDescription === textInLabel && task.done === false){
            task.done = true;
        } else 
            if (task.taskDescription === textInLabel && task.done == true){
            task.done = false;
        } 
    }
}

//retrouver une l'obet t^qche qui correspond au texte dans le label
function findTask (textInLabel){
    for(let task of taskContainer){
       if (task.taskDescription === textInLabel){
        return task;
       }
    }
}

//prendre un objet en paramètre et retourner son état
function doneState (objet){
   return objet.done;
}

//fonction de filtre des tâches
function searchByDescription(description) {
    var taskInput = document.getElementById('add-element');
    var taskText = taskInput.value;

    if(taskText.length > 0){
        const theId = document.querySelectorAll("#toBedone")
        for (let i = 0; i < theId.length; i++){
      //  const taskP = taskDiv.children[0];
            const pTag = theId[i].children[0];
            const pTagContainer = pTag.closest("#todoItem");

            if (!pTag.innerHTML.includes(description)){
                pTagContainer.style.display = "none";
            }
        }
    } else resetDisplay();
}


//réafficher l'état initial
function resetDisplay() {
    const theId = document.querySelectorAll("#toBedone")
    for (let i = 0; i < theId.length; i++){
      //  const taskP = taskDiv.children[0];
      const pTag = theId[i].children[0];
      const pTagContainer = pTag.closest("#todoItem");
      pTagContainer.style.display = "block";
    }
}

//ajout d'un écouteur d'évènement à la div big parent pour réagir aux différents clics
conteneur.addEventListener("click", (e) => {
    const targetButton = e.target;

    if (targetButton.tagName === "BUTTON" && targetButton.id === "delete") {
        const todoItemToDelete = targetButton.closest(".todo-item");
        deleteTodoItem(todoItemToDelete);
        storeInLocalStorage();
    }

    if (targetButton.tagName === "BUTTON" && targetButton.id === "add") {
        addItem();
    }

    if (targetButton.tagName === "BUTTON" && targetButton.id === "search") {
        var taskInput = document.getElementById('add-element');
        var taskText = taskInput.value;
        //console.log("cliked");
        searchByDescription(taskText);
    }

    if (targetButton.tagName === "BUTTON" && targetButton.id === "done"){
        
        const taskDiv = targetButton.closest(".todo-item");
        const task = taskDiv.children[0];
        const toDoElement = targetButton.closest("#toBedone");
        let textInLabel = toDoElement.children[0].innerText;

        //console.log(task)
        
        if(doneState(findTask(textInLabel))){
            task.children[0].style.textDecoration = "none";
            task.children[1].children[1].style.backgroundColor = "#DC4C3E";
            task.children[1].children[1].style.color = "white";
            task.style.color = "rgb(0, 0, 0)";
            toDoElement.style.backgroundColor = "rgb(255,255,255)";
            changeState(textInLabel);
        } else {
            changeState(textInLabel);
            task.children[0].style.textDecoration = "line-through";
            task.children[1].children[1].style.backgroundColor = "rgba(27, 6, 184, 0.84)";
            task.children[1].children[1].style.color = "white";
            task.style.color = "rgb(161, 161, 161)";
            toDoElement.style.backgroundColor = "#e9ecf2";
        }
    }
    storeInLocalStorage();
});



//Enrégistrer dans le localstorage
const storeInLocalStorage = () => {
    localStorage.setItem("todoList", JSON.stringify(taskContainer));
    localStorage.setItem("structure", conteneur.innerHTML);
};

// Restaurer depuis le stockage local
const restoreFromLocalStorage = () => {
    const saved = localStorage.getItem("todoList");
    const structure = localStorage.getItem("structure");

    if (saved) {
        taskContainer = JSON.parse(saved);
        conteneur.innerHTML = structure;
    }
};

//récupérer la liste des tâches après réactualisation de la page
document.addEventListener("DOMContentLoaded", () => {
    restoreFromLocalStorage();
});