// BOCK 1: Import dependencies
const express = require("express");
const Task = require("../model/Task");//Imports the Task model.

const router = express.Router();//Creates a router for task-related routes.

// BLOCK 2: GET all tasks
//Fetches all tasks from the database.
//Sends the tasks as a JSON response.
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// BLOCK 3: POST a new task
router.post("/", async (req, res) => {
  const { title } = req.body;
  console.log("Received title:", title); // Debugging log

  if (!title) {
    return res.status(400).json({ error: "Task title is required" });
  }

  try {
    const newTask = new Task({ title });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// BLOCK 4: DELETE a task
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// BLOCK 5: UPDATE a task
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // Return the updated task
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
});

// BLOCK 6: Export the router
module.exports = router;