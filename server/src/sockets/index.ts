import { Server } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { SOCKET } from "../constants";

export class WebSocket{

  private _io: SocketIOServer;

  constructor(httpServer: Server){

    // initialise IO Object
    this._io = new SocketIOServer(httpServer, 
      {
        cors: {
          origin: "*",
          credentials: true,
        }
      }
    );

    this._io.on('connection', (socket: Socket) => {
      console.log('New Connection Identified');
    
      socket.on("join", async (userId: string) => {
        await socket.join(userId);
        console.log(`${userId} connected with Socket`);
        this._io.sockets.in(userId).emit(SOCKET.EVENTS.ROOM_JOINED);
      });
        
      socket.on('disconnect', function () {
        console.log('User Disconnected');
     });  
    });

  }

  sendMessage(userId: string, type: string, message: {[key: string]: any}){
    try{
      console.log(`Sending Socket to - `, userId)
      console.log('result - ', this._io.sockets.in(userId).emit(type, message));
    } catch(error){
      console.log('Error while sending socket - ', error);
    }
  }

} 