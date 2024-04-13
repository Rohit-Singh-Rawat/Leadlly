import z from 'zod';
export const userEditSchema = z
	.object({
		currentPassword: z.string().min(8).optional(),
		newPassword: z.string().min(8).optional(),
		firstName: z.string().max(150).optional(),
		lastName: z.string().max(150).optional(),
	})
	.refine((data) => {
		if (Object.keys(data).length == 0) {
			return false;
		}
		if (data.newPassword && !data.currentPassword) {
			return false;
		}
		return true;
	});
