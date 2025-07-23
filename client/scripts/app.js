// document.addEventListener("DOMContentLoaded", () => {});\
// import renderData from "./render.js";
import { apiUpdateTask, apiGetTask, apiCreateTask, apiDelete } from "./api.js";
import createElementTask from "./render.js";
import task from "./storage.js";
const TaskStorage = "task";
let idTask = null;
document.addEventListener("DOMContentLoaded", async () => {
  if (Storage !== undefined) {
    const getTask = await apiGetTask();
    // loadFromLocalStorage();
    if (!getTask) return;

    console.log(task);
    task.push(...getTask);
    // console.log(getTask);
    renderData(getTask);
  }
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

const form = document.getElementById("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("task").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;

  if (idTask) {
    const data = task.find((t) => t.id === idTask);
    data.title = title;
    data.description = description;
    data.date = date;
    data.isDone;
    data.onProgress;
    await apiUpdateTask({ id: idTask, title, description, date, isDone: data.isDone, onProgress: data.onProgress });
    idTask = null;
    form.reset();
  } else {
    const data = {
      title,
      description,
      date,
    };
    await apiCreateTask(data);
    task.push(data);
    saveToLocalStorage();
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
    apiUpdateTask(tasks);
    renderData(task);
    saveToLocalStorage();
  }
}
function handleOnProgress(taskId) {
  const tasks = task.find((t) => t.id === taskId);
  console.log(tasks);
  if (tasks) {
    tasks.onProgress = true;
    apiUpdateTask(tasks);
    renderData(task);
    saveToLocalStorage();
  }
}

async function handleDelete(id) {
  const tasks = await apiDelete({ id });
  renderData(tasks);
  saveToLocalStorage();
}

const searchInput = document.getElementById("search");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredTask = task.filter((data) => data.title.toLowerCase().includes(searchTerm));
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

    taskInput.value = data.title;
    descriptionInput.value = data.description;
    dateInput.value = data.date;
  } else {
    console.warn("Task dengan ID tersebut tidak ditemukan");
  }
}

function saveToLocalStorage() {
  localStorage.setItem(TaskStorage, JSON.stringify(task));
}

// function loadFromLocalStorage() {
//   const data = localStorage.getItem(TaskStorage);
//   if (data) {
//     const takss = JSON.parse(data);
//     task.push(...takss);
//   }
