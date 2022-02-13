import { config } from 'dotenv';
import server from './server';

config(); // Setup envrironment variables

server()
	.listen()
	.then(({ url }) => {
		console.log(`🚀 Server ready at ${url}`);
	});
