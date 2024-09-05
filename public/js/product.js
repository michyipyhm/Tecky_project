document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    const res = await fetch(`/product?product=${productId}`)

    const result = await res.json()
    const product = result.data
    console.log(product)
    const productDetails = document.getElementById('productDetails');
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
        <div class="firstSection">
            <div class="photo"></div>
            <div class="productBtn">
                <div class="price">$${product.product_price}</div>
                <div class="productId">WSP012-${product.id}</div>
                <div class="pickUp">
                    <div calss="pickUpLocation">Pickup available at Kowloon Bay Tecky Academy<div>
                    <div class="pickUpTime">Usually ready in 2-4 days</div>
                </div>
                <div class="addToCart"><a href="#" class="btn btn-light">Add to cart</a></div>
            </div>
        </div>
        <div class="secondSection>
            <div class="description">
            <h2>Description</h2>
            </div>
        </div>
    `;
    productDetails.appendChild(productDiv)
    const productTitle = document.getElementById('productName');
    productTitle.textContent = `${product.product_name}`
})