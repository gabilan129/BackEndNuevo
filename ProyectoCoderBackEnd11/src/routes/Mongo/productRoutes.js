import express from 'express';
import { ProductModel } from '../../models/productModel.js';
import { createProduct, getProducts } from '../../controllers/product.controller.js';

const router = express.Router();

//Create Product
router.post('/', createProduct );

//Get all with filters
router.get('/', getProducts);


export default router;