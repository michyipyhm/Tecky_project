window.onload = () => {
    const adminloginFormEle = document.querySelector("#adminlogin-form")

    adminloginFormEle.addEventListener("submit", async (e) => {

        e.preventDefault()

        const username = e.target.username.value
        console.log(username);
        const password = e.target.password.value
        console.log(password);
        const body = {
            username: username,
            password: password
        }
        console.log(body);
        const res = await fetch("/adminlogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        const data = await res.json()
        if (res.ok) {

            window.location = "/adminchangepw.html"
        } else {
            alert(data.message)
        }
    })

}

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
// updatedBtn.addEventListener("click", (e) => {
//     window.location.href = "http://localhost:8080/adminchangepw.html";
// });