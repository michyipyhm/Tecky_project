document.addEventListener('DOMContentLoaded', async () => {

    let res = await fetch("/shoppingcart")

    let result = await res.json()

    const shoppingCartForm = document.getElementById('shoppingCartForm');

    for (let product of result.data) {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <div><fieldset>
                <div class="productPicture">Photo</div>
                <div class="productProperty">
                    <div class="productName_Details">
                        <div class="productName">Product Name: ${product.product_name}</div>
                        <div class="productDetails">Product Details: </div>
                    </div>
                    <div class="productQuantity_Price">
                        <label for="quantity">Quantity:</label>
                            <select id="quantity" name="quantity">
                                <option value="1" ${product.quantity == 1 ? "selected" : ""}>1</option>
                                <option value="2" ${product.quantity == 2 ? "selected" : ""}>2</option>
                                <option value="3" ${product.quantity == 3 ? "selected" : ""}>3</option>
                                <option value="4" ${product.quantity == 4 ? "selected" : ""}>4</option>
                                <option value="5" ${product.quantity == 5 ? "selected" : ""}>5</option>
                            </select>
                            <div class="productPrice">Product Price: ${product.product_price}</div>
                    </div>
                <div>
                <button type="button" id="deleteProduct" name="deleteProduct">刪除</button>
            </fieldset></div>
        `;
        shoppingCartForm.appendChild(productDiv);
        console.log(quantity)
        //選擇數量
        const quantitySelect = document.getElementById('quantity')
        quantitySelect.addEventListener("change", async (e) => {
            e.preventDefault()
            const newQuantity = e.target.value
            const id = product.product_id
            const body = {
                id: id,
                quantity: newQuantity
            }
            const res = await fetch("/selectedQuantity", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
            const data = await res.json()
            if (res.ok) {
                alert(data.message);
            }
        })
        //刪除物品
        const deleteProduct = productDiv.querySelector('#deleteProduct')
        deleteProduct.addEventListener("click", async (e) => {
            e.preventDefault()

            const id = product.product_id
            const body = {
                id: id
            }
            const res = await fetch("/deleteShoppingCartItem", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
            const data = await res.json()
            if (res.ok) {
                alert(data.message);
                productDiv.remove();
                return;
            }
        })

        const totalPrice = document.getElementById('totalPrice');
        totalPrice.textContent = `Total Price: ${result.totalPrice.total}`;
    }
});

//去order畫面
const OrderBtn = document.querySelector('#order-button')
OrderBtn.addEventListener("click", async (e) => {
    e.preventDefault()

    const res = await fetch("/shoppingCartSendOrder", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    })
    if (res.ok) {
        const data = await res.json()
        alert(data.message)
        window.location.href = "/order.html"
    }
})