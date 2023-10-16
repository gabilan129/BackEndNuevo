import {ticketService} from "../services/factory.js";



export const createTicket = async(req, res)=>{
    const data = req.body.cartId;
    try {
        const response = await ticketService.create(data);
        if (response) {
            res.send({ status: "200", message: "Ticket creado con exito con ID: " + response.id , payload: response})
            res.render('ticket', response)
        }
        
        }catch (error) {
            console.error('Error al crear el carrito:', error);
            res.status(500).json({ error: 'Error interno del servidor', details: error.message }); 
        }
    }; 