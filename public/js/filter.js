const productTypeSelect = document.getElementById("productType");

const decOrderBtn = document.querySelector("#price-dec");
const ascOrderBtn = document.querySelector("#price-asc");

const handlePriceOrder = async (e) => {
  decOrderBtn.addEventListener("click", () => {
    setPriceOrder("dec");
  });
  ascOrderBtn.addEventListener("click", () => {
    setPriceOrder("asc");
  });

  async function setPriceOrder(order) {
    const priceOrder = {
      price_order: order,
    };
    let body={};

    const formData = new FormData(document.querySelector("#filterForm"));

    let test = [...formData];

    let limit = test[0].length;
    console.log("limit is", limit);

    // let count = 0;
    for (const [key, value] of formData) {
      console.log(`"js340: ", ${key}: ${value}\n`);
      body[key] = value.toLowerCase();
    }

    console.log("price order is", priceOrder);

    body = { ...body, ...priceOrder };

    console.log("request body is", body);

    try {
      const res = await fetch("/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      console.log("result is", result);


  document.querySelector(`#products-container`).innerHTML = "";
  for (let i = 0; i < result.products.length; i++) {
    console.log("product is", result.products[i]);
    let imagePath = result.products[i].image_path;
    let productName = result.products[i].product_name;
    let price = result.products[i].product_price;

    document.querySelector(`#products-container`).innerHTML += `
          <div class="col">
            <div class="card" id="card1">
              <img src="${imagePath}" class="gallery-item" alt="gallery" />
              <div class="card-body">
                <div class="product-name">${productName}</div>
                <div class="price">${price}</div>
                <a href="#" class="btn btn-light">Add to cart</a>
              </div>
            </div>
          </div>`;
  }
    } catch {
      console.error("Error fetching data");
    }
  }
};

handlePriceOrder();

const handleSelectChange = async (e) => {
  e.preventDefault();
  console.log("js 5 selected:", e.target.value, e.target.name + "_area");

  let body = {};

  let clearArray = [
    "product_type_area",
    "camera_type_area",
    "is_used_area",
    "format_name_area",
    "iso_area",
    "origin_country_area",
    "brand_name_area",
  ];

  let currentPosition = clearArray.findIndex(
    (element) => element == e.target.name + "_area"
  );
  console.log("current position is", currentPosition);

  for (let i = currentPosition + 1; i < clearArray.length; i++) {
    console.log("js 15 clearArray is", clearArray[i]);
    clearContent(clearArray[i]);
  }
  const formData = new FormData(document.querySelector("#filterForm"));
  console.log("js 10 formData is", formData);

  for (const [key, value] of formData) {
    console.log(`"js340: ", ${key}: ${value}\n`);
    body[key] = value.toLowerCase();
  }

  console.log("new formData", formData);

  console.log("request body is", body);
  const res = await fetch("/filter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = await res.json();

  console.log("js 20 result is", result);

  console.log(document.querySelector(`#${result.nextCriteria + "_area"}`));

  let htmlName;
  let displayName;

  switch (result.nextCriteria) {
    case "product_type":
      htmlName = "productType";
      displayName = "Product Type";
      break;
    case "format_name":
      htmlName = "formatName";
      displayName = "Format";
      break;
    case "camera_type":
      htmlName = "cameraType";
      displayName = "Camera Type";
      break;
    case "is_used":
      htmlName = "isUsed";
      displayName = "New or Used";
      break;
    case "origin_country":
      htmlName = "originCountry";
      displayName = "Origin";
      break;
    case "brand_name":
      htmlName = "brandName";
      displayName = "Brand";
      break;
    case "iso":
      htmlName = "iso";
      displayName = "ISO";
      break;
  }

  let dynamicHTML = "";
  console.log("Nextcrit result is", result.nextCriteria);
  for (let option of result.nextOptions) {
    console.log("js61 option is", option);
    if (
      option[`${result.nextCriteria}`] !== undefined &&
      option[`${result.nextCriteria}`] !== null
    ) {
      dynamicHTML += `<option value="${option[`${result.nextCriteria}`]}">${
        option[`${result.nextCriteria}`]
      }</option>`;
    }
  }

  console.log(displayName, "html", htmlName);
  console.log(dynamicHTML);

  if (result.nextCriteria) {
    document.querySelector(`#${result.nextCriteria + "_area"}`).innerHTML = `
          <label for="${htmlName}">${displayName}:</label>
            <select name="${result.nextCriteria}" id="${htmlName}">
              <option value="" disabled selected>Select ${displayName}</option>
              ${dynamicHTML}
            </select>`;

    const newSelect = document.querySelector(`#${htmlName}`);
    console.log("new select is", newSelect);
    if (newSelect) {
      newSelect.addEventListener("change", handleSelectChange);
    } else {
      console.error(`"${htmlName}" not found`);
    }
  }

  document.querySelector(`#products-container`).innerHTML = "";
  for (let i = 0; i < result.products.length; i++) {
    console.log("product is", result.products[i]);
    let imagePath = result.products[i].image_path;
    let productName = result.products[i].product_name;
    let price = result.products[i].product_price;

    document.querySelector(`#products-container`).innerHTML += `
          <div class="col">
            <div class="card" id="card1">
              <img src="${imagePath}" class="gallery-item" alt="gallery" />
              <div class="card-body">
                <div class="product-name">${productName}</div>
                <div class="price">$ ${price}</div>
                <a href="#" class="btn btn-light">Add to cart</a>
              </div>
            </div>
          </div>`;
  }
};

productTypeSelect.addEventListener("change", handleSelectChange);

function clearContent(target) {
  document.querySelector(`#${target}`).innerHTML = "";
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
