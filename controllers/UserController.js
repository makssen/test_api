const UserService = require("../services/UserService");

class UserController {
    async create(req, res) {
        try {
            const user = await UserService.create(req.body);
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getAll(req, res) {
        try {
            const { nick, status, limit } = req.query;
            const options = {
                limit: limit || 0
            };
            let users;
            if (!nick && !status) {
                users = await UserService.getAll({}, options);
            }
            if (nick && !status) {
                users = await UserService.getAll({ nick }, options);
            }
            if (!nick && status) {
                users = await UserService.getAll({ status }, options);
            }
            if (nick && status) {
                users = await UserService.getAll({ nick, status }, options);
            }
            return res.json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getById(req, res) {
        try {
            const user = await UserService.getById(req.params.id);
            return res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async update(req, res) {
        try {
            const updatedUser = await UserService.update(req.body);
            return res.json(updatedUser);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    async delete(req, res) {
        try {
            const user = await UserService.delete(req.params.id);
            return res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = new UserController();