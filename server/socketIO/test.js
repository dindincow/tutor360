module.exports = (server)=>{
    const io = require('socket.io')(server);

    // 監聽是否有客戶端連接服務器
    io.on('connection',(socket)=>{
        console.log("有一個客戶連接到服務器");
        socket.on('sendMsg',(data)=>{
            console.log("服務器接收到客戶消息==>"+data.name);

            // 服務器向客戶端發消息
            socket.emit("receiveMsg","hi!"+data.name + "消息已收到")   

        })
    })
}