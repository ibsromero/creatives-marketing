document.addEventListener("DOMContentLoaded", function () {
    let searchForm = document.querySelector('.search-form');
    let shoppingCart = document.querySelector('.shopping-cart');
    let loginForm = document.querySelector('.login-form');
    let navbar = document.querySelector('.navbar');
    let cartItems = [];

    document.querySelector('#search-btn')?.addEventListener('click', () => {
        searchForm.classList.toggle('active');
        shoppingCart.classList.remove('active');
        loginForm.classList.remove('active');
        navbar.classList.remove('active');
    });

    document.querySelector('#cart-btn')?.addEventListener('click', () => {
        shoppingCart.classList.toggle('active');
        searchForm.classList.remove('active');
        loginForm.classList.remove('active');
        navbar.classList.remove('active');
    });

    document.querySelector('#login-btn')?.addEventListener('click', () => {
        loginForm.classList.toggle('active');
        searchForm.classList.remove('active');
        shoppingCart.classList.remove('active');
        navbar.classList.remove('active');
    });

    document.querySelector('#menu-btn')?.addEventListener('click', () => {
        navbar.classList.toggle('active');
        searchForm.classList.remove('active');
        shoppingCart.classList.remove('active');
        loginForm.classList.remove('active');
    });

    function updateCartDisplay() {
        let cartHTML = '';
        let total = 0;
        cartItems.forEach((item, index) => {
            cartHTML += `
            <div class="box" data-index="${index}">
                <i class="fas fa-trash trash-icon" style="cursor:pointer;"></i>
                <img src="${item.img}" alt="">
                <div class="content">
                    <h3>${item.name}</h3>
                    <span class="price">₱${item.price.toFixed(2)}/-</span>
                    <span class="quantity">qty : ${item.qty}</span>
                </div>
            </div>`;
            total += item.price * item.qty;
        });
        cartHTML += `<div class="total">total : ₱${total.toFixed(2)}/-</div>
        <a href="#" class="btn" id="checkout-btn">checkout</a>`;
        shoppingCart.innerHTML = cartHTML;

        document.querySelectorAll('.trash-icon').forEach(icon => {
            icon.addEventListener('click', function () {
                const index = this.parentElement.getAttribute('data-index');
                removeCartItem(index);
            });
        });

        document.getElementById('checkout-btn')?.addEventListener('click', function (e) {
            e.preventDefault();
            if (cartItems.length === 0) {
                alert("Your cart is empty!");
            } else {
                alert("Checkout process initiated!");
                cartItems = [];
                updateCartDisplay();
            }
        });
    }

    function removeCartItem(index) {
        cartItems.splice(index, 1);
        updateCartDisplay();
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const itemElement = this.closest('.item');
            const name = itemElement.getAttribute('data-name');
            const price = parseFloat(itemElement.getAttribute('data-price'));
            const img = itemElement.querySelector('img').src;

            let existingItem = cartItems.find(item => item.name === name);
            if (existingItem) {
                existingItem.qty += 1;
            } else {
                cartItems.push({ name, price, qty: 1, img });
            }
            updateCartDisplay();
        });
    });

    updateCartDisplay();
});
