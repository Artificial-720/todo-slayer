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





// this is where it starts -------------------------------------

const hpBar = document.getElementById("hp");
const pic = document.getElementById("picture");
const tasksTable = document.getElementById("tasks");
const formNew = document.getElementById("form-add");
var hp = 1000;
var maxHP = 1000;


formNew.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask();
  formNew.reset();
});
window.onload = function() {
  populateMonster();
  populateTasks();
};

// load tasks
function populateTasks(){

}
// load image
function populateMonster(){
  pic.src = window.location.href + '1.png';
  setHP(hp);
}

function addTask(){
  const formData = new FormData(formNew);
  console.log(formData);
  var temp = '<tr><td><input type="checkbox" onchange="checkedChange(this);" name="" id=""></td><td>';
  temp += formData.get("task");
  temp += '</td><td>';
  temp += formData.get("damage");
  temp += '</td></tr>';
  
  tasksTable.innerHTML += temp;
}


const boxes = [];
function checkedChange(checkbox) {
  if(checkbox.checked){
    boxes.push(checkbox);
  } else {

  }
}

function markDone(){
  // loop over the boxes and add the done class to them and do damage
  console.log("mark done");
  for(var i = 1, row; row = tasksTable.rows[i]; i++){
    if(!row.classList.contains("done")){
      var checkbox = row.cells[0].firstChild;
      var damage = row.cells[2].innerHTML;
      console.log(row.cells[1].innerHTML);
      console.log(checkbox);
      if(checkbox.checked){
        hp -= damage;
        setHP(hp);
        row.classList.toggle("done");
      }
    }
  }
}

function setHP(newHP){
  const x = (newHP/maxHP) *100;
  hpBar.style.width = x + '%';
  hpBar.innerHTML = x + '%';
}