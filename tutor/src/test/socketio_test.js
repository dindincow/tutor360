import io from 'socket.io-client';

// 連接服務器，會得到連接的物件
const socket = io('ws://localhost:4000');

// 客戶端發送消息給服務器
socket.emit('sendMsg',{name:'jessica'})


socket.on('receiveMsg',(data)=>{
   console.log("客戶端接收到到服務器的消息了!==>",data) 

})