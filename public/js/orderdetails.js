document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderNumber = urlParams.get('orderNum');
    let res = await fetch(`/order?orderNum=${orderNumber}`)

    let result = await res.json()

    const orderDetailsForm = document.getElementById('orderDetailsForm');

    for (let product of result.data) {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <div><fieldset>
                <div class="orderNumber">OrderNumber: ${orderNumber}</div>
                <div class="productName">Product Name: ${product.product_name}</div>
                <div class="subtotalPrice">Price: ${product.product_price} * ${product.quantity} = ${product.subtotal}</div>
            </fieldset></div>
        `;
        orderDetailsForm.appendChild(productDiv)
        const totalPrice = document.getElementById('totalPrice')
        totalPrice.textContent = `${result.totalPrice.total}`
    }
})