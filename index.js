
// DRAG AND DROP 

let draggables = document.querySelectorAll(".todo");
let container = document.querySelector(".todo-list");

document.addEventListener("dragstart", function(event){
    // console.log(event.target);
    dragged = event.target;
    dragged.style.opacity = .5;
    dragged.classList.add("dragging");
});

document.addEventListener("dragend", function(event){
    event.target.style.opacity= "";
    dragged.classList.remove("dragging");

});

container.addEventListener("dragover", function(event){
    // console.log(event);
    event.preventDefault();
    const afterElement = getDragAfterElement(container, event.clientY)
    console.log(afterElement);
    const draggable = document.querySelector(".dragging");

    if(afterElement == null){
        container.appendChild(draggable);
    } else {
        container.insertBefore(draggable, afterElement);
    }
});

function getDragAfterElement(container, y){
    const draggableElements = [...document.querySelectorAll(".todo:not(.dragging)")];

   return draggableElements.reduce(function(closest, child){
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2
        // console.log(offset);
        if(offset < 0 && offset > closest.offset){
            return { offset: offset, element: child};
        } else{
            return closest;
        }

    }, {offset: Number.NEGATIVE_INFINITY}).element
}


// CREATE A LIST 

const todoList = ["hello", "hi"];

const newTodo = document.querySelector(".newTodo");
const addButton = document.querySelector(".btn--add");

// newTodo.addEventListener("change", function(event) {
//     console.log(event);
// })

function renderList(){
    todoList.forEach(function(todo){
    const listItem = document.createElement("LI");
    const divItem = document.createElement("DIV");
    const labelItem = document.createElement("LABEL");
    const inputItem = document.createElement("INPUT");
    const spanItem = document.createElement("SPAN");
    const pItem = document.createElement("P");

    listItem.classList.add("todo");
    spanItem.classList.add("checkmark");
    labelItem.classList.add("container");
    // inputItem.classList.add("hiddencheckmark");

    inputItem.type = "checkbox";
    inputItem.name = "check";

    listItem.draggable = "true";
    
    pItem.innerHTML = todo;
    listItem.classList.add("todo");
    container.appendChild(listItem);
    listItem.appendChild(divItem);
    divItem.appendChild(labelItem);
    labelItem.appendChild(pItem)
    labelItem.appendChild(inputItem);
    labelItem.appendChild(spanItem);

    console.log(todo);
});
};

renderList();


addButton.addEventListener("click", function(event){
    // console.log(event.target.target);
    event.preventDefault();
    // console.log(newTodo.value);
    todoList.push(newTodo.value);
    // console.log(todoList);
    renderList();
   
});





