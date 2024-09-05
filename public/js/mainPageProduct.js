window.onload = async () => {
  const productInfocardIds = ["card1", "card2", "card3", "card4", "card5", "card6"];


  try {
    const response = await fetch("/api/product-info");
    if (!response.ok) {
      throw new Error("fetch error!");
    }
    const productInfo = await response.json();
    console.log("productInfo is:", productInfo);

    productInfo.forEach((productInfo, index) => {
      console.log('index is', index)
      const cardId = `card${index + 1}`;


      const imgElement = document.querySelector(`#${cardId} >img`);
      const idElement = document.querySelector(`#${cardId} .card-body .product-id`);
      const nameElement = document.querySelector(`#${cardId} .card-body .product-name`);
      const priceElement = document.querySelector(`#${cardId} .card-body .price`);
      
      const imagePath = productInfo.image_path;
      const idPath = productInfo.product_id;
      const namePath = productInfo.product_name;
      const pricePath = productInfo.product_price;


      console.log("pricePath is:", pricePath);

      idElement.innerHTML = `WSP012-${idPath}`;
      imgElement.src = imagePath;
      nameElement.innerHTML = namePath;
      priceElement.innerHTML = `$ ${pricePath}`;
    });
  } catch (error) {
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
