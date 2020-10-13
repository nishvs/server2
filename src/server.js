import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

let configPath;
if(process.env.NODE_ENV == 'test'){
    configPath = path.resolve(`../${process.env.NODE_ENV}.env`)
}

dotenv.config({ path: path.resolve(`./${process.env.NODE_ENV}.env`)});

import { buildConnectionUrl } from './helper/mongooseConfig'

const app = express();
const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

const initMongoConnection = async () => {
    const mongoUrl = buildConnectionUrl();
    await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch((err)=>{
        console.log('Unable to connect to MongoDB:',mongoUrl,err);
    });
}

initMongoConnection();
app.listen(process.env.PORT, () =>
  console.log(`Server 2 listening on port ${process.env.PORT}!`),
);

module.exports = app;