import express from 'express';
import { productSchema } from '../schemas/productSchema';
import Product from '../models/product.model';

export const createProduct = async (
	req: express.Request,
	res: express.Response
) => {
	const { success } = await productSchema.safeParse(req.body);
	if (!success) {
		return res.status(411).json({
			message: 'Invalid Product details',
		});
	}

	let existingProduct = await Product.findOne({ 'id': req.body.productId });
	if (existingProduct) {
		return res.status(411).json({
			message: 'Product Already Exist',
		});
	}

	const product = new Product({
		id: req.body.productId,
		name: req.body.productName,
		description: req.body.description,
		price: req.body.price,
		category: req.body.category,
	});
	await product.save();
	res.json({
		message: 'Product Saved successfully',
	});
};
export const getProducts = async (
	req: express.Request,
	res: express.Response
) => {
	const products = await Product.find();
	res.json({
		products,
	});
};
