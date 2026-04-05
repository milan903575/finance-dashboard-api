import express from 'express';
import 'dotenv/config'
import routes from './src/modules/router.js';
import errorHandler from './src/middleware/error.middleware.js';

const app = express();

app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`app is listening on port: ${port}`);
});