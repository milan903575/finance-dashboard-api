import express from 'express';
import 'dotenv/config'
import routes from './src/modules/router.js';

const app = express();

app.use(express.json());

app.use('/api', routes);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`app is listening on port: ${port}`);
});