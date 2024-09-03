window.onload = async () => {
  const cardIds = ["card1", "card2", "card3", "card4", "card5", "card6"];

  try {
    const response = await fetch("/api/product-image");
    if (!response.ok) {
      throw new Error("fetch error!");
    }
    const imagePaths = await response.json();
    cardIds.forEach((cardId, index) => {
      const imgElement = document.querySelector(`#${cardId} >img`);
      const imagePath = imagePaths[index];
      // console.log("****imagePath for ${cardId} is****", imagePath);
      imgElement.src = imagePath;
      // console.log("final srccc for ${cardId} is***", imgElement.src);
    });
  } catch (error) {
    console.log("Error is:", error);
  }

  try {
    const response = await fetch("/api/product-info");
    if (!response.ok) {
      throw new Error("fetch error!");
    }
    const products = await response.json();
    // console.log("products are:", products);
    products.forEach((products, index) => {
      const cardId = `card${index + 1}`;
      console.log("cardId is:", cardId);

      const nameElement = document.querySelector(`#${cardId} .card-body .product-name`);
      const priceElement = document.querySelector(`#${cardId} .card-body .price`);
      nameElement.innerHTML = products.product_name;
      priceElement.innerHTML = `$ ${products.product_price}`;
    });
  }catch (error) {
    console.log("Error is:", error);
  }
};



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

