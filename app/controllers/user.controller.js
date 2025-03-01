const { Op } = require("sequelize");
const { ResponseHandler } = require("../middleware/middleware");
const { UserModel } = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SignUp = async (req, res) => {
    try {
        const store = req.body;
        const UserExists = await UserModel.findOne({ where: { email: store.email } });
        if (UserExists) {
            return ResponseHandler.success(res, 'User already exists', 400);
        }
        const salt = bcrypt.genSaltSync(10);
        store.password = bcrypt.hashSync(store.password, salt);
        await UserModel.create(store);
        return ResponseHandler.success(res, 'User signed up successfully', 200);
    } catch (error) {
        return ResponseHandler.error(res, error);
    }
}

const SignIn = async (req, res) => {
    try {
        const store = req.body;
        const UserExists = await UserModel.findOne({ where: { email: store.email } });
        if (!UserExists) {
            return ResponseHandler.success(res, 'User does not exists', 400);
        }
        const isPassword = bcrypt.compareSync(store.password, UserExists.password);
        if (!isPassword) {
            return ResponseHandler.success(res, 'Password is wrong', 400);
        }
        return ResponseHandler.success(res, 'User logged in successfully', 200, {
            user: UserExists,
            token: jwt.sign({ UserExists }, process.env.JWT_KEY)
        });
    } catch (error) {
        return ResponseHandler.error(res, error);
    }
}

const fetchAllUsers = async (req, res) => {
    try {
        const store = req.body;
        const AllUsers = await UserModel.findAll({
            attributes: ["id", "user_name"],
            where: {
                id: { [Op.ne]: store.loggedinUser.UserExists.id },
            },
        });
        return ResponseHandler.success(res, 'User signed up successfully', 200, AllUsers);
    } catch (error) {
        return ResponseHandler.error(res, error);
    }
}

module.exports = { SignIn, SignUp, fetchAllUsers };