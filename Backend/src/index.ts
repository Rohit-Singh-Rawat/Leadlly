import 'dotenv/config';
import app from './app';
import connectDB from './db';

connectDB()
	.then(() => {
		app.listen(process.env.PORT || 3000, () => {
			console.log(`Server is running at port : ${process.env.PORT}`);
		});
	})
	.catch((error: Error) => {
        console.error(error)
    });
