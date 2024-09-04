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
		const form = e.target
		const formData = new FormData(form)
		const res = await fetch("/addproduct", {
			method: "POST",
			body: formData,
		})
	})
}
//////////////////////////////////////////////////
const producttypeEle = document.getElementById("producttype");
producttypeEle.addEventListener("change", async () => {
	const value = producttypeEle.value
	if (value === "1") {
		document.getElementById("cameratype").disabled = false;
		document.getElementById("format").disabled = true;
		document.getElementById("pixel").disabled = false;
		document.getElementById("isused").disabled = false;
		document.getElementById("productionyear").disabled = false;
		document.getElementById("weight").disabled = false;
		
	} else {
		document.getElementById("cameratype").disabled = true;
		document.getElementById("format").disabled = false;
		document.getElementById("pixel").disabled = true;
		document.getElementById("isused").disabled = true;
		document.getElementById("productionyear").disabled = true;
		document.getElementById("weight").disabled = true;
	}
});

const cameratypeEle = document.getElementById("cameratype");
cameratypeEle.addEventListener("change", async () => {
	const value = cameratypeEle.value
	if (value === "1") {
		document.getElementById("iso").disabled = true;
	} else {
		document.getElementById("iso").disabled = false;
	}
});
