const Task = require('../models/Task');
const Project = require('../models/Project');

const createTask = async (req, res) => {
    try {
        const { title, description, status, projectId } = req.body;
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).send('Project not found');
        if (project.user.toString() !== req.user.id && req.user.role !== 'Admin') {
            return res.status(403).send('Unauthorized');
        }
        const task = new Task({ title, description, status, project: projectId });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(400).send(err);
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ project: req.params.projectId });
        res.json(tasks);
    } catch (err) {
        res.status(400).send(err);
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).send('Task not found');
        const project = await Project.findById(task.project);
        if (project.user.toString() !== req.user.id && req.user.role !== 'Admin') {
            return res.status(403).send('Unauthorized');
        }
        Object.assign(task, req.body);
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(400).send(err);
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).send('Task not found');
        const project = await Project.findById(task.project);
        if (project.user.toString() !== req.user.id && req.user.role !== 'Admin') {
            return res.status(403).send('Unauthorized');
        }
        await task.remove();
        res.send('Task removed');
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
