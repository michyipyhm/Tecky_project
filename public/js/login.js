
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
    const loginFormEle = document.querySelector("#login-form")
    loginFormEle.addEventListener("submit", async (e) => {
        
        e.preventDefault()
        
        const username = e.target.username.value
        const password = e.target.password.value
        
        const body = {
            username: username,
            password: password
        }
        const res = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        
        const data = await res.json()
        if (res.ok) {
            
            window.location = "/index.html"
        } else {
            alert(data.message)
        }
    })
   
}

function register() {
    window.location.href = "/register.html"
}