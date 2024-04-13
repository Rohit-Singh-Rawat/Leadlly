
import mongoose from 'mongoose';

export interface ProductDocument extends mongoose.Document{
	id: number,
    name: string,
    description: string,
    price:number,
    category: string,
    createdAt: Date,
    updatedAt: Date

}

const productSchema = new mongoose.Schema<ProductDocument>(
	{
		id: {
			type: Number,
			required: true,
			unique: true
		},
		name: {
			type: String,
			required: true,
		},
		description: String,
		price: {
			type: Number,
			required: true,
		},
		category: String,
	},
	{ timestamps: true }
);

const Product = mongoose.model<ProductDocument>("Product", productSchema)
export default Product;