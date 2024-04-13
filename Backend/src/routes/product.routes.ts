import express from 'express';
import { authMiddleware } from '../middlewares/authmiddleware';
import { createProduct, getProducts } from '../controllers/product.controller';

const router = express.Router();
router.route('/product').post(authMiddleware, createProduct);
router.route('/products').get(authMiddleware, getProducts);

export default router;
