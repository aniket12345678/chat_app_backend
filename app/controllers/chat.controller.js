const { Op } = require("sequelize");
const { ResponseHandler } = require("../middleware/middleware");
const { ChatModel } = require("../models/chat.model");

const AddMessage = async (req, res) => {
    try {
        const store = req.body;
        await ChatModel.create({
            receiver_id: store.receiver_id.selected_id,
            sender_id: store.loggedinUser.UserExists.id,
            message: store.message
        });
        return ResponseHandler.success(res, 'Message send successfully', 200);
    } catch (error) {
        return ResponseHandler.error(res, error);
    }
}

const Listing = async (req, res) => {
    try {
        const store = req.body;
        const data = await ChatModel.findAll({
            attributes: ["receiver_id", "sender_id", "message"],
            where: {
                [Op.or]: [
                    {
                        receiver_id: store.receiver_id,
                        sender_id: store.loggedinUser.UserExists.id,
                    },
                    {
                        receiver_id: store.loggedinUser.UserExists.id,
                        sender_id: store.receiver_id,
                    },
                ]
            }
        });
        return ResponseHandler.success(res, 'User logged in successfully', 200, {
            data: data,
        });
    } catch (error) {
        return ResponseHandler.error(res, error);
    }
}

module.exports = { AddMessage, Listing };