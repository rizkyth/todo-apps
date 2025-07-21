// document.addEventListener("DOMContentLoaded", () => {});
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

// console.log(addButton);
