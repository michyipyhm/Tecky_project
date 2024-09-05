window.onload = async () => {
  const cardIds = ["card1", "card2", "card3", "card4", "card5", "card6"];
  //main page load product img
  try {
    const response = await fetch("/api/product-image");
    if (!response.ok) {
      throw new Error("fetch error!");
    }
    const imagePaths = await response.json();
    cardIds.forEach((cardId, index) => {
      const imgElement = document.querySelector(`#${cardId} >img`);
      const imagePath = imagePaths[index];
      imgElement.src = imagePath;
    });
  } catch (error) {
    console.log("Error is:", error);
  }
  //main page load product info
  try {
    const response = await fetch("/api/product-info");
    if (!response.ok) {
      throw new Error("fetch error!");
    }
    const products = await response.json();
    console.log(products);
    products.forEach((products, index) => {
      const cardId = `card${index + 1}`;

      const nameElement = document.querySelector(
        `#${cardId} .card-body .product-name`
      );
      const priceElement = document.querySelector(
        `#${cardId} .card-body .price`
      );
      nameElement.innerHTML = products.product_name;
      priceElement.innerHTML = `$ ${products.product_price}`;
    });
  } catch (error) {
    console.log("Error is:", error);
  }
  //main page add to cart
  document.querySelectorAll('.card').forEach(cardDiv => {
    const productNameDiv = cardDiv.querySelector('.product-name')
    const productName = productNameDiv.textContent
    const addToCartBtns = cardDiv.querySelectorAll('.btn.btn-light')
    const checkProductDetails = cardDiv.querySelectorAll('.gallery-item')

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
          alert(data.message);
        }
      })
    })
    checkProductDetails.forEach(button => {
      button.addEventListener('click', async (e) => {
        e.preventDefault()
        const name = productName
        window.location.href = `/product.html?product=${name}`
      })
    })
  })
  //main page click to product page


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
