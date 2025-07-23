async function apiUpdateTask({ id, title, description, date, isDone, onProgress }) {
  console.log(id);
  const response = await fetch(`http://localhost:3000/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, title, description, date, isDone, onProgress }),
  });
  //   if (response.status !== 201) throw new Error("Failed to create task");
  console.log(response.json());
  //   return response.json();
}

async function apiGetTask() {
  const response = await fetch("http://localhost:3000/tasks");
  if (!response.ok) throw new Error("Failed to get task");
  return response.json();
}

async function apiCreateTask({ title, description, date }) {
  const response = await fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, date }),
  });
  if (response.status !== 201) throw new Error("Failed to create task");
  return response.json();
}

async function apiDelete({ id }) {
  console.log(id);
  const response = await fetch(`http://localhost:3000/tasks/${id}`, {
    method: "DELETE",
  });
  if (response.status !== 200) throw new Error("Failed to delete task");
  return response.json();
}
export { apiCreateTask, apiUpdateTask, apiGetTask, apiDelete };
