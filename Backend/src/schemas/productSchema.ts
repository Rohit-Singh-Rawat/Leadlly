import { z } from 'zod';

export const productSchema = z.object({
	productId: z.number().positive(),
	productName: z.string().min(1).max(50),
	description: z.string().min(10).max(300),
	price: z.number().positive(),
	category: z.string(),
});
