document.addEventListener("DOMContentLoaded", () => {
            const elements = {
                searchForm: document.querySelector('.search-form'),
                shoppingCart: document.querySelector('.shopping-cart'),
                loginForm: document.querySelector('.login-form'),
                navbar: document.querySelector('.navbar')
            };
            
            document.querySelector('#search-btn').addEventListener('click', () => toggleActive(elements.searchForm));
            document.querySelector('#cart-btn').addEventListener('click', () => toggleActive(elements.shoppingCart));
            document.querySelector('#login-btn').addEventListener('click', () => toggleActive(elements.loginForm));
            document.querySelector('#menu-btn').addEventListener('click', () => toggleActive(elements.navbar));
            
            function toggleActive(element) {
                element.classList.toggle('active');
                Object.values(elements).forEach(el => {
                    if (el !== element) el.classList.remove('active');
                });
            }
        });
