/**
 * nav.js - Menú Hamburguesa Responsivo
 * Compatible con index.html y páginas secundarias en /html/
 */
(function () {
    function initResponsiveNav() {
        const navBar = document.querySelector(".wireframe-nav-bar");
        const navBtn = document.getElementById("navHamburgerBtn");
        const navMenu = document.getElementById("navMenu");

        if (!navBar || !navBtn || !navMenu) return;

        // Toggle estado abierto / cerrado
        function toggleNav(forceState) {
            const willOpen = typeof forceState === "boolean"
                ? forceState
                : !navBar.classList.contains("is-open");

            navBar.classList.toggle("is-open", willOpen);
            navBtn.setAttribute("aria-expanded", String(willOpen));
            navBtn.setAttribute(
                "aria-label",
                willOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"
            );
        }

        // Click en el botón de hamburguesa
        navBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleNav();
        });

        // Cerrar menú al hacer clic fuera del navbar en pantallas móviles/tablet
        document.addEventListener("click", (e) => {
            if (navBar.classList.contains("is-open") && !navBar.contains(e.target)) {
                toggleNav(false);
            }
        });

        // Cerrar con la tecla Escape
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && navBar.classList.contains("is-open")) {
                toggleNav(false);
                navBtn.focus();
            }
        });

        // Cerrar al hacer clic en un enlace de navegación (útil en dispositivos táctiles)
        navMenu.querySelectorAll(".wireframe-nav-link").forEach((link) => {
            link.addEventListener("click", () => {
                if (window.innerWidth <= 1024) {
                    toggleNav(false);
                }
            });
        });

        // Si la pantalla se redimensiona a escritorio (> 1024px), restablecer el estado
        window.addEventListener("resize", () => {
            if (window.innerWidth > 1024 && navBar.classList.contains("is-open")) {
                toggleNav(false);
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initResponsiveNav);
    } else {
        initResponsiveNav();
    }
})();
