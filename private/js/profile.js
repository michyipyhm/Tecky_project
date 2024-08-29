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
  
    return `${year}-${month}-${day}`;
  }

  await getUserProfile();
  async function getUserProfile() {
    const res = await fetch("/userprofile");
    const data = await res.json();
    

    if (res.ok) {
      const user = data.user;
      const date = formatDate(new Date(user.birthday))
      console.log({date})
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
const logoutBtn = document.querySelector("#logoutBtn");
const orderRecordBtn = document.querySelector("#orderRecordBtn");

orderRecordBtn.addEventListener("click", (e) => {
  window.location.href = "/order.html";
});

logoutBtn.addEventListener("click", () => {
  logout()

})





