const Ticket = require("./models/ticketModels");

const createTicket = async (data) => {
  try {
    let ticket = new Ticket(data);
    return await ticket.save();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTicket,
};
