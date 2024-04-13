import { z } from 'zod';

export const signInSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z
		.string()
		.trim()
		.min(8, { message: 'password should be minimum of 8 length' }),
});
