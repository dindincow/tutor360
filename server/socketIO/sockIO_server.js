const { ChatModel } = require('../db/models');

module.exports = (server)=>{
    const io = require('socket.io')(server);

    // 監聽是否有客戶端連接服務器
    io.on('connection',(socket)=>{
        console.log("有一個客戶連接到服務器");

        socket.on('sendMsg',({from,to,content})=>{
            console.log("服務器接收到客戶消息==>"+ from,to,content);

            // form_to/to/from
            const chat_id=[from,to].sort().join('_');
            const create_time = Date.now();

            new ChatModel({from,to,chat_id,content,create_time}).save((erroe,chatMsg)=>{
                io.emit('receiveMsg',chatMsg)
            })
        })
    })
}