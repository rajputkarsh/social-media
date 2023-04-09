
import { createContext } from 'react';
import io, { Socket } from 'socket.io-client';
import { URL } from '../constants';

export const socketInstance: Socket = io(URL.SOCKET_BASE_URL(), {'transports': ['polling']});

const SocketContext = createContext<Socket>(socketInstance);
export const SocketProvider = SocketContext.Provider;

export default SocketContext;