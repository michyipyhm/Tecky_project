function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
  }

  var input = document.getElementById('image_uploads');
var preview = document.querySelector('.preview');


// input.addEventListener('change', updateImageDisplay);function updateImageDisplay() {
// 	while(preview.firstChild) {
// 		preview.removeChild(preview.firstChild);
// 	}

// 	if(input.files.length === 0) {
// 		var para = document.createElement('p');
// 		para.textContent = '未選擇任何檔案';
//     para.style="line-height: 300px;";
// 		preview.appendChild(para);
// 	} 
// 	else {
// 		var para = document.createElement('p');
// 		var image = document.createElement('img');
// 		image.src = window.URL.createObjectURL(input.files[0]);
// 		preview.appendChild(image);
// 		preview.appendChild(para);
// 	}
// }

///////////////////////////////////////////////////

window.onload = () => {
	const addproductEle = document.querySelector("#addproduct-form")
	addproductEle.addEventListener("submit", async (e) => {
	  e.preventDefault();
	  
  
	  const productname = e.target.productname.value
	  const producttype = e.target.producttype.value
	  const cameratype = e.target.cameratype.value
	  const brand = e.target.brand.value
	  const origin = e.target.origin.value
	  const format = e.target.format.value
	  const productprice = e.target.productprice.value
	  const productquantity = e.target.productquantity.value
	  const productyear = e.target.productyear.value
	  const weight = e.target.weight.value
	  const pixel = e.target.pixel.value
	  const iso = e.target.iso.value
	  const isused = e.target.isused.value
	  const imageuploads = e.target.imageuploads.value
	  const form = e.target
	  const formData = new FormData(form)
  
	  const body = {
		productname,
		producttype,
		cameratype,
		brand,
		origin,
		format,
		productprice,
		productquantity,
		productyear,
		weight,
		pixel,
		iso,
		isused,
		imageuploads
	  }
	  console.log(body)
  
	  const res = await fetch("/addproduct", {
		method: "POST",
		body: formData,
	  })
	  const data = await res.json()
	  document.querySelector('#addproduct-result').textContent = data
	})


  }