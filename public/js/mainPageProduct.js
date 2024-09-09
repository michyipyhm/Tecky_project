window.onload = async () => {
  try {
    const response = await fetch("/product-info");
    if (!response.ok) {
      throw new Error("fetch error!");
    }
    const productInfo = await response.json();
    // console.log(productInfo);

    productInfo.forEach((productInfo, index) => {
      // console.log('index is', index)
      const cardId = `card${index + 1}`;


      const imgElement = document.querySelector(`#${cardId} >img`);
      const idElement = document.querySelector(`#${cardId} .card-body .product-id`);
      const nameElement = document.querySelector(`#${cardId} .card-body .product-name`);
      const priceElement = document.querySelector(`#${cardId} .card-body .price`);
      const quanElement = document.querySelector(`#${cardId} .card-body .quantity`);

      const imagePath = productInfo.image_path;
      const idPath = productInfo.product_id;
      const namePath = productInfo.product_name;
      const pricePath = productInfo.product_price;
      const quantityPath = productInfo.quantity;
      // console.log(quantityPath)
      // console.log("pricePath is:", pricePath);

      idElement.innerHTML = idPath;
      imgElement.src = imagePath;
      nameElement.innerHTML = namePath;
      priceElement.innerHTML = `$ ${pricePath}`;
      if (quantityPath > 1) {
        quanElement.innerHTML = "In stock";
        quanElement.style.backgroundColor = "#6cc971";
      } else if (quantityPath <= 1 && quantityPath > 0) {
        quanElement.innerHTML = `Still ${quantityPath} left`;
        quanElement.style.backgroundColor = "#ff6c6c";
      } else if (quantityPath <= 0) {
        quanElement.innerHTML = "Out of stock";
        quanElement.style.backgroundColor = "#a6a6a6";
      }
    });
  } catch (error) {
    // console.log("Error is:", error);
  }

  //const 每張card的內容
  document.querySelectorAll('.card').forEach(async cardDiv => {
    const productNameDiv = cardDiv.querySelector('.product-name')
    const productName = productNameDiv.textContent
    const productIdSpan = cardDiv.querySelector('.product-id')
    const productId = productIdSpan.textContent
    const addToCartBtns = cardDiv.querySelectorAll('.btn.btn-light')
    const checkProductDetails = cardDiv.querySelectorAll('.gallery-item')
    //加入購物車
    addToCartBtns.forEach(button => {
      button.addEventListener('click', async (e) => {
        e.preventDefault()
        const name = productName
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
          alert(data.message)
        } else {
          alert(data.message)
        }
      })
    })
    //load去product info
    checkProductDetails.forEach(button => {
      button.addEventListener('click', async (e) => {
        e.preventDefault()
        const id = productId
        window.location.href = `/product.html?product=${id}`
      })
    })
  })
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.body.style.backgroundColor = "#08192c";
}
