import { Server } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

export class WebSocket{

  _io: SocketIOServer;

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
    
      socket.on("sendMessage", (data: {[key: string]: any}) => {
        const {room, message} = data;
        this._io.sockets.in(room).emit(room, "message", message);
      } )
    
      socket.on('disconnect', function () {
        console.log('A user disconnected\n');
     });  
    });

  }

}