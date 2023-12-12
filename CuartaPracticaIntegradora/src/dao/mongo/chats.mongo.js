const Chat = require("./models/chatModels");

const findMessages = async () => {
  try {
    return await Chat.find({}).lean();
  } catch (error) {
    throw error;
  }
};

const createMessages = async (data) => {
  try {
    let chat = new Chat(data);
    return await chat.save();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findMessages,
  createMessages,
};
