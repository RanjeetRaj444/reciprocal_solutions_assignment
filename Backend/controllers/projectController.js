const Project = require('../models/Project');

const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        const project = new Project({ name, description, user: req.user.id });
        await project.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(400).send(err);
    }
};

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ user: req.user.id });
        res.json(projects);
    } catch (err) {
        res.status(400).send(err);
    }
};

const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).send('Project not found');
        if (project.user.toString() !== req.user.id && req.user.role !== 'Admin') {
            return res.status(403).send('Unauthorized');
        }
        Object.assign(project, req.body);
        await project.save();
        res.json(project);
    } catch (err) {
        res.status(400).send(err);
    }
};

const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).send('Project not found');
        if (project.user.toString() !== req.user.id && req.user.role !== 'Admin') {
            return res.status(403).send('Unauthorized');
        }
        await project.remove();
        res.send('Project removed');
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports = { createProject, getProjects, updateProject, deleteProject };
