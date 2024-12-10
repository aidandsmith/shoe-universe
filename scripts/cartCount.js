const updateCartCount = () => {
    const cartCountElement = document.getElementById('cart-count');
    if (!cartCountElement) return;

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = itemCount;
    cartCountElement.style.display = itemCount > 0 ? 'flex' : 'none';
};


updateCartCount();
