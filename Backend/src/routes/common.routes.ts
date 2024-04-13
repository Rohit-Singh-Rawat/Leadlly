import express from 'express';

const router = express.Router();

import userRouter from './user.routes';

import productRouter from './product.routes';

router.use('/user', userRouter);

router.use('/product', productRouter);

export default router;
