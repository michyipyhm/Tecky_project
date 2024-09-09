document.addEventListener('DOMContentLoaded', async () => {

    let res = await fetch("/shoppingcart")
    if (res.status === 401) {
        alert('Please login first.');
        window.location.href = '/index.html';
        return;
    }
    let result = await res.json()

    const shoppingCartForm = document.getElementById('shoppingCartForm')
    const cartEmptyDiv = document.querySelector('.cartEmpty')
    const orderBtn = document.querySelector('#orderBtnForm')

    if (result.data.length > 0) {
        cartEmptyDiv.style.display = 'none'
    }
    if (result.data.length <= 0) {
        orderBtn.style.display = 'none'
    }

    for (let product of result.data) {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <div class="card" id="shoppingCartCard">
                <div class="productPicture"><img src="${product.image_path}" width="300" height="300"/></div>
                <div class="productProperty">
                    <div class="productName">${product.product_name}
                    </div>
                    <div class="productRow">
                        <div class="productDetails">
                            <span id="productDetailsH1">Product Details</span><br>
                            <div>Type: <span>${product.camera_type || 'N/A'}</span></div>
                            <div>Format:  <span id="productDetailsFormat">
                                ${product.format_name === 'digital' ? 'N/A' : product.format_name}</span></div>
                            <div>Origin: <span>${product.origin_country || 'N/A'}</span></div>
                            <div>ISO: <span>${product.iso || 'N/A'}</span></div>
                            <div>Year:  <span>${product.production_year || 'N/A'}</span></div>
                            <div>Weight:  <span">${product.weight || 'N/A'}</span></div>
                        </div>
                        <div class="productQuantity">
                            <div class="productPrice">Product Price:<span id="priceNum">$${product.product_price}</span></div>
                        <label for="quantity">Quantity:</label>
                            <select id="quantity" name="quantity">
                                <option value="1" ${product.quantity == 1 ? "selected" : ""}>1</option>
                                <option value="2" ${product.quantity == 2 ? "selected" : ""}>2</option>
                                <option value="3" ${product.quantity == 3 ? "selected" : ""}>3</option>
                                <option value="4" ${product.quantity == 4 ? "selected" : ""}>4</option>
                                <option value="5" ${product.quantity == 5 ? "selected" : ""}>5</option>
                            </select>
                        </div>
                    </div>
                    <button type="button" class="btn btn-outline-danger" id="deleteProduct" name="deleteProduct">Delete</button>
                    </div>
                <div>
        `;
        shoppingCartForm.appendChild(productDiv);
        const totalPrice = document.getElementById('totalPrice');
        totalPrice.textContent = `Total Price: $${result.totalPrice.total}`
        //選擇數量
        const quantitySelect = productDiv.querySelector('#quantity')
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
                alert(data.message)
                location.reload()
            } else {
                alert(data.message)
                location.reload()
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
                location.reload();
                return;
            }
        })
    }
})

//去order畫面
const orderBtn = document.querySelector('#order-button')
orderBtn.addEventListener("click", async (e) => {
    e.preventDefault()

    const res = await fetch("/shoppingCartSendOrder", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    })
    const data = await res.json()
    if (res.ok) {
        alert(data.message);
        window.location.href = "/order.html"
    }
    if (res.status === 500) {
        alert(data.message);
        return;
    }
    if (res.status === 400) {
        alert(data.message);
        return;
    }

})