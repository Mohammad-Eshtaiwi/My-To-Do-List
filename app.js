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
    console.log(task);
    for (var data in task) {
      console.log(task[data]);
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
