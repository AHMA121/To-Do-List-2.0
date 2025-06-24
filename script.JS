let form = document.getElementById("todo-form");
let input = document.getElementById("todo-input");
let list = document.getElementById("todo-list");

let tasks = [];

let saved = localStorage.getItem("tasks");
if (saved) {
  tasks = JSON.parse(saved);
  displayTasks();
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let taskText = input.value.trim();
  if (taskText === "") return;

  tasks.push({ text: taskText, done: false, editing: false });
  input.value = "";
  displayTasks();
});

function displayTasks() {
  list.innerHTML = "";

  tasks.forEach(function (task, index) {
    let li = document.createElement("li");

    if (task.editing) {
      let inputEdit = document.createElement("input");
      inputEdit.type = "text";
      inputEdit.value = task.text;

      let saveBtn = document.createElement("button");
      saveBtn.textContent = "💾";
      saveBtn.addEventListener("click", function () {
        task.text = inputEdit.value.trim();
        task.editing = false;
        displayTasks();
      });

      li.appendChild(inputEdit);
      li.appendChild(saveBtn);
    } else {
      li.textContent = task.text;

      if (task.done) {
        li.style.textDecoration = "line-through";
      }

      li.addEventListener("click", function () {
        task.done = !task.done;
        displayTasks();
      });

      let deleteBtn = document.createElement("button");
      deleteBtn.textContent = "❌";
      deleteBtn.style.marginLeft = "10px";
      deleteBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        tasks.splice(index, 1);
        displayTasks();
      });

      let editBtn = document.createElement("button");
      editBtn.textContent = "✏️";
      editBtn.style.marginLeft = "5px";
      editBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        task.editing = true;
        displayTasks();
      });

      li.appendChild(deleteBtn);
      li.appendChild(editBtn);
    }

    list.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
