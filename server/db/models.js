const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tutorAppDemo',{ useNewUrlParser: true,
useUnifiedTopology: true})
const conn = mongoose.connection
conn.on('connected', function () {
    console.log(' ==== tutorApp 資料庫連接成功!===')
})

// 使用者Schema
const userSchema = mongoose.Schema({
    username: { type: String, required: true }, // 帳户名
    password: { type: String, required: true }, // 密碼
    type: { type: String, required: true }, // 用户類型:  teacher/student
    age:{type: String},
    header: { type: String }, // 頭像
    info: { type: String }, // 個人簡介
    live: { type: String }, // 居住地
    salary: { type: String } // 薪水
})

const UserModel = mongoose.model('user', userSchema);
exports.UserModel = UserModel;

// 對話Schema
const chatSchema = mongoose.Schema({
    from: { type: String, required: true }, // 發送用戶ID
    to: { type: String, required: true }, // 接收用戶id
    chat_id: { type: String, required: true }, // from 和 to 組成的字串
    content: { type: String, required: true }, // 內容
    read: { type: Boolean, default: false }, // 標識是否已讀
    create_time: { type: Number } // 創建時間
})

const ChatModel = mongoose.model('chat', chatSchema)
exports.ChatModel = ChatModel
