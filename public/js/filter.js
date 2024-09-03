const productTypeSelect = document.getElementById("productType");

const handleSelectChange = async (e) => {
  e.preventDefault();
  console.log("js 5 selected:", e.target.value, e.target.name + "_area");

  let body = {};
  const formData = new FormData(document.querySelector("#filterForm"));
  console.log("js 10 formData is", formData);

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
    clearContent(clearArray[i]);
  }

  // let ammendBody = Object.keys(body);
  // let startIndex = Math.max(0, ammendBody.length - currentPosition);

  // for (let i = startIndex; i < currentPosition; i++) {
  //   delete body[clearArray[i]];
  // }

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
  document.querySelector(`#${result.nextCriteria + "_area"}`).innerHTML = `
          <label for="${htmlName}">${displayName}:</label>
            <select name="${result.nextCriteria}" id="${htmlName}">
              <option value="" disabled selected>Select ${displayName}</option>
              ${dynamicHTML}
            </select>`;


  // console.log('product from ts ', result.products)
  for (let imagePath of result.products){
    if (imagePath!== null){
      let img = document.querySelector(".gallery-item");
      console.log("img is", img)
      console.log("forloop image path is", imagePath)
      img.src = imagePath.image_path;
  } else {
      console.log("image path is null");
    }
  };

  
  const newSelect = document.querySelector(`#${htmlName}`);
  console.log("new select is", newSelect);
  if (newSelect) {
    newSelect.addEventListener("change", handleSelectChange);
  } else {
    console.error(`"${htmlName}" not found`);
  }
};

productTypeSelect.addEventListener("change", handleSelectChange);

function clearContent(target) {
  document.querySelector(`#${target}`).innerHTML = "";
}

// // Slider
// const rangevalue = document.querySelector(".slider-container .price-slider");
// const rangeInputvalue = document.querySelectorAll(".range-input input");

// let priceGap = 100;

// const priceInputvalue = document.querySelectorAll(".price-input input");

// for (let i = 0; i < priceInputvalue.length; i++) {
//   priceInputvalue[i].addEventListener("input", (e) => {
//     // Parse min and max values of the range input
//     let minp = parseInt(priceInputvalue[0].value);
//     let maxp = parseInt(priceInputvalue[1].value);
//     let diff = maxp - minp;

//     if (minp < 0) {
//       alert("minimum price cannot be less than 0");
//       priceInputvalue[0].value = 0;
//       minp = 0;
//     }

//     // Validate the input values
//     if (maxp > 10000) {
//       alert("maximum price cannot be greater than 10000");
//       priceInputvalue[1].value = 10000;
//       maxp = 10000;
//     }

//     if (minp > maxp - priceGap) {
//       priceInputvalue[0].value = maxp - priceGap;
//       minp = maxp - priceGap;

//       if (minp < 0) {
//         priceInputvalue[0].value = 0;
//         minp = 0;
//       }
//     }

//     // Check if the price gap is met
//     // and max price is within the range
//     if (diff >= priceGap && maxp <= rangeInputvalue[1].max) {
//       if (e.target.className === "min-input") {
//         rangeInputvalue[0].value = minp;
//         let value1 = rangeInputvalue[0].max;
//         rangevalue.style.left = `${(minp / value1) * 100}%`;
//       } else {
//         rangeInputvalue[1].value = maxp;
//         let value2 = rangeInputvalue[1].max;
//         rangevalue.style.right = `${100 - (maxp / value2) * 100}%`;
//       }
//     }
//   });
// }

// for (let i = 0; i < rangeInputvalue.length; i++) {
//   rangeInputvalue[i].addEventListener("input", (e) => {
//     let minVal = parseInt(rangeInputvalue[0].value);
//     let maxVal = parseInt(rangeInputvalue[1].value);

//     let diff = maxVal - minVal;

//     // Check if the price gap is exceeded
//     if (diff < priceGap) {
//       // Check if the input is the min range input
//       if (e.target.className === "min-range") {
//         rangeInputvalue[0].value = maxVal - priceGap;
//       } else {
//         rangeInputvalue[1].value = minVal + priceGap;
//       }
//     } else {
//       // Update price inputs and range progress
//       priceInputvalue[0].value = minVal;
//       priceInputvalue[1].value = maxVal;
//       rangevalue.style.left = `${(minVal / rangeInputvalue[0].max) * 100}%`;
//       rangevalue.style.right = `${
//         100 - (maxVal / rangeInputvalue[1].max) * 100
//       }%`;
//     }
//   });
// }

// console.log("rangevalue is", rangevalue);
// console.log("rangeInputvalue is", rangeInputvalue);
// console.log("priceInputvalue is", priceInputvalue);