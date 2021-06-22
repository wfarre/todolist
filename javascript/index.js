
// DRAG AND DROP 

// const { render } = require("sass");

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






const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");



const themeBtns = document.querySelectorAll(".theme-btn");

const theme = document.querySelector("body");
theme.classList.add("theme--dark");

function changeTheme(btn) {
    console.log("change theme");
   
    if(btn === "sun"){
        document.querySelector("body").classList.add("theme--light");
        document.querySelector("body").classList.remove("theme--dark"); 
        sun.style.display = "none";
        moon.style.display = "inline";
    } else if(btn === "moon"){
        theme.classList.add("theme--dark");
        theme.classList.remove("theme--light");
        moon.style.display = "none";
        sun.style.display = "inline";
      
    }
    
}

themeBtns.forEach(themeBtn => {
    themeBtn.addEventListener("click", (event)=>{
        console.log(event.target.classList);
        changeTheme(event.target.classList[1]);
    });
});

