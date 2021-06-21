// CREATE A LIST 
let todoListDone = [];
const todoListNotDone = [];

let todoList = [...todoListDone, ...todoListNotDone];

let todos = [];

const addButton = document.querySelector(".btn--add");

// newTodo.addEventListener("change", function(event) {
//     console.log(event);
// })

function renderList(list){
    todos.forEach((todo)=>{
        todo.parentNode.removeChild(todo);
    });
    // console.log(todos);
    list.forEach(function(todo){
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
    console.log(newTodo.value);

    todoListNotDone.push(newTodo.value);
    // todoList.push(newTodo.value);
    newTodo.value = "";
    todoList=[...todoListDone, ...todoListNotDone];

    // console.log("todolist :" + todoList);
    // console.log("done:" + todoListDone);
    // console.log("Notdone:" + todoListNotDone);
    
    renderList(todoList);
    // console.log("add  "+todos);
});

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
    
            } 
            if(checkmark.checked == false){
                removeFromList(todoListDone, todoText);
                todoText.classList.remove("crossed");
                todoListNotDone.push(todoText.innerText);
                console.log(todoListNotDone);
            }
            console.log(todoListDone);
        })
    });
}



