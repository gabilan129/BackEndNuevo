import express from 'express';
import { creatNewCart, searchCart, putProductToCart, deleteProductFromCart, cleanCart, downQuantity, renderCart } from '../../controllers/cart.controller.js';

const router = express.Router();

//Creamos un carrito
router.post('/', creatNewCart);

// Buscamos el carrito de compra especifico
router.get ('/search/:cid', searchCart);

//Agregamos un producto especifico al carrito
router.put('/:cid/products/add/:pid', putProductToCart);

//Bajamos la cantidad de un producto especifico al carrito o lo eliminamos en el caso de solo quedar uno
router.delete('/:cid/products/reduce/:pid', downQuantity);

//Eliminamos el producto del carrito
router.delete('/:cid/products/delete/:pid', deleteProductFromCart);

//limipamos el carrito de compras
router.put('/:cid/clean', cleanCart);

//renderizado de carrito de compras

router.get('/:cid', renderCart /* async (req, res) => {
    let cid = req.params.cid;
    let page = parseInt(req.query.page);
    if (!page) page = 1;
    
    const cartProducts= await CartModel.paginate({_id : cid},{page, lean: true, populate: {path : 'products.product'}  })

    if (!cartProducts) {
            return res.status(404).send('Carrito no encontrado');
    }

    let prevLink = cartProducts.hasPrevPage ? `http://localhost:${PORT}/carts?page=${cartProducts.prevPage}` : '';
    let nextLink = cartProducts.hasNextPage ? `http://localhost:${PORT}/carts?page=${cartProducts.nextPage}` : '';
    let isValid = !(cartProducts.page <= 0 || cartProducts.page > cartProducts.totalPages)
    res.render('carts', { cartProducts, prevLink, nextLink, isValid })
} */)

export default router;