document.addEventListener("DOMContentLoaded", function() {
    // Reference UI elements
    let searchForm = document.querySelector('.search-form');
    let shoppingCart = document.querySelector('.shopping-cart');
    let loginForm = document.querySelector('.login-form');
    let navbar = document.querySelector('.navbar');

    // Toggle Functions
    document.querySelector('#search-btn').onclick = () => {
        searchForm.classList.toggle('active');
        shoppingCart.classList.remove('active');
        loginForm.classList.remove('active');
        navbar.classList.remove('active');
    };

    document.querySelector('#cart-btn').onclick = () => {
        shoppingCart.classList.toggle('active');
        searchForm.classList.remove('active');
        loginForm.classList.remove('active');
        navbar.classList.remove('active');
    };

    document.querySelector('#login-btn').onclick = () => {
        loginForm.classList.toggle('active');
        searchForm.classList.remove('active');
        shoppingCart.classList.remove('active');
        navbar.classList.remove('active');
    };

    document.querySelector('#menu-btn').onclick = () => {
        navbar.classList.toggle('active');
        searchForm.classList.remove('active');
        shoppingCart.classList.remove('active');
        loginForm.classList.remove('active');
    };

    // Shopping cart functionality
    const shoppingCartContainer = document.querySelector('.shopping-cart');
    let cartItems = [];

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
            </div>
            `;
            total += item.price * item.qty;
        });

        cartHTML += `<div class="total">Total: ₱${total.toFixed(2)}/-</div>
        <a href="#" class="btn" id="checkout-btn">Checkout</a>`;

        shoppingCartContainer.innerHTML = cartHTML;

        // Use event delegation for trash icons
        shoppingCartContainer.addEventListener('click', function(event) {
            if (event.target.classList.contains('trash-icon')) {
                const box = event.target.parentElement;
                const index = box.getAttribute('data-index');
                removeCartItem(index);
            }
        });

        // Checkout button event
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function(e) {
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
    }

    function removeCartItem(index) {
        cartItems.splice(index, 1);
        updateCartDisplay();
    }

    // Add to cart functionality
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart')) {
            const itemElement = event.target.closest('.col-md-3'); // Fix: Selecting correct parent
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
        }
    });

    // Initialize empty cart
    shoppingCartContainer.innerHTML = `
        <div class="total">Total: ₱0.00</div>
        <a href="#" class="btn" id="checkout-btn">Checkout</a>
    `;

    updateCartDisplay();
});
