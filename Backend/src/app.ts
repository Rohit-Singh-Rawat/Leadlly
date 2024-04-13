import express from 'express';
import cors from 'cors';
import rootRouter from './routes/common.routes';
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/v1', rootRouter);

app.use(
	(
		err: any,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		res.status(err.status || 500).json({
			message: err.message || 'Oops! Something went wrong',
		});
	}
);
export default app;
