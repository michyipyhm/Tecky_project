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


window.onload = () => {
  const registerEle = document.querySelector("#register-form")
  registerEle.addEventListener("submit", async (e) => {
    e.preventDefault();
    

    const username = e.target.username.value
    const password = e.target.password.value
    const nickname = e.target.nickname.value
    const gender = e.target.gender.value
    const birthday = e.target.birthday.value
    const phone = e.target.phone.value
    const address = e.target.address.value
    const email = e.target.email.value

    const body = {
      username,
      password,
      nickname,
      gender,
      birthday,
      phone,
      address,
      email
    }

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    const data = await res.json()
    if (res.ok) {
      window.location.href = "/login.html"
    } else {
      alert(data.message)
    }
  })
}

function login() {
  window.location.href = "/login.html"
}