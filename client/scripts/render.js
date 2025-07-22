function createElementTask(data, index, isDoneFn, onProgressFn, deleteFn, editFn) {
  const divCard = document.createElement("div");
  divCard.classList.add("card-todo-item");
  divCard.setAttribute("id", data.id);
  divCard.setAttribute("key", index);

  const cardTitle = document.createElement("p");
  cardTitle.classList.add("card-title");
  cardTitle.innerText = data.tasktitle;

  const cardDescription = document.createElement("p");
  cardDescription.classList.add("card-description");
  cardDescription.innerText = data.description;

  const cardFooter = document.createElement("div");
  cardFooter.classList.add("footer-card");

  const cardDate = document.createElement("div");
  cardDate.classList.add("date");
  const dateIcon = document.createElement("ion-icon");
  dateIcon.setAttribute("name", "calendar-number");
  const dateText = document.createElement("p");
  dateText.innerText = data.date;
  cardDate.append(dateIcon, dateText);

  const buttonActionCard = document.createElement("div");
  buttonActionCard.classList.add("button-action-card");

  // ✅ Tombol Delete (selalu ada)
  const buttonDelete = document.createElement("button");
  buttonDelete.classList.add("delete-task");
  const deleteIcon = document.createElement("ion-icon");
  deleteIcon.setAttribute("name", "trash");
  const deleteText = document.createElement("p");
  deleteText.textContent = "Delete";
  buttonDelete.append(deleteIcon, deleteText);
  buttonDelete.addEventListener("click", () => deleteFn(data.id));

  // 🔁 Kondisi: jika DONE atau ON PROGRESS => hanya tampilkan tombol Edit
  if (data.isDone || data.onProgress) {
    const buttonEdit = document.createElement("button");
    buttonEdit.classList.add("delete-task");
    const editIcon = document.createElement("ion-icon");
    editIcon.setAttribute("name", "create");
    const editText = document.createElement("p");
    editText.textContent = "Edit";
    buttonEdit.append(editIcon, editText);
    buttonEdit.addEventListener("click", () => editFn(data.id));

    buttonActionCard.append(buttonEdit, buttonDelete);
  } else {
    // 🔁 Jika masih to-do => tampilkan tombol Done dan On Progress
    const buttonDone = document.createElement("button");
    buttonDone.classList.add("delete-task");
    const doneIcon = document.createElement("ion-icon");
    doneIcon.setAttribute("name", "checkmark-circle");
    const doneText = document.createElement("p");
    doneText.textContent = "Done";
    buttonDone.append(doneIcon, doneText);
    buttonDone.addEventListener("click", () => isDoneFn(data.id));

    const buttonOnProgress = document.createElement("button");
    buttonOnProgress.classList.add("delete-task");
    const progressIcon = document.createElement("ion-icon");
    progressIcon.setAttribute("name", "speedometer");
    const progressText = document.createElement("p");
    progressText.textContent = "On Progress";
    buttonOnProgress.append(progressIcon, progressText);
    buttonOnProgress.addEventListener("click", () => onProgressFn(data.id));

    buttonActionCard.append(buttonDone, buttonOnProgress, buttonDelete);
  }

  cardFooter.append(cardDate, buttonActionCard);
  divCard.append(cardTitle, cardDescription, cardFooter);

  return divCard;
}

export default createElementTask;
