
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
}

function readTask() {

}

function updateTask() {

}

function destroyTask() {

}