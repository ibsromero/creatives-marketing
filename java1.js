document.addEventListener("DOMContentLoaded", () => {
    let searchForm = document.querySelector('.search-form');
    let shoppingCart = document.querySelector('.shopping-cart');
    let loginForm = document.querySelector('.login-form');
    let navbar = document.querySelector('.navbar');

    document.querySelector('#search-btn').addEventListener('click', () => {
        toggleActive(searchForm);
    });

    document.querySelector('#cart-btn').addEventListener('click', () => {
        toggleActive(shoppingCart);
    });

    document.querySelector('#login-btn').addEventListener('click', () => {
        toggleActive(loginForm);
    });

    document.querySelector('#menu-btn').addEventListener('click', () => {
        toggleActive(navbar);
    });

    function toggleActive(element) {
        element.classList.toggle('active');
        [searchForm, shoppingCart, loginForm, navbar].forEach(el => {
            if (el !== element) el.classList.remove('active');
        });
    }
});
