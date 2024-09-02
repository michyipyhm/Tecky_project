const productTypeSelect = document.getElementById("productType");


const handleSelectChange = async (e) => {
  e.preventDefault();
  console.log("js 5 camera type selected:", e.target.value);
  let body = {};

  body[e.target.name] = e.target.value.toLowerCase();

  console.log('request body is', body);
  const res = await fetch("/filter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = await res.json();

  console.log('js 20 result is',result);

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
    case "origin":
      htmlName = "origin";
      displayName = "Origin";
      break;
    case "brand":
      htmlName = "brand";
      displayName = "Brand";
      break;
    case "weight":
      htmlName = "weight";
      displayName = "Weight";
      break;
  }

  let dynamicHTML = "";
  console.log("Nextcrit result is", result.nextCriteria);
  for (let option of result.nextOptions) {
    console.log('js61 option is', option);
    if (
      option[`${result.nextCriteria}`] !== undefined &&
      option[`${result.nextCriteria}`]
    ) {
      dynamicHTML += `<option value="${option[`${result.nextCriteria}`]}">${
        option[`${result.nextCriteria}`]
      }</option>`;
    }
  }

  console.log(displayName, "html",htmlName);
  console.log(dynamicHTML);
  document.querySelector(`#${result.nextCriteria + "_area"}`).innerHTML = `
          <label for="${htmlName}">${displayName}:</label>
            <select name="${htmlName}" id="${htmlName}">
              <option value="" disabled selected>Select ${displayName}</option>
              ${dynamicHTML}
            </select>`;

  const newSelect = document.querySelector(`#${htmlName}`);
  console.log("new select is",newSelect)
  if (newSelect) {
    newSelect.addEventListener("change", handleSelectChange);
  } else {
    console.error(`"${htmlName}" not found`);
  }
};

productTypeSelect.addEventListener("change", handleSelectChange);


function clearContent() {
  document.querySelector(`#${result.nextCriteria + "_area"}`).innerHTML = "";
}
