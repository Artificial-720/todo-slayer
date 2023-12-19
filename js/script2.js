
// form start handling
const formStart = document.getElementById("form-start");
formStart.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(formStart);
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


  // on click make list item z index 1000, position absolute, and top equal to mouse position, also create a temp fill object, like a hint
  handleSpan.addEventListener("mousedown", (event) => {
     listItem.style.width = listItem.clientWidth + 'px';
     moveItem = listItem;
     moveItem.classList.toggle("moving");
     hint.style.height = listItem.clientHeight + 'px';
     listItem.insertAdjacentElement("afterend", hint);
  });

  checkboxInput.addEventListener('change', (event) => {
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
  hp -= amount;
  if(hp < 0){
    hp = 0;
  }else if (hp > maxHP){
    hp = maxHP;
  }
  const x = (hp/maxHP) * 100;
  hpBar.style.width = x + '%';
  hpBar.innerHTML = x + '%';
}








console.log("Loaded JS");




var moveItem = null;
var hint = null;
hint = document.createElement("li");
hint.style.visibility = "hidden";
window.addEventListener("mousemove", (event) => {
  if (moveItem){
    moveItem.style.top = (event.clientY - (moveItem.clientHeight/2)) + 'px';
    // check if should move hint?
    var presib = hint.previousSibling;
    var nextsib = hint.nextSibling;

    if (presib){
      if (presib == moveItem){
        presib = presib.previousSibling;
      }
      if(presib && presib.nodeName == "LI"){
        if (presib.getBoundingClientRect().top + window.scrollY + (presib.clientHeight/2) > event.clientY){
          presib.insertAdjacentElement("beforebegin", hint);
        }
      }
    }
    if (nextsib) {
      if (nextsib == moveItem){
        nextsib = nextsib.nextSibling;
      }
      if (nextsib && nextsib.nodeName == "LI"){
        if (nextsib.getBoundingClientRect().top + window.scrollY + (nextsib.clientHeight/2) < event.clientY){
          nextsib.insertAdjacentElement("afterend", hint);
        }
      }
    }
  }
});
window.addEventListener("mouseup", (event) => {
  if(moveItem){
    // swap with hint and delete hint
    // listTodo.replaceChild(moveItem, hint);
    moveItem.parentNode.replaceChild(moveItem, hint);
    moveItem.style.top = "";
    moveItem.style.width = "";
    moveItem.classList.toggle("moving");
    moveItem = null;
  }
});