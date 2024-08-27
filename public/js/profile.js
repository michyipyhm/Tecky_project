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
 

  await getUserProfile();
  async function getUserProfile() {
    const res = await fetch("/userprofile");
    const data = await res.json();
    console.log(data)
    if (res.ok) {
      const user = data.user;
      usernameLabel.innerHTML = user.username;
      nicknameLabel.innerHTML = user.nickname;
      genderLabel.innerHTML = user.gender;
      birthdayLabel.innerHTML = user.birthday;
      phoneLabel.innerHTML = user.phone;
      addressLabel.innerHTML = user.address;
      emailLabel.innerHTML = user.email;
    } else {
      alert("error !!!");
    }
  }
  async function logout() {
    const res = await fetch("/logout", {
      method: "POST",
    });
    const data = await res.json();
    console.log(data)
    if (res.ok) {
      window.location.href = "/";
    } else {
      alert(data.message);
    }
  }
  const logoutBtn = document.querySelector("#logoutBtn");
  const orderRecordBtn = document.querySelector("#orderRecordBtn");


  orderRecordBtn.addEventListener("click", (e) => {

  });

  logoutBtn.addEventListener("click", (e) => {
    logout()
  })
}
