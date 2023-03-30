
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import fileUpload from 'express-fileupload';

import { connectToDatabase } from './src/utils/database';
import router from './src/routes';
import { HTTP_STATUS_CODE, MESSAGES } from './src/constants';
import { createServer, Server } from 'http';
import { WebSocket } from './src/sockets';

declare global {
  var socketInstance: any;
}

if(process.env.NODE_ENV == 'dev'){
  dotenv.config({ path: `.env` });
} else{
  dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
}

const app = express();

app.use(cors());
app.use(express.json({limit:'100mb'}));
app.use(express.urlencoded({limit:'10mb', extended: true}));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));
app.use(fileUpload({
  createParentPath: true,
  limits: {
      fileSize: 100 * 1024 * 1024
  },
  abortOnLimit: true,
  limitHandler: function(req: Request, res: Response, next: NextFunction) {
      res.status(HTTP_STATUS_CODE.PAYLOAD_TOO_LARGE).send(MESSAGES.ERROR.PAYLOAD_TOO_LARGE)
  }
}));

app.use('/api', router);

const httpServer: Server = createServer(app);

global.socketInstance = new WebSocket(httpServer);


httpServer.listen(process.env.PORT, async () => {
  try{
    await connectToDatabase();
    console.log(`Server started on port = ${process.env.PORT}`);
  }
  catch(error) {
    console.log(`Error occurred while connecting to database.`);
    console.trace(error);
  };
});

