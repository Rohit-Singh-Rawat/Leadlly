import mongoose from 'mongoose';
import { Schema, boolean, string } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextFunction } from 'express';

export interface userInput {
	email: string;
	password: string;
	lastName: string;
	firstName: string;
}

export interface UserDocument extends userInput, mongoose.Document {
	fullName: string;
	createdAt: Date;
	updatedAt: Date;
	checkPassword(userPassword: string): Promise<boolean>;
}

const userSchema: mongoose.Schema<UserDocument> = new mongoose.Schema(
	{
		email: {
			type: String,
			required: [true, 'email is required'],
			unique: true,
			match: [
				/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
				'please use a valid email address',
			],
		},
		password: {
			type: String,
			required: true,
			minlength: 8,
		},
		firstName: {
			type: String,
			required: true,
			trim: true,
			maxlength: 30,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
			maxlength: 30,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.virtual('fullName').get(function () {
	return `{${this.firstName} ${this.lastName}}`;
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	const saltRound = 10;

	const salt = await bcrypt.genSalt(saltRound);
	this.password = await bcrypt.hash(this.password, salt);
	return next();
});

userSchema.methods.checkPassword = async function (userPassword: string) {
	return await bcrypt.compare(userPassword, this.password);
};

const User = mongoose.model<UserDocument>('User', userSchema);

export default User ;
