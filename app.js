import express from 'express';
import 'dotenv/config'

const app = express();

app.use(express.json());

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`app is listening on port: ${port}`);
});