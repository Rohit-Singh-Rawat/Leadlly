import express, { NextFunction } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import User from '../models/user.model';
import mongoose from 'mongoose';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

declare global {
	namespace Express {
		interface Request {
			user?: any;
		}
	}
}
export const authMiddleware = async function (
	req: express.Request,
	res: express.Response,
	next: NextFunction
) {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.json({
			message: 'Invalid Token',
		});
	}
	const token: string = authHeader.split(' ')[1];
	try {
		const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET as Secret);
		const userId = (decoded as JwtPayload).userId;

		if (!mongoose.Types.ObjectId.isValid(userId)) {
			return res.status(400).json({
				message: 'Invalid user Id',
			});
		}
		req.user = await User.findById(userId);
		next();
	} catch (error: any) {
		return res.status(400).json({
			message: 'user not authenticated',
		});
	}
};
