const Task = require('../models/task.js');
const Project = require('../models/project.js');

// Create new Task
exports.createTask = async (req, res) => {
    const { projectId } = req.params;
    const { title, description, startTime, endTime } = req.body;
    const waktuMulai = new Date(startTime);
    const waktuAkhir = new Date(endTime);

    if(!title || !startTime || !endTime) return res.status(400).json({ error: 'Title, Waktu mulai, and Waktu berakhir harus diisi' });

    if(waktuMulai >= waktuAkhir) {
        return res.status(400).json({ error: 'Waktu mulai harus lebih awal dari waktu selesai.' })
    };

    try {
        const project = await Project.findById(projectId);
        if(!project) return res.status(404).json({ error: 'Data project tidak dapat ditemukan' });

        const tasks = await Task.find({ projectId });
        for (const task of tasks) {
            const waktuMulaiTaskSebelumnya = new Date(task.startTime);
            const waktuAkhirTaskSebelumnya = new Date(task.endTime);
            if((waktuMulai < waktuAkhirTaskSebelumnya && waktuMulai >= waktuMulaiTaskSebelumnya) || (waktuAkhir > waktuMulaiTaskSebelumnya && waktuAkhir <= waktuAkhirTaskSebelumnya)){
                return res.status(400).json({ error: 'Waktu tugas tumpang tindih dengan tugas yang sudah ada' });
            }
        }

        const task = new Task({ projectId, title, description, startTime, endTime });
        project.task.push(task);
        await project.save();
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Server error : ' + error });
    }
};

// Get all tasks from project
exports.getAllTasksFromProject = async (req, res) => {
    const { projectId } = req.params;
    try {
        const tasks = await Task.find({ projectId })
        res.status(200).json({ tasks })
    } catch (error) {
        res.status(500).json({ error: 'Server error ' + error });
    }
};

// Update task
exports.updateTask = async (req, res) => {
    const { taskId } = req.params;
    const { title, description, startTime, endTime } = req.body;
    try {
        const task = await Task.findById(taskId);
        if(!task) return res.status(400).json({ error: 'Data task tidak dapat ditemukan.' });
        
        if (title) task.title = title;
        if (description) task.description = description;
        if (startTime) task.startTime = new Date(startTime);
        if (endTime) task.endTime = new Date(endTime);

        if (task.startTime >= task.endTime) {
            return res.status(400).json({ error: 'Waktu mulai harus lebih awal dari waktu selesai.' });
        };

        // Cek tugas sebelumnya
        const previousTask = await Task.findOne({
            _id: { $ne: task._id }, // tidak termasuk tugas yang sedang di update
            projectId: task.projectId,
            $and: [ { startTime: { $lt: task.endTime }}, { startTime: { $gte: task.startTime }} ],
            $and: [ { endTime: { $gt: task.startTime }}, { endTime: { $lte: task.endTime }} ]
        });

        if(previousTask) return res.status(400).json({ error: 'Waktu tugas tumpang tindih dengan tugas yang sudah ada' });

        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Server error : ' + error });
    }
};

// Delete task
exports.deleteTask = async (req, res) => {
    const { taskId } = req.params;
    try {
        const task = await Task.findByIdAndDelete(taskId);
        if(!task) res.status(400).json({ error: 'Data task tidak dapat ditemukan.' });
        res.status(200).json({ message: 'Task berhasil dihapus.' });
    } catch (error) {
        res.status(500).json({ error: 'Server error : ' + error });
    }
};

// Completed the task
exports.completedTheTask = async (req, res) => {
    const { taskId } = req.params;
    try {
        const task = await Task.findOneAndUpdate({_id: taskId}, {completed: true}, { new: true ,runValidators: true });
        if(!task) res.status(400).json({ error: 'Data task tidak dapat ditemukan.' });
        res.status(200).json({ message: 'Task berhasil diselesaikan.' });
    } catch (error) {
        res.status(500).json({ error: 'Server error : ' + error });
    }
};

// Uncompleted tasks
exports.uncompletedTasks = async (req, res) => {
    const { projectId } = req.params;
    try {
        const tasks = await Task.find({ projectId, completed: false });
        if(tasks.length === 0) return res.status(200).json({ message: "Data task yang belum selesai kosong." });
        res.status(200).json({ tasks })
    } catch (error) {
        res.status(500).json({ error: 'Server error : ' + error });
    }
};
