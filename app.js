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
/* ===========================================================
   CONTACT MODAL
=========================================================== */

(() => {
    const modal = document.getElementById('contactModal');
    const title = document.getElementById('contactModalTitle');
    const form = document.getElementById('contactForm');
    const formContent = document.getElementById('contactFormContent');
    const success = document.getElementById('contactSuccess');
    const error = document.getElementById('contactFormError');
    const submitButton = form?.querySelector('[type="submit"]');

    if (!modal || !form || !title || !formContent || !success) return;

    let previousFocus = null;

    function openModal(buttonTitle) {
        previousFocus = document.activeElement;
        title.textContent = buttonTitle;

        form.reset();
        error.textContent = '';
        formContent.hidden = false;
        success.hidden = true;
        submitButton.disabled = false;
        submitButton.textContent = 'Надіслати';

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('contact-modal-open');

        modal.querySelector('#contactName').focus();
    }

    function closeModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('contact-modal-open');

        if (previousFocus) previousFocus.focus();
    }

    document.querySelectorAll('[data-contact-trigger]').forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            openModal(button.dataset.contactTrigger);
        });
    });

    modal.querySelectorAll('[data-modal-close]').forEach(button => {
        button.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && modal.classList.contains('is-open')) {
            closeModal();
        }
    });

    form.addEventListener('submit', async event => {
        event.preventDefault();
        error.textContent = '';

        if (!form.reportValidity()) return;

        submitButton.disabled = true;
        submitButton.textContent = 'Надсилаємо...';

        const formData = {
            name: form.elements.name.value.trim(),
            phone: form.elements.phone.value.trim(),
            subject: title.textContent
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Не вдалося надіслати запит.');
            }

            formContent.hidden = true;
            success.hidden = false;

        } catch (err) {
            error.textContent = 'Не вдалося надіслати запит. Спробуйте ще раз або зв’яжіться з нами телефоном.';
            submitButton.disabled = false;
            submitButton.textContent = 'Надіслати';
        }
    });
})();
