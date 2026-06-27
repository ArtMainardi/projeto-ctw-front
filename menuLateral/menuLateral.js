const menuLateral = document.getElementById("menu-lateral")
let menuPuxado = false;

function intercalarMenu(){
    menuPuxado = !menuPuxado;

    console.log(menuPuxado);

    const menuItens = [...document.querySelectorAll(".menu-item")];
    const menuTexts = [...document.querySelectorAll(".menu-text")];

    if(menuPuxado){
        menuLateral.style.animationName = "pushMenu";
        menuLateral.style.right = "-300px";
        menuItens.forEach(opt => {
            opt.style.visibility = "visible";
            opt.style.animationName = "popIn";
            opt.style.animationDuration = "1s";
        });
        menuTexts.forEach(opt => {
            opt.style.visibility = "visible";
            opt.style.animationName = "popIn";
            opt.style.animationDuration = "1s";
        }); 
    }else{
        menuLateral.style.animationName = "pullMenu";
        menuLateral.style.right = "-100px";
        menuItens.forEach(opt => {
            opt.style.animationName = "popOut";
            opt.style.animationDuration = "1s";
            opt.style.animationFillMode = "forwards"
        });
        menuTexts.forEach(opt => {
            opt.style.animationName = "popOut";
            opt.style.animationDuration = "1s";
            opt.style.animationFillMode = "forwards"
        });
    }
    menuLateral.style.animationDuration = "1s";
    menuLateral.style.animationFillMode = "forwards";

}