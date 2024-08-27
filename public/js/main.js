
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

document.addEventListener("DOMContentLoaded", () => {
  fetch("/main")
   .then(response => response.json())
   .then(data => {
    const imagePath = data.imagePath;
    console.log(imagePath);
    const imgElement = document.createElement('img');
    imgElement.src = imagePath;
    document.body.appendChild(imgElement);
   })
   .catch(error => console.error('Error is:', error));

   if (res.ok) {
    window.location = "main.html"; // have to change to html instead
  } else {
    alert("Run FAILED");
  }
});