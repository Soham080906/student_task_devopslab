const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

let tasks = [
    { id: 1, title: "Complete Git Assignment", completed: false },
    { id: 2, title: "Prepare Jenkins Setup", completed: false }
];

app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
    const task = {
        id: Date.now(),
        title: req.body.title,
        completed: false
    };

    tasks.push(task);
    res.status(201).json(task);
});

app.put("/api/tasks/:id", (req, res) => {
    const task = tasks.find(t => t.id === Number(req.params.id));

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    task.completed = !task.completed;
    res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
    tasks = tasks.filter(t => t.id !== Number(req.params.id));
    res.json({ message: "Task deleted" });
});

app.listen(PORT, () => {
    console.log(`Student Task Manager running on port ${PORT}`);
});
