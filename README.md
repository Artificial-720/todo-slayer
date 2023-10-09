# To-Do Slayer
To-Do Slayer is a engaging to-do list application. Designed to increase productivity by gamifying a traditonal task list.

## Architecture
This project runs in two seperate parts a Frontend, a Backend and a Database.
### File structure
TODO
### Frontend
Is using plan JavaScript.

### Backend
Is using Django

### Database
PostgreSQL



## Development
TODO how to work on the project

JavaScript
making a AJAX call

### Submiting a form with AJAX
prevent default
```js
const myForm = document.getElementById("ID_OF_FORM_HERE");
myForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendData();
});
```
send data
```js
function sendData() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", myForm.action, true);

  const formData = new FormData(myForm);

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
```



## Deployment
TODO how to deploy the project





## User Documentation
TODO how to use the project
user guide
installation guide? not sure if this should be here




- Flow of program
- login page > select from list or enter a new name
- show current monster and its hp, list of tasks, have buttons to add,update,remove,markdone
