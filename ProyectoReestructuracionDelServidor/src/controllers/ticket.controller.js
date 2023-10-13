import {ticketService} from "../services/factory.js";


function generateId () {
    return (new Date()).getTime();
};


export const createTicket = async(req, res)=>{
    const data = {
        userID:"12334",
        amount: 12,
        purchaser: "blabla",
        code: generateId(),
        products:[{
            id: "123",
            quantity: 2,}
        ]
    }
    try {
        const ticket = await ticketService.create(data);
        if (ticket) {
            res.send({ status: "200", message: "Ticket creado con exito con ID: " + ticket.id , payload: ticket})
        }
        
        }catch (error) {
            console.error('Error al crear el carrito:', error);
            res.status(500).json({ error: 'Error interno del servidor', details: error.message }); 
        }
    }; 