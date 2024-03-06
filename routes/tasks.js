var express = require('express');
const fetchTrelloTasks = require("../engine/getTasks");
const addTasksToTodoist = require("../engine/todoistConn");
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {

    const { qty_tasks } = req.query;

    let tasks = await fetchTrelloTasks();

    tasks = qty_tasks ? tasks.slice(0, qty_tasks) : tasks.slice(0, 5);

    console.log("Loading ", tasks.length, " tasks to Todoist...");
    await addTasksToTodoist(tasks);
    res.send('Tasks synchronized successfully!');
});

module.exports = router;
