
// Similar CRUD operations for Issue, User, Tag, and Comment...

const { where } = require("sequelize");
const { Project, User } = require("./models")


const createItem = async (req, res, Model) => {
    try {
        const item = await Model.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const createTag = async (req, res, Model) => {
    try {
        const tagExist = await Model.findOne({ where: { name: req.body.name } })
        if (tagExist) return res.status(201).json(tagExist);
        const tag = await Model.create(req.body)
        res.status(201).json(tag);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const readItems = async (req, res, Model) => {
    try {
        const items = await Model.findAll();
        res.json(items);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const readItemsUser = async (req, res, Model) => {
    try {
        const item = await Model.findAll({ where: { userId: req.userId } })
        res.json(item)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const readProjectsUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId)
        if (!user) return res(404).json({ error: "User not found" })
        const projects = await user.getProjects()
        res.json(projects)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const readItemsProject = async (req, res, Model) => {
    try {
        const project = await Project.findByPk(req.params.projectId)
        const item = await Model.findAll({ where: { ProjectId: req.params.projectId } })
        res.json({ item, project })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const readItem = async (req, res, Model) => {
    try {
        const item = await Model.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updateItem = async (req, res, Model) => {
    try {
        const item = await Model.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        await item.update(req.body);
        res.json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteItem = async (req, res, Model) => {
    try {
        const item = await Model.findByPk(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        await item.destroy();
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createItem,
    updateItem,
    deleteItem,
    readItem,
    readItems,
    readItemsUser,
    readProjectsUser,
    createTag,
    readItemsProject
}  