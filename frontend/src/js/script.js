function loadMoreImages() {
  console.log("load images called");
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/gallery/content?count=' + imagesPerLoad, true);
  xhr.onload = function () {
    if (this.status === 200) {
      var response = JSON.parse(this.responseText);
      console.log(response);
      var links = response["data"];
      for (let i = 0; i < links.length; i++) {
        var card = createCard(links[i]);
        addCard(card);
      }
    }
  };
  xhr.send();
}





function loadUsers() {
  console.log("load users called");
  const loginTable = document.getElementById("loginTable");
  loginTable.innerHTML += '<tr><td>test</td></tr>';
}



const formAddUser = document.getElementById("formNewUser");
formAddUser.addEventListener("submit", (event) => {
  event.preventDefault();
  sendAddUser();
});

function sendAddUser() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", formAddUser.action, true);
  const formData = new FormData(formAddUser);

  xhr.onload = function () {
    if (this.status == 201) {
      loading.classList.toggle("done");
      var response = JSON.parse(this.responseText);
      console.log("response: " + response);
      // do something with the response here
    }
  }
  xhr.send(formData);
};



loadUsers(); // load users into list to be selected to 'login'