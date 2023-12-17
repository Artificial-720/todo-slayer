
// form start handling
const formStart = document.getElementById("form-start");
formStart.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(formStart);
  console.log(formData);
  // check values
  // hide form
  formStart.style.display = "none";
  // set name
  document.getElementById("title").innerHTML = formData.get("name")
  // set image
  const pic = document.getElementById("picture");
  var reader = new FileReader();
  reader.onload = function(event) {
    pic.src = event.target.result;
  };
  reader.readAsDataURL(formData.get("image"));
  // set health
  hp = formData.get("hp");
  maxHP = hp;
  const x = (hp/maxHP) * 100;
  hpBar.style.width = x + '%';
  hpBar.innerHTML = x + '%';
  // show app
  document.getElementById("app").style.display = "flex";
});





// app

const tasks = [];
const doneTasks = [];
var nextId = 0;
var hp = 1000;
var maxHP = 1000;

const formNew = document.getElementById("form-add");
formNew.addEventListener("submit", (event) => {
  event.preventDefault();
  createTask();
  formNew.reset();
});

function createTask() {
  console.log("createTask");
  const formData = new FormData(formNew);
  var listItem = document.createElement("li");
  var formElement = document.createElement("form");
  var divElement = document.createElement("div");
  var handleSpan = document.createElement("span");
  handleSpan.className = "task-handle";
  var checkboxInput = document.createElement("input");
  checkboxInput.setAttribute("type", "checkbox");
  checkboxInput.className = "checkbox";
  var descriptionSpan = document.createElement("span");
  descriptionSpan.className = "description";
  descriptionSpan.textContent = formData.get("task");
  var damageSpan = document.createElement("span");
  damageSpan.className = "damage";
  damageSpan.textContent = formData.get("damage");
  divElement.appendChild(handleSpan);
  divElement.appendChild(checkboxInput);
  divElement.appendChild(descriptionSpan);
  divElement.appendChild(damageSpan);
  var deleteButton = document.createElement("input");
  deleteButton.setAttribute("type", "button");
  deleteButton.setAttribute("value", "X");
  deleteButton.className = "btn-delete";
  formElement.appendChild(divElement);
  formElement.appendChild(deleteButton);
  listItem.appendChild(formElement);
  
  todo.prepend(listItem);

  // add events
  const ob = {
    id: nextId,
    task: formData.get("task"),
    damage: formData.get("damage")
  };
  tasks.push(ob);
  nextId = nextId + 1;

  checkboxInput.addEventListener('change', (event) => {
    console.log(formElement);
    console.log("changed check box to " + checkboxInput.checked);
    if(checkboxInput.checked){
      // move to done
      tasks.splice(tasks.indexOf(ob), 1);
      doneTasks.push(ob);
      // deal damage to monster
      damage(ob.damage);
    }else{
      // move to not done
      doneTasks.splice(doneTasks.indexOf(ob), 1);
      tasks.push(ob);
      // remove damage from monster
      damage(-1*ob.damage);
    }
    divElement.classList.toggle("done");
    reorder(listItem, checkboxInput.checked);
  });

  deleteButton.addEventListener('click', (event) => {
    console.log("delete button clicked");
    if (confirm("Are you sure you want to delete \"" + ob.task + "\"") == true){
      // pressed ok
      if(checkboxInput.checked){
        doneTasks.splice(doneTasks.indexOf(ob), 1);
        listDone.removeChild(listItem);
      }else{
        tasks.splice(tasks.indexOf(ob), 1);
        listTodo.removeChild(listItem);
      }
    }
  });


  console.log(tasks);
}

function readTask(id) {
  console.log("readTask");

}

function updateTask() {
  console.log("updateTask");
}

function destroyTask() {
  console.log("destroyTask");
}



const listTodo = document.getElementById("todo");
const listDone = document.getElementById("done-tasks");
function reorder(listItem, done) {
  if (done) {
    // move to done list
    listTodo.removeChild(listItem);
    listDone.prepend(listItem);
  } else {
    // move to todo list
    listDone.removeChild(listItem);
    listTodo.appendChild(listItem);
  }
}


const hpBar = document.getElementById("hp");
function damage(amount){
  console.log("damage: " + amount);
  hp -= amount;
  if(hp < 0){
    hp = 0;
  }else if (hp > maxHP){
    hp = maxHP;
  }
  console.log("new hp: " + hp);
  const x = (hp/maxHP) * 100;
  hpBar.style.width = x + '%';
  hpBar.innerHTML = x + '%';
}









console.log("Loaded JS");