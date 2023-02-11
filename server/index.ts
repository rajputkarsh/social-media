
import express, {Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

import { connectToDatabase } from './src/utils/database';
import router from './src/routes';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();

app.use(cors());
app.use(express.json({limit:'100mb'}));
app.use(express.urlencoded({limit:'10mb', extended: true}));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));


app.use('/api', router);

app.listen(process.env.PORT, async () => {
  try{
    await connectToDatabase();
    console.log(`Server started on port = ${process.env.PORT}`);
  }
  catch(error) {
    console.log(`Error occurred while connecting to database.`);
    console.trace(error);
  };
});

