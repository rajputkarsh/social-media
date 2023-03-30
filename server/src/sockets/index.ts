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
      console.log('New User Connected\n');
    
      socket.on("join", async (room: string) => {
        await socket.join(room);
        this._io.sockets.in(room).emit(room, "Room Joined", {"message": "hello"});
      });
        
      socket.on('disconnect', function () {
        console.log('A user disconnected\n');
     });  
    });

  }

  sendMessage(userId: string, message: {message: string, media: string}){
    try{
      this._io.sockets.in(userId).emit(SOCKET.EVENTS.MESSAGE, message);
    } catch(error){
      throw error;
    }
  }

} 