import { io } from 'socket.io-client';

const URL = 'http://localhost:5000'; // Замените на ваш URL Flask
export const socket = io(URL, { autoConnect: false });

export const connectSocket = () => socket.connect();
export const disconnectSocket = () => socket.disconnect();