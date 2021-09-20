const User = require("../models/User");

class UserService {
    async create(user) {
        const createdUser = await User.create(user);
        return createdUser;
    }

    async getAll(obj = {}, options) {
        const users = await User.find(obj).limit(Number(options.limit)).exec();
        return users;
    }

    async getById(id) {
        if (!id) {
            throw new Error('id not specified');
        }
        const user = await User.findById(id);
        return user;
    }

    async update(user) {
        if (!user._id) {
            throw new Error('id not specified');
        }
        const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true });
        return updatedUser;
    }

    async delete(id) {
        if (!id) {
            throw new Error('id not specified');
        }
        const user = await User.findByIdAndDelete(id);
        return user;
    }
}

module.exports = new UserService();