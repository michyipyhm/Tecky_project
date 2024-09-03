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


///////////////////////////////////////////////////

function readURL(input) {

	if (input.files && input.files[0]) {

		var imageTagID = input.getAttribute("targetID");

		var reader = new FileReader();

		reader.onload = function (e) {

			var img = document.getElementById(imageTagID);

			img.setAttribute("src", e.target.result)

		}

		reader.readAsDataURL(input.files[0]);

	}

}
//////////////////////////////////////////////////

window.onload = () => {
	const addproductEle = document.querySelector("#addproduct-form")
	addproductEle.addEventListener("submit", async (e) => {
		e.preventDefault();


		// const form = document.forms['addproduct-form'];

		// const productname = e.target.productname.value
		// console.log("productname:[" + productname + "]");
		// const producttype = e.target.producttype.value
		// console.log("producttype:[" + producttype + "]");
		// const cameratype = e.target.cameratype.value
		// console.log("cameratype:[" + cameratype + "]");
		// const brand = e.target.brand.value
		// console.log("brand:[" + brand + "]");
		// const format = e.target.format.value
		// console.log("format:[" + format + "]");
		// const productprice = e.target.productprice.value
		// console.log("productprice:[" + productprice + "]");
		// const productquantity = e.target.productquantity.value
		// console.log("productquantity:[" + productquantity + "]");
		// const productionyear = e.target.productionyear.value
		// console.log("productionyear:[" + productionyear + "]");
		// const weight = e.target.weight.value
		// console.log("weight:[" + weight + "]");
		// const pixel = e.target.pixel.value
		// console.log("pixel:[" + pixel + "]");
		// const iso = e.target.iso.value
		// console.log("iso:[" + iso + "]");
		// const isused = e.target.isused.value
		// console.log("isused:[" + isused + "]");
		// const imageuploads = e.target.imageuploads
		// console.log(imageuploads.files[0]);
		// console.log("form:[" + form + "]");
		// const formData = new FormData(form)
		// console.log(form.addproduct-form.value)
		// console.log(form.addproduct-form.files[0])

		const form = e.target


		const formData = new FormData(form)
		const res = await fetch("/addproduct", {
			method: "POST",
			body: formData,
		})
		// const data = await res.json()
		// console.log(data)
		// document.querySelector('#addproduct-result').textContent = data
	})


}