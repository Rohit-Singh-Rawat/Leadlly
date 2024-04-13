import { signInSchema } from '../schemas/signInSchema';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import express from 'express';
import { registerSchema } from '../schemas/registerSchema';
import User from '../models/user.model';
import { userEditSchema } from '../schemas/userEditSchema';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export const registerUser = async (
	req: express.Request,
	res: express.Response
) => {
	const { success } = registerSchema.safeParse(req.body);
	if (!success) {
		return res.status(411).json({
			message: 'Invalid inputs',
		});
	}
	const existingUser = await User.findOne({ email: req.body.email });

	if (existingUser) {
		return res.status(411).json({
			message: 'User Already Exist',	
		});
	}

	const user =await User.create({
		email: req.body.email,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		password: req.body.password,
	});
	const userId = user._id;
	await user.save();

	const token = jwt.sign({ userId }, ACCESS_TOKEN_SECRET as Secret);

	res.json({
		message: 'user created successfully',
		token: token,
	});
};
export const signInUser = async (
	req: express.Request,
	res: express.Response
) => {
	const { success } = await signInSchema.safeParse(req.body);
	if (!success) {
		return res.status(411).json({
			message: 'Invalid Inputs',
		});
	}

	let user = await User.findOne({ email: req.body.email });
	if (!user) {
		return res.status(411).json({
			message: 'Email not found',
		});
	}

	if (await user.checkPassword(req.body.password)) {
		const token = jwt.sign(
			{
				userId: user._id,
			},
			ACCESS_TOKEN_SECRET as Secret
		);
		return res.json({
			token,
		});
	} else {
		return res.status(411).json({
			message: 'Wrong Password!',
		});
	}
};
export const logoutUser = async (
	req: express.Request,
	res: express.Response
) => {
	return res.status(200).json({ message: 'User logged Out' });
};

export const EditUser = async (req: express.Request, res: express.Response) => {
	const { success } = await userEditSchema.safeParse(req.body);

	if (!success) {
		return res.status(411).json({
			message: 'Invalid inputs',
		});
	}
	const user = req?.user;
	if (!user) {
		return res.status(403).json({
			message: 'User not found',
		});
	}

	if (req.body.newPassword && req.body.currentPassword) {
		if (await user.checkPassword(req.body.newPassword)) {
			await User.findByIdAndUpdate(user._id, req.body);
			res.json({
				message: 'Updated successfully',
			});
		} else {
			res.status(411).json({
				message: 'Invalid Password',
			});
		}
	} else {
		await User.findByIdAndUpdate(user._id, req.body);
		res.json({
			message: 'Updated successfully',
		});
	}
};
