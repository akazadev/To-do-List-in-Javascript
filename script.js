const addButton = document.getElementById("add");
const taskInput = document.getElementById("add-element");
const bigParent = document.getElementById("big-contain");
const tag = document.getElementById("tag");
// Fonction qui permet de supprimer un élément de la liste
const deleteTodoItem = (toRemove) => {
    const parentSuppression = toRemove.parentNode;
    parentSuppression.removeChild(toRemove);
};

// Fonction qui permet d'ajouter un élément à la liste
const addNewElement = (userTask) => {
    bigParent.className = "big-container";

    // Création de la div qui contiendra l'élément à ajouter
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    todoItem.id = "todoItem";

    // Création de la div qui contiendra la tâche à effectuer
    const toDoElement = document.createElement("div");
    toDoElement.classList.add("to-do-element");
    toDoElement.id = "toBedone";

    // Création de la tâche à effectuer
    const task = document.createElement("p");
    task.id = "task";
    task.innerText = userTask;

    // Création de la div qui contiendra les boutons de suppression et de validation
    const checkDelete = document.createElement("div");
    checkDelete.classList.add("check-delete");

    // Création des boutons de suppression et de validation
    const deleteButton = document.createElement("button");
    deleteButton.id = "delete";

    const doneButton = document.createElement("button");
    doneButton.id = "done";
    doneButton.innerText = "Done";
    

    // Ajout des boutons à la div checkDelete
    checkDelete.appendChild(deleteButton);
    checkDelete.appendChild(doneButton);

    // Ajout de la tâche à la div toDoElement
    toDoElement.appendChild(task);

    // Ajout de la div checkDelete à la div toDoElement
    toDoElement.appendChild(checkDelete);
    // Ajout de la div toDoElement à la div todoItem
    todoItem.appendChild(toDoElement);

    // Ajout de la div todoItem à la div bigParent
    bigParent.appendChild(todoItem);

    // Ajout d'un écouteur d'évènement au clic sur le bouton "Done" à l'intérieur de la fonction
    doneButton.addEventListener("click", () => {
        task.style.textDecoration = "line-through";
        task.style.color = "rgb(161, 161, 161)";
        doneButton.style.backgroundColor = "rgba(255,60,60,0.84)";
        doneButton.style.color = "black";
        toDoElement.style.backgroundColor = "rgb(179,255,181)";
    });
};

// Ajout d'un évènement au clic sur le bouton "Add"
addButton.addEventListener("click", () => {
    // Si le champ est vide, on affiche une alerte
    if (taskInput.value.length > 0 && tag.value.length > 0) {
        // Sinon, on ajoute l'élément à la liste
        addNewElement(taskInput.value);
        taskInput.value = "";
    
    } else {
        alert("Veuillez remplir tous les champs");
    }
});

// Ajout d'un écouteur d'évènement à la div bigParent
bigParent.addEventListener("click", (e) => {
    const targetButton = e.target;
    if (targetButton.tagName === "BUTTON" && targetButton.id === "delete") {
        const todoItemToDelete = targetButton.closest(".todo-item");
        deleteTodoItem(todoItemToDelete);
    }
    
});


//Entrez les ta^ches avec la touche "Entrée"
taskInput.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        if (taskInput.value.length > 0) {
            addNewElement(taskInput.value);
            taskInput.value = "";
        } else {
            alert("Veuillez entrer une tâche");
        }
    }
});

//store in local storage
const storeInLocalStorage = () => {
    localStorage.setItem("todoList", bigParent.innerHTML);
};

//get from local storage
const getFromLocalStorage = () => {
    const saved = localStorage.getItem("todoList");
    if (saved) {
        bigParent.innerHTML = saved;
    }
};



