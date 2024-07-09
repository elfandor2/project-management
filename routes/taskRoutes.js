const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.post('/projects/:projectId/tasks', taskController.createTask);
router.get('/projects/:projectId/tasks', taskController.getAllTasksFromProject);
router.get('/projects/:projectId/tasks/uncompleted', taskController.uncompletedTasks);
router.put('/tasks/:taskId/complete', taskController.completedTheTask);
router.put('/tasks/:taskId', taskController.updateTask);
router.delete('/tasks/:taskId', taskController.deleteTask);

module.exports = router;