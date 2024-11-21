let isMenuOpen = false;
const menuIcon = document.querySelector(".menu-icon");
const slideMenu = document.querySelector(".slide-menu");

export function toggleMenu() {
    // Seleccionar los elementos necesarios
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
        slideMenu.style.display = "block";
        // Añadir animación de rotación a las barras del menú hamburguesa
        const spans = document.querySelectorAll(".menu-hamburger span");
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
        slideMenu.style.display = "none";
        // Restaurar el menú hamburguesa
        const spans = document.querySelectorAll(".menu-hamburger span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
    }
}
export function menuEvents() {
    // Agregar evento click al icono del menú
    menuIcon.addEventListener("click", toggleMenu);
    
    // Cerrar el menú si se hace click fuera de él
    document.addEventListener("click", (event) => {
    if (
        isMenuOpen &&
        !menuIcon.contains(event.target) &&
        !slideMenu.contains(event.target)
    ) {
        toggleMenu();
    }
    
    // Prevenir que los clicks dentro del menú lo cierren
    slideMenu.addEventListener("click", (event) => {
    event.stopPropagation();
    });
    });

}
