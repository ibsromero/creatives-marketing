let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = ()=>{
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');

}

let shoppingCart = document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick = () =>{
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () =>{
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
}

document.addEventListener("DOMContentLoaded", function(){
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
        cartHTML += `<div class="total">total : ₱${total.toFixed(2)}/-</div>
        <a href="#" class="btn" id="checkout-btn">checkout</a>`;
        shoppingCartContainer.innerHTML = cartHTML;
        
        const trashIcons = shoppingCartContainer.querySelectorAll('.trash-icon');
        trashIcons.forEach(icon => {
            icon.addEventListener('click', function(){
                const box = this.parentElement;
                const index = box.getAttribute('data-index');
                removeCartItem(index);
            });
        });
        
        const checkoutBtn = document.getElementById('checkout-btn');
        if(checkoutBtn){
            checkoutBtn.addEventListener('click', function(e){
                e.preventDefault();
                if(cartItems.length === 0) {
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
    
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(){
            const itemElement = this.parentElement;
            const name = itemElement.getAttribute('data-name');
            const price = parseFloat(itemElement.getAttribute('data-price'));
            const img = itemElement.querySelector('img').src;
            
            let existingItem = cartItems.find(item => item.name === name);
            if(existingItem){
                existingItem.qty += 1;
            } else {
                cartItems.push({name, price, qty: 1, img});
            }
            updateCartDisplay();
        });
    });
    
    shoppingCartContainer.innerHTML = `
        <div class="total">total : ₱0.00</div>
        <a href="#" class="btn" id="checkout-btn">checkout</a>
    `;
    
    updateCartDisplay();
});
