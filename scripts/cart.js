const cartContainer = document.getElementById('cart-items');
const cartSummary = document.getElementById('cart-summary');

const getCart = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

const updateCartCount = () => {
    const cartCountElement = document.getElementById('cart-count');
    if (!cartCountElement) return;

    const cart = getCart();
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = itemCount;
    cartCountElement.style.display = itemCount > 0 ? 'flex' : 'none';
};

const removeFromCart = (index) => {
    const cart = getCart();
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
};

const updateQuantity = (index, change) => {
    const cart = getCart();
    cart[index].quantity = Math.max(1, cart[index].quantity + change);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
};

const convertToUSSize = (ukSize) => {
	const uk = parseFloat(ukSize.replace('UK ', ''));
	const usSize = (uk + 1).toFixed(1);
	return `US ${usSize}`;
};

const displayCart = () => {
    const cart = getCart();
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <a href="product.html" class="btn-primary">Continue Shopping</a>
            </div>
        `;
        cartSummary.innerHTML = '';
        updateCartCount();
        return;
    }

    cartContainer.innerHTML = cart.map((item, index) =>
        `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" 
                     alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Size: ${convertToUSSize(item.size)}</p>
                <div class="price">$${item.price}</div>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${index})" title="Remove item">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 20 : 0;
    const tax = subtotal * 0.0125; 
    const total = subtotal + shipping + tax;
    
    cartSummary.innerHTML = `
        <div class="cart-summary-content">
            <div class="summary-row">
                <span>Subtotal</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Shipping</span>
                <span>$${shipping.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Tax</span>
                <span>$${tax.toFixed(2)}</span>
            </div>
            <div class="summary-row total">
                <span>Total</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <button class="btn-checkout">Proceed to Checkout →</button>
        </div>
    `;
};

displayCart();
updateCartCount(); 