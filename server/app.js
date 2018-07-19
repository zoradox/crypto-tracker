import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

import routes from './routes';

// initialize loading an environment variable
dotenv.config();

const app = express();

mongoose.Promise = require('bluebird');
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const db = mongoose.connection;

// database connection event handlers
db.once('open', () => {
  console.log('Successfully connected to the database, Have Fun!!!');
});
db.on('error', () => {
  console.log('Couldn\'t connect to the database');
});

// app middlewares
app.use(express.static(path.resolve(__dirname, '../build')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

routes(app);

// app.get('/', (req, res) => {
//   return res.json('Welcome home');
// });

app.get('*', (req, res) => {
  res.send('Oops! Seems like you are lost.');
});

export default app;
