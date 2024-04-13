import { z } from 'zod';

export const registerSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	firstName: z
		.string()
		.max(30, { message: 'first name should less than 20 character' }),

	lastName: z
		.string()
		.max(30, { message: 'last name should less than 20 character' }),
	password: z
		.string()
		.trim()
		.min(8, { message: 'password should be minimum of 8 length' }),
});
