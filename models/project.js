const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nama Projek tidak boleh kosong']
    },
    description: {
        type: String,
        required: false
    },
    task: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    ]
},{
    capped: { size: 1024 },
    bufferCommands: false,
    autoCreate: false // disable `autoCreate` since `bufferCommands` is false
}
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
