window.onload = async () => {
  const cardIds = ["card1", "card2", "card3", "card4", "card5", "card6"];

  try {
    const response = await fetch("/main");
    if (!response.ok) {
      throw new Error("fetch error!");
    }
    const imagePaths = await response.json();

    cardIds.forEach((cardId, index) => {
      const imgElement = document.querySelector(`#${cardId}`);

      const imagePath = imagePaths[index];
      console.log("****imagePath for ${cardId} is****", imagePath);

      imgElement.src = imagePath;
      console.log("final srccc for ${cardId} is***", imgElement.src);
    });
  } catch (error) {
    console.error("Error is:", error);
  }
};

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
