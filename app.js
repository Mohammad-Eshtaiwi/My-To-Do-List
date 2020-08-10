const form = document.querySelector(".task-form form");
const table = document.querySelector("table tbody");
console.log(form, table);
const allTasks = [];
if (localStorage.length > 0) {
  let storedData = JSON.parse(localStorage.getItem("tasks"));
  storedData.forEach((data) => {
    console.log(data);
    allTasks.push(data);
    console.log(allTasks);
  });
}
console.log(allTasks);
function TaskForm(task, date, urquency) {
  this.task = task;
  this.date = date;
  this.urquency = urquency;
}
form.addEventListener("submit", setTask);
function setTask() {
  event.preventDefault();
  console.log(event.path[0]);
  const formPath = event.path[0];
  console.log(formPath[0].value, formPath[1].value, formPath[2].value);
  allTasks.push(
    new TaskForm(formPath[0].value, formPath[1].value, formPath[2].value)
  );

  localStorage.setItem("tasks", JSON.stringify(allTasks));

  populateTasks();
}

function populateTasks() {
  table.innerHTML = "";
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((task) => {
    const tr = document.createElement("tr");
    // tr.setAttribute("taskId");
    for (var data in task) {
      console.log(task[data]);
      if (data === "urquency") {
        const td = document.createElement("td");
        if (task[data] === "low") td.classList.add("green");
        if (task[data] === "medium") td.classList.add("yellow");
        if (task[data] === "high") td.classList.add("red");
        td.innerHTML = task[data];
        tr.appendChild(td);
        continue;
      }
      const td = document.createElement("td");
      td.innerHTML = task[data];
      tr.appendChild(td);
    }
    const deleteBtn = document.createElement("td");
    deleteBtn.innerHTML = "X";
    tr.appendChild(deleteBtn);
    console.log(tr);
    console.log(form);
    table.appendChild(tr);
  });
}
if (localStorage.length != 0) populateTasks();
const btnClearAll = document.querySelector(".clearAll");
btnClearAll.addEventListener("click", clearAll);
function clearAll() {
  localStorage.clear();
  table.innerHTML = "";
}
let deleteRowBtn = document.querySelectorAll(
  "main section:last-of-type table tr td:last-of-type"
);
function deleteTask() {
  console.log(event.path[2].children);
  let rightPath = 0;
  let rightIndex = 0;
  for (let tr = 0; tr < event.path[2].children.length; tr++) {
    if (event.path[2].children[tr] === event.path[1]) {
      rightPath = event.path[2].children[tr];
      rightIndex = tr;
    }
  }
  console.log(rightPath);
}
deleteRowBtn.forEach((btn) => {
  addEventListener("click", deleteTask);
});
