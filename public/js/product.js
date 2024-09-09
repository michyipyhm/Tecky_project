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
            <div class="photo"><img src="${product.image_path}" width="600" height="600"/>
            </div>
            <div class="productBtn">
                <div class="productName"><h1>${product.product_name}</h1><br>
                    <span class="productId">WSP012-${product.id}</span>
                </div>
                <div class="description">
                    <div><h2>Description</h2></div>
                    <div><span class="descriptionRow">Type: </span>${product.camera_type || 'N/A'}</div>
                    <div><span class="descriptionRow">Format: </span>${product.format_name === 'digital' ? 'N/A' : product.format_name}</div>
                    <div><span class="descriptionRow">Brand: </span>${product.brand_name || 'N/A'}</div>
                    <div><span class="descriptionRow">Origin: </span>${product.origin_country || 'N/A'}</div>
                    <div><span class="descriptionRow">Year: </span>${product.production_year || 'N/A'}</div>
                    <div><span class="descriptionRow">Weight: </span>${product.weight || 'N/A'}</div>
                    <div><span class="descriptionRow">ISO: </span>${product.iso || 'N/A'}</div>
                </div>
                <div class="price"><span class="priceFont">Price: $${product.product_price}<span>
                </div>
                <div class="pickUp">
                    <div calss="pickUpLocation">Pickup available at Kowloon Bay Tecky Academy
                    </div>
                    <div class="pickUpTime">Usually ready in 2-4 days
                    </div>
                </div>
                <div class="addToCart"><button type="button" class="btn btn-primary btn-lg">Add to cart</button>
                </div>
            </div>
        </div>
    `;
    productDetails.appendChild(productDiv)
    const name = product.product_name
    const addToCartBtns = document.querySelector('.btn.btn-primary.btn-lg')
    addToCartBtns.addEventListener('click', async (e) => {
        e.preventDefault()
        const body = {
            name: name
        }
        const res = await fetch("/addToCart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        const data = await res.json()
        if (res.ok) {
            alert(data.message);
        } else {
            alert(data.message);
        }
    })
})