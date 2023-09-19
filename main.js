const products = [
    { id: 'Cream', name: 'Dove Body Cream', price: 1000.00 },
    { id: 'Sneaker', name: 'Sneakers Shoes', price: 1500.00 },
    { id: 'Heels', name: 'Women High Heels', price: 1500.00 },
    { id: 'watch', name: 'Backyard Watch', price: 2000.00 },
    { id: 'headphone', name: 'Headphone', price: 4500.00 },
    { id: 'iPad', name: 'iPad', price: 20000.00 },
    { id: 'bottle', name: 'Bottle', price: 700.00 },
    { id: 'drinking-water', name: 'Drinking Water', price: 50.00 },
    { id: 'camera', name: 'Camera', price: 17500.00 },
    { id: 'pepsi', name: 'Pepsi', price: 200.00 },
];

const cartItems = [];

function addToCart(productId) {
    const product = products.find(item => item.id === productId);

    if (product) {
        const existingCartItem = cartItems.find(item => item.id === productId);

        if (existingCartItem) {
            existingCartItem.quantity += 1;
        } else {
            cartItems.push({ ...product, quantity: 1 });
        }

        updateCart();
    }
}

function updateCart() {
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;

    cartItemsList.innerHTML = '';

    cartItems.forEach(item => {
        const cartItem = document.createElement('li');
        const itemTotal = item.price * item.quantity;
        cartItem.innerHTML = `
            ${item.name} x${item.quantity} - ksh${itemTotal.toFixed(2)}
            <button onclick="removeItemFromCart('${item.id}')">Remove</button>`;
        
        cartItemsList.appendChild(cartItem);
        total += itemTotal;
    });

    cartTotal.innerText = `ksh${total.toFixed(2)}`;

    localStorage.setItem('cart', JSON.stringify(cartItems));
}

function removeItemFromCart(productId) {
    const index = cartItems.findIndex(item => item.id === productId);

    if (index !== -1) {
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity -= 1;
        } else {
            cartItems.splice(index, 1);
        }

        updateCart();
    }
}

function displayCartItemCount() {
    const cartItemCount = document.getElementById('cart-item-count');
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartItemCount.innerText = totalQuantity;
}

updateCart();
displayCartItemCount();
