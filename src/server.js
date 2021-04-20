import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';

const server = express();

const port = process.env.PORT;

const whitelist = [process.env.FE_URL_DEV, process.env.FE_URL_PROD];

const corsOptions = {
	origin: function (origin, next) {
		if (whitelist.indexOf(origin) !== -1) {
			console.log('ORIGIN ', origin);
			// origin found in whitelist
			next(null, true);
		} else {
			// origin not found in the whitelist
			next(new Error('Not allowed by CORS'));
		}
	},
};

server.use(cors(corsOptions));

app.use('/books', booksRoutes);

console.log(listEndpoints(app));

server.listen(port, () => {
	if (process.env.NODE_ENV === 'production') {
		// no need to configure it manually on Heroku
		console.log('Server running on cloud on port: ', port);
	} else {
		console.log('Server running locally on port: ', port);
	}
});
