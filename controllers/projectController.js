const Project = require('../models/project.js');

// Create new project
exports.createProject = async (req, res) => {
    const { name, description } = req.body;
    if(!name){
        return res.status(400).json({ error: 'Nama projek harus diisi.'})
    };

    try {
        const project = new Project({ name, description });
        await project.save();
        res.status(201).json({ 
            message: "Proyek berhasil dibuat",
            data: project
        });
    } catch (error) {
        res.status(500).json( { error: 'Server error : ' + error });
    };
};

// Get all projects
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        
        if(projects.length === 0) return res.status(200).json({ message: "Data project masih kosong." })
        res.status(201).json({ 
            message: "Berhasil mendapatkan data project.",
            data: projects
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error : ' + error });
    }
};

// Get project by id
exports.getProjectById = async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findById(projectId);

        if(!project) return res.status(404).json({ error: 'Data project tidak dapat ditemukan' });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: 'Server error : ' + error });
    }
};

// Update project
exports.updateProject = async (req, res) => {
    const { name, description } = req.body;

    try {
        const projectId = req.params.id;
        const project = await Project.findByIdAndUpdate( projectId, {name, description}, { new: true, runValidators: true } );
        
        if(!project) return res.status(404).json({ error: 'Data project tidak dapat ditemukan' });

        res.status(200).json({ 
            message: "Proyek berhasil diupdate",
            data: project
        });
    } catch (error) {
        res.status(500).json( { error: 'Server error : ' + error });
    };
};

// Delete project
exports.deleteProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findByIdAndDelete(projectId);

        if (!project) return res.status(404).json({ error: 'Data project tidak dapat ditemukan' });

        res.status(200).json({ message: 'Project berhasil di delete' })
    } catch (error) {
        res.status(500).json( { error: 'Server error : ' + error });
    }
};