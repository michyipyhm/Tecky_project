// const { isMemberName } = require("typescript");

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



window.onload = async () => {
    const usernameLabel = document.querySelector("#usernameLabel");
    const nicknameLabel = document.querySelector("#nicknameLabel");
    const genderLabel = document.querySelector("#genderLabel");
    const birthdayLabel = document.querySelector("#birthdayLabel");
    const phoneLabel = document.querySelector("#phoneLabel");
    const addressLabel = document.querySelector("#addressLabel");
    const emailLabel = document.querySelector("#emailLabel");



    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${day}-${month}-${year}`;
    }


    // const newDate = formatDate(new Date(birthdayInput))
    await getUserProfile();
    async function getUserProfile() {
        const res = await fetch("/userprofile");
        const data = await res.json();
        


        if (res.ok) {
            const user = data.user;
            const date = formatDate(new Date(user.birthday))

            usernameLabel.innerHTML = user.username;
            nicknameLabel.innerHTML = user.nickname;
            genderLabel.innerHTML = user.gender;
            birthdayLabel.innerHTML = date;
            phoneLabel.innerHTML = user.phone;
            addressLabel.innerHTML = user.address;
            emailLabel.innerHTML = user.email;
        }
    }
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
const updateprofileBtn = document.querySelector("#updateprofileBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const orderRecordBtn = document.querySelector("#orderRecordBtn");
const shoppingCartBtn = document.querySelector("#shoppingCartBtn");

orderRecordBtn.addEventListener("click", (e) => {
    window.location.href = "/order.html";
});

logoutBtn.addEventListener("click", (e) => {
    logout()
})

shoppingCartBtn.addEventListener("click", (e) => {
    window.location.href = "http://localhost:8080/shoppingcart.html";
});

document.addEventListener('DOMContentLoaded', (e) => {
    document.querySelector("#updatedBtn")
        .addEventListener('click', async function (e) {
            e.preventDefault()

            let nickname = document.getElementById("nicknameinput").value;
            let gender = document.getElementById("genderSelect").value;
            let birthday = document.getElementById("birthdayinput").value;
            let phone = document.getElementById("phoneinput").value;
            let address = document.getElementById("addressinput").value;
            let email = document.getElementById("emailinput").value;
            // console.log("nickname:[" + nickname + "]");
            // console.log("gender:[" + gender + "]");
            // console.log("birthday:[" + birthday + "]");
            // console.log("phone:[" + phone + "]");
            // console.log("address:[" + address + "]");
            // console.log("email:[" + email + "]");

            if (email === null || email === "") {
                alert("Email can't empty");
                return;
            } else {
                console.log("hihihi9999")
                const formObject = {
                    nickname: nickname,
                    gender: gender,
                    birthday: birthday,
                    phone: phone,
                    address: address,
                    email: email,
                }
                console.log("hihii7777")
                const res = await fetch('/updateprofile', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formObject),
                }
            )
                console.log("hihi444")
                const data = await res.json()
                console.log("data:[" + JSON.stringify(data) + "]")
                if (res.ok) {
                    console.log("hihi")
                    window.location.href = "/profile.html";
                } else {
                    alert(data.message, "Update Failed")
                }
                
            }

            
        })
})
