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

async function logout() {
  const res = await fetch("/logout", {
    method: "POST",
  });
  const data = await res.json();
  if (res.ok) {
    window.location.href = "/index.html";
  } else {
    alert(data.message);
  }
}

changePwBtn.addEventListener("click", (e) => {
  window.location.href = "http://localhost:8080/adminchangepw.html";
});

addProductBtn.addEventListener("click", (e) => {
  window.location.href = "http://localhost:8080/addproduct.html";
});

mainPageBtn.addEventListener("click", (e) => {
  window.location.href = "http://localhost:8080/";
});

logoutBtn.addEventListener("click", (e) => {
  logout()
});