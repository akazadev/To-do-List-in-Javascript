const addButton = document.getElementById("add");
const taskInput = document.getElementById("add-element");
const taskInputText =  taskInput.value;
const bigParent = document.getElementById("big-contain");
const searchTagButton = document.getElementById("search");
var taskText;
let taskContainer = [];

var storedTask = JSON.parse(localStorage.getItem('todoList'));



// Ajout d'un évènement au clic sur le bouton "Add"

//(on ajoute un écouteur d'évènement au bouton ajouter pour qu'il puisse créer les objets de tâche dès qu'on lui clique dessus)
addButton.addEventListener("click", callAdd);

function callAdd() {
    var taskInput = document.getElementById('add-element'); // Assurez-vous que taskInput est correctement défini
    var taskText = taskInput.value;

    if (taskText.length > 0) {
        // Sinon, on ajoute l'élément à la liste
        const tag = prompt("Entrez une catégorie pour votre tâche");

        if (tag === null || tag === "") {
            alert("Veuillez entrer une catégorie");
            return;
        }

        addNewElement(taskText, tag); // Assurez-vous que addNewElement est correctement défini
        taskText = ""; // Affectez la valeur à taskText au lieu de task
        // afficherContenuTaskContainer(); // Décommentez si nécessaire
    } else {
        alert("Veuillez saisir une tâche");
    }
}


// Fonction pour créer un objet
    //cette fonction prends en paramètre la description du task et le tag qui lui est associé et crée un objet
function createObject(taskDescription, taskTag) {

    taskDescription = taskInput.value;
    return{
        taskDescription: taskDescription,
        tag: taskTag,
    }
}


searchTagButton.addEventListener("click", ()=>{
    if (taskInput.value.length > 0){
        const found = searchByTag(taskInput.value);
        for (let i = 0; i < found.length; i++) {
            console.log(found[i].taskDescription);
            // taskText.innerText = found[i].taskDescription;
        }
    }
});

// Fonction qui permet de supprimer un élément de la liste
const deleteTodoItem = (toRemove) => {
    const parentSuppression = toRemove.parentNode;
    const taskIndex = Array.from(parentSuppression.children).indexOf(toRemove);

    // Supprimer l'élément du tableau taskContainer
    taskContainer.splice(taskIndex, 1);

    // Supprimer l'élément du DOM
    parentSuppression.removeChild(toRemove);

    // Mettre à jour le localStorage
    storeInLocalStorage();
};

// Fonction qui permet d'ajouter un élément à la liste cet élément prends en paramètres le texte de la tâche entrée par l'utilisateur et en fonction de ces deux paramètres un objet taskObject sera créé
const addNewElement = (taskDescription, tag) => {
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
    task.innerText = taskDescription;

    // Création de la div qui contiendra les boutons de suppression et de validation
    const checkDelete = document.createElement("div");
    checkDelete.classList.add("check-delete");

    // Création des boutons de suppression et de validation
    const deleteButton = document.createElement("button");
    deleteButton.id = "delete";

    deleteButton.addEventListener("click", () => {
        deleteTodoItem(todoItem);
    });

    const doneButton = document.createElement("button");
    doneButton.id = "done";
    doneButton.innerText = "Done";


    //ici on crée une div doneTasks qui va récupérer les tâches
    const doneTasks = document.createElement("div");
    doneTasks.id = "doneTasks";


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
        storeInLocalStorage();
    });

    // Ajout de l'objet à taskContainer
    taskContainer.push(createObject(taskInput.value, tag));
    taskInput.value = "";
    //donc ici on appelle la fonction store in localStorage pour sauvegarder le tout nouvel élément que l'on vient de créer
    storeInLocalStorage();
};


//ajouter un écouteur d'évènement à la div bigParent notamment la div qui contient la tâche pour écouter le clic du boutton delete qui permet de supprimer une tâche 
bigParent.addEventListener("click", (e) => {
    const targetButton = e.target;
    //on récupère le target du clic et on vérifie que c'est bien un boutton. Ensuite si ce boutton a un id qui se nomme delete alors on supprime la div concernée
    if (targetButton.tagName === "BUTTON" && targetButton.id === "delete") {
        const todoItemToDelete = targetButton.closest(".todo-item");
        deleteTodoItem(todoItemToDelete);
        
    }

    //on récupère le target du clic et on vérifie que c'est bien un boutton. Ensuite si ce boutton a un id qui se nomme add alors on appelle la fonction addNewElement
    if (targetButton.tagName === "BUTTON" && targetButton.id === "add") {
        callAdd();
    }
   
});

//Ici le code qui suit permet d'ajouter une tâche rien qu'en appuyant sur la touche entrée

// Entrez les tâches avec la touche "Entrée"
taskInput.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        if (taskInput.value.length > 0) {
            // Demander la catégorie de la tâche
            const tag = prompt("Entrez une catégorie pour votre tâche");
            addNewElement(taskInput.value, tag);
            taskInput.value = "";
        } else {
            alert("Veuillez entrer une tâche");
        }
    }
});


// Stocker dans le stockage local
//cette fonction stocke le contenu de bigParent dans une variable qui se nomme todoList
const storeInLocalStorage = () => {
    localStorage.setItem("todoList", JSON.stringify(taskContainer));
    localStorage.setItem("structure", bigParent.innerHTML);
};

// Restaurer depuis le stockage local
const restoreFromLocalStorage = () => {
    const saved = localStorage.getItem("todoList");
    const structure = localStorage.getItem("structure");

    if (saved) {
        taskContainer = JSON.parse(saved);
        bigParent.innerHTML = structure;
    }
    
};
// Appeler la fonction pour restaurer depuis le stockage local
console.log(storedTask);
//implémenter un fonction qui va permettre de rechercher par tag une tâche donnée
function searchByTag(tag) {
    // Récupérer les tâches depuis le localStorage
    //On récupère les taches depuis le localStorage et on le stocke dans une variable locale qui se nomme tasks
    var tasks = JSON.parse(localStorage.getItem('todoList')) || [];

    // Filtrer les tâches par le tag spécifique
    //On stocke dans une variable tachesFiltrees l'ensemble des taches correspondants que tag entré
        var tachesFiltrees = tasks.filter(
            //On crée une fonction qui va prendre en paramètre une tache nommée task et va comparer son tag par rapport au tag entré et ensuite va retourner toutes les tâches qui 
            function(task) {
            return task.tag === tag;
        });

    return tachesFiltrees;
}

// Exemple d'utilisation de la fonction de recherche par tag
var tachesTravail = searchByTag('Travail');
console.log(tachesTravail);

// Nouvelle fonction pour supprimer du localStorage
const removeFromLocalStorage = () => {
    localStorage.setItem("todoList", JSON.stringify(taskContainer));
    localStorage.setItem("structure", bigParent.innerHTML);
};


document.addEventListener("DOMContentLoaded", () => {
    restoreFromLocalStorage();
});