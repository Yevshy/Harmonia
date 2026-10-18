/* =========================================
   SITE HEADER — мобільне меню
   ========================================= */

(() => {
    const body = document.body;

    const menuToggle = document.querySelector(
        '.site-header__menu-toggle'
    );

    const menu = document.querySelector(
        '.site-mobile-menu'
    );

    const closeButton = document.querySelector(
        '.site-mobile-menu__close'
    );

    const overlay = document.querySelector(
        '.site-header__overlay'
    );

    if (!menuToggle || !menu || !closeButton || !overlay) {
        return;
    }

    let previouslyFocusedElement = null;

    function openMenu() {
        previouslyFocusedElement = document.activeElement;

        body.classList.add('site-menu-open');

        menuToggle.setAttribute('aria-expanded', 'true');
        menu.setAttribute('aria-hidden', 'false');
        menu.inert = false;

        closeButton.focus();
    }

    function closeMenu(restoreFocus = true) {
        body.classList.remove('site-menu-open');

        menuToggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
        menu.inert = true;

        if (
            restoreFocus &&
            previouslyFocusedElement &&
            typeof previouslyFocusedElement.focus === 'function'
        ) {
            previouslyFocusedElement.focus();
        }
    }

    menuToggle.addEventListener('click', () => {
        if (body.classList.contains('site-menu-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    closeButton.addEventListener('click', () => {
        closeMenu();
    });

    overlay.addEventListener('click', () => {
        closeMenu();
    });

    menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            closeMenu(false);
        });
    });

    document.addEventListener('keydown', (event) => {
        if (
            event.key === 'Escape' &&
            body.classList.contains('site-menu-open')
        ) {
            closeMenu();
        }
    });

    /* Якщо вікно розширили до десктопного розміру */
    window.addEventListener('resize', () => {
        if (window.innerWidth > 820) {
            closeMenu(false);
        }
    });
})();