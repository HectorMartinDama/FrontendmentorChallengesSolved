

const menu_btn= document.querySelector(".hamburger");
const menu_mobile= document.querySelector(".mobile-nav");

menu_btn.addEventListener("click", () =>{
    menu_btn.classList.toggle('is-activate');
    menu_mobile.classList.toggle('is-activate');
});