// document.addEventListener("DOMContentLoaded", () => {});\
// import renderData from "./render.js";
import createElementTask from "./render.js";
import task from "./storage.js";

let idTask = null;
document.addEventListener("DOMContentLoaded", () => {
  if (task.length > 0) renderData(task);
});
const addButton = document.getElementById("add-task");

const formContainer = document.getElementById("form-show");
addButton.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});

const closeForm = document.getElementById("close-form");
closeForm.addEventListener("click", () => {
  formContainer.classList.remove("active");
});

// console.log(addButton)
const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const tasktitle = document.getElementById("task").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;
  const id = GetId();
  if (idTask) {
    const data = task.find((t) => t.id === idTask);
    data.tasktitle = tasktitle;
    data.description = description;
    data.date = date;
    idTask = null;
    form.reset();
  } else {
    const data = {
      id,
      tasktitle,
      description,
      date,
      isDone: false,
      onProgress: false,
    };
    task.push(data);
  }
  formContainer.classList.remove("active");
  renderData(task);
});
function renderData(tasks) {
  const cardTodo = document.getElementById("todo-card");
  cardTodo.innerHTML = ``;

  const cardProgress = document.getElementById("progress-card");
  cardProgress.innerHTML = ``;

  const cardDone = document.getElementById("done-card");
  cardDone.innerHTML = ``;
  tasks.forEach((data, index) => {
    const taskElement = createElementTask(data, index, handlerDone, handleOnProgress, handleDelete, handleEdit);

    if (data.isDone) {
      cardDone.appendChild(taskElement);
      cardDone.classList.add("active");
    } else if (data.onProgress) {
      cardProgress.appendChild(taskElement);
      cardProgress.classList.add("active");
    } else {
      cardTodo.classList.add("active");
      cardTodo.appendChild(taskElement);
    }
  });
}
function handlerDone(id) {
  const tasks = task.find((t) => t.id === id);
  if (tasks) {
    tasks.isDone = true;
    renderData(task);
  }
}
function handleOnProgress(taskId) {
  const tasks = task.find((t) => t.id === taskId);
  if (tasks) {
    tasks.onProgress = true;
    renderData(task);
  }
}

function handleDelete(taskId) {
  const index = task.findIndex((t) => t.id === taskId);
  if (index !== -1) {
    task.splice(index, 1);
    renderData(task);
  }
}

const searchInput = document.getElementById("search");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredTask = task.filter((data) => data.tasktitle.toLowerCase().includes(searchTerm));
  renderData(filteredTask);
});

function handleEdit(id) {
  // Menampilkan form edit
  const formShow = document.getElementById("form-show");
  formShow.classList.add("active");

  // Menyimpan ID task yang sedang diedit
  idTask = id;

  // Mencari task berdasarkan ID
  const data = task.find((t) => t.id === id);

  if (data) {
    // Mengisi ulang value input berdasarkan data task
    const taskInput = document.getElementById("task");
    const descriptionInput = document.getElementById("description");
    const dateInput = document.getElementById("date");

    taskInput.value = data.tasktitle;
    descriptionInput.value = data.description;
    dateInput.value = data.date;
  } else {
    console.warn("Task dengan ID tersebut tidak ditemukan");
  }
}

function GetId() {
  return +new Date();
}
