const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");



const themeBtns = document.querySelectorAll(".theme-btn");

const theme = document.querySelector("body");
theme.classList.add("theme--dark");

function changeTheme(btn) {
    console.log("change theme");
   
    if(btn === "sun"){
        document.querySelector("body").classList.add("theme--light");
        // document.querySelector(".theme--dark").style.opacity= "1";
        // document.querySelector(".theme--light").style.opacity="1";
        document.querySelector("body").classList.remove("theme--dark");
        
        sun.style.display = "none";
        moon.style.display = "inline";
    } else if(btn === "moon"){
        theme.classList.add("theme--dark");
                document.querySelector(".theme--dark").style.opacity= "1";

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

