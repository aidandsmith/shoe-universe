function generateOrderNumber(length = 14) {
    let code = '';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const lettersLength = letters.length;
    
    for (let i = 0; i < length; i++) {
        const random = Math.floor(Math.random() * letters.length);
        code = code + letters[random];
    }
    return code;
}

document.addEventListener('DOMContentLoaded', function() {
    const order = document.getElementById('orderCode');

    if (order) {
        const orderNumber = generateOrderNumber();
        order.textContent = `${orderNumber}`
    } else {
        console.error('order not found');
    }
})

