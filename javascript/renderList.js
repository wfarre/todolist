export default function renderList(list){
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