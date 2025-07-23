const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const router = express.Router();
const dataPath = path.join(__dirname, "../data/db.json");

// Utility function
// const readData = () => JSON.parse(fs.readFileSync(dataPath, "utf8"));
// const writeData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

async function readDb() {
  const raw = await fs.readFile(dataPath, "utf8");
  return JSON.parse(raw);
}

async function writeData(data) {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), "utf-8");
}

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const db = await readDb();
    res.json(db.data || []);
  } catch (eror) {
    console.log(eror);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST a new task
router.post("/", async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const db = await readDb();
    id = +new Date();
    const newTask = { id, title, description, date, isDone: false, onProgress: false };
    db.data.push(newTask);
    await writeData(db);
    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT update a task
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`${req.params.id}`);
    const { title, description, date, isDone, onProgress } = req.body;

    const db = await readDb();
    const idx = db.data.findIndex((t) => t.id === id);
    if (idx === -1) return res.status(404).json({ message: "Not found" });

    db.data[idx] = { id, title, description, date, isDone, onProgress };
    await writeData(db);

    res.json(db.data[idx]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE a task
router.delete("/:id", async (req, res) => {
  let data = await readDb();
  const { id } = req.params;
  const filtered = data.data.filter((t) => t.id != id);
  await writeData({ data: filtered });
  // res.json({ message: "Task deleted" });
});

module.exports = router;
