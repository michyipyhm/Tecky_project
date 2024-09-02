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
    "brand_name_area"
  ]

  let currentPosition = clearArray.findIndex((element) => element == e.target.name + "_area");
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
