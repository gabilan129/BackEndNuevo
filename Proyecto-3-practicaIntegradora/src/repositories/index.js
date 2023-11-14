import { Product, Cart, Ticket } from '../dao/factory.js'

import ProductRepository from './product.repository.js'
import CartRepository from './cart.repository.js'
import TicketRepository from './ticket.repository.js'

export const ProductService = new ProductRepository(new Product())

export const CartService = new CartRepository(new Cart())

export const TicketService = new TicketRepository(new Ticket())