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

  var input = document.getElementById('image_uploads');
var preview = document.querySelector('.preview');

input.style.opacity = 0;
input.addEventListener('change', updateImageDisplay);function updateImageDisplay() {
	while(preview.firstChild) {
		preview.removeChild(preview.firstChild);
	}

	if(input.files.length === 0) {
		var para = document.createElement('p');
		para.textContent = '未選擇任何檔案';
    para.style="line-height: 300px;";
		preview.appendChild(para);
	} 
	else {
		var para = document.createElement('p');
		var image = document.createElement('img');
		image.src = window.URL.createObjectURL(input.files[0]);
		preview.appendChild(image);
		preview.appendChild(para);
	}
}