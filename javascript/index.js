
// DRAG AND DROP 

// const { render } = require("sass");

function renderList(list){
    todos.forEach((todo)=>{
        todo.parentNode.removeChild(todo);
    });
    // console.log(todos);
    list.forEach(todo => {
    const listItem = document.createElement("LI");
    const divItem = document.createElement("DIV");
    const labelItem = document.createElement("LABEL");
    const inputItem = document.createElement("INPUT");
    const spanItem = document.createElement("SPAN");
    const pItem = document.createElement("P");
    const list = document.querySelector(".todo-list");

    listItem.classList.add("todo");
    spanItem.classList.add("checkmark");
    labelItem.classList.add("container");
    pItem.classList.add("todo-text")
    inputItem.classList.add("hiddencheckmark");

    inputItem.type = "checkbox";
    inputItem.name = "check";

    listItem.draggable = "true";
    
    pItem.innerHTML = todo;
    list.appendChild(listItem);
    listItem.appendChild(divItem);
    divItem.appendChild(labelItem);
    labelItem.appendChild(pItem)
    labelItem.appendChild(inputItem);
    labelItem.appendChild(spanItem);

    // console.log("todo :"+todo);
    
    returnLeftItem(todoListNotDone);

});

todos = document.querySelectorAll(".todo");

todos.forEach(todo => {
    console.log(todo.querySelector(".todo-text").innerText);
    todoListDone.forEach(done => {
        console.log(done);
        
        if(done === todo.querySelector(".todo-text").innerText){
           console.log(todo.querySelector(".hiddencheckmark").checked);
           todo.querySelector(".hiddencheckmark").checked = true;
           todo.querySelector(".todo-text").classList.add("crossed");

        }
    })
    
})

checked();

// console.log(todos);


};

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
    event.preventDefault();
    const afterElement = getDragAfterElement(container, event.clientY)
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




const doneBtns = document.querySelectorAll(".done-btn");

doneBtns.forEach((donebtn)=>{
    donebtn.addEventListener("click", (event)=>{
        const btnTxt = event.target.innerText;
        switch (btnTxt) {
            case "All":
                renderList(todoList);
                break;
                case "Active":
                renderList(todoListNotDone);
                break;
                case "Completed":
                renderList(todoListDone);
                break;
        
            default: btnTxt;
                break;
        }

});
});


const clearBtn = document.querySelector(".clear-btn");

clearBtn.addEventListener("click",(event) => {
    event.preventDefault();
    todoListDone = [];
    todoList = [...todoListDone, ...todoListNotDone];
    renderList(todoList);
});






// CREATE A LIST 
let todoListDone = [];
const todoListNotDone = [];

let todoList = [...todoListDone, ...todoListNotDone];

let todos = [];

const addButton = document.querySelector(".btn--add");

// newTodo.addEventListener("change", function(event) {
//     console.log(event);
// })



renderList(todoList);

function removeFromList(list, arg){
    list.forEach((element,index)=>{
        if(element === arg.innerText){
            list.splice(index, 1);
        } 
    })
}


addButton.addEventListener("click", function(event){
    // console.log(event.target.target);
    event.preventDefault();

    const newTodo = document.querySelector(".newTodo");
    const error = document.querySelector(".error");
    console.log(newTodo.value);
    error.innerText = "";
    console.log("length is " + newTodo.value.length);
    if(newTodo.value.length === 0){
        console.log("what");
        error.innerText = "Please enter a todo Item!"
    } else {
        if(todoList.length === 0){
            todoListNotDone.push(newTodo.value);
                    newTodo.value = "";
                    todoList=[...todoListDone, ...todoListNotDone];
                
                    console.log("todolist :" + todoList);
                    console.log("done:" + todoListDone);
                    console.log("Notdone:" + todoListNotDone);
                    
                    renderList(todoList);
                    // console.log("add  "+todos);
            console.log("pouetd");
        } else{
            console.log("coucou");
            let notExist = 0;
            for(let i = 0; i<todoList.length; i++){
                 
                if(todoList[i] === newTodo.value){
                    console.log(todoList[i]);
                    error.innerText = "The item already exists";
                    notExist = 0;
                    return 0;
                }else{ 
                    notExist = 1;
                }
            }
            if(notExist === 1){
                todoListNotDone.push(newTodo.value);
                newTodo.value = "";
                todoList=[...todoListDone, ...todoListNotDone];
            
                console.log("todolist :" + todoList);
                console.log("done:" + todoListDone);
                console.log("Notdone:" + todoListNotDone);
                
                renderList(todoList);
                return 0;
                // console.log("add  "+todos);
        
            }
            
        }
        
        }

            } 
        
            // });
);

function countItems(list) {
    counter = 0;
    list.forEach(item => {
        counter++;
    });
    return counter;
}

function returnLeftItem(list) {
    countItems(list);
    document.querySelector(".itemLeft").innerHTML = counter;
}

countItems(todoListNotDone);
console.log(counter);

function checked() {
    todos.forEach((todo) => {
        todo.addEventListener("change", (event) => {
            // console.log("hey: "+todo);
            const checkmark = todo.querySelector(".hiddencheckmark");
            const todoText = todo.querySelector(".todo-text");
            console.log(todoText);
           
            if(checkmark.checked == true){
                todoText.classList.add("crossed");
                todoListDone.push(todoText.innerText);
                removeFromList(todoListNotDone, todoText);
                console.log("Not Done:" + todoListNotDone);
                returnLeftItem(todoListNotDone)

    
            } 
            if(checkmark.checked == false){
                removeFromList(todoListDone, todoText);
                todoText.classList.remove("crossed");
                todoListNotDone.push(todoText.innerText);
                console.log(todoListNotDone);
                returnLeftItem(todoListNotDone)

            }
            console.log(todoListDone);
        })
    });
}

