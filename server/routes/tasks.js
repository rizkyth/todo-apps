const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dataPath = path.join(__dirname, "../data/db.json");

// Utility function
const readData = () => JSON.parse(fs.readFileSync(dataPath, "utf8"));
const writeData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

// GET all tasks
router.get("/", (req, res) => {
  const data = readData();
  res.json(data);
});

// POST a new task
router.post("/", (req, res) => {
  const data = readData();
  const newTask = req.body;
  newTask.id = Date.now();
  data.push(newTask);
  writeData(data);
  res.status(201).json(newTask);
});

// PUT update a task
router.put("/:id", (req, res) => {
  const data = readData();
  const { id } = req.params;
  const index = data.findIndex((t) => t.id == id);

  if (index !== -1) {
    data[index] = { ...data[index], ...req.body };
    writeData(data);
    res.json(data[index]);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// DELETE a task
router.delete("/:id", (req, res) => {
  let data = readData();
  const { id } = req.params;
  data = data.filter((t) => t.id != id);
  writeData(data);
  res.json({ message: "Task deleted" });
});

module.exports = router;
