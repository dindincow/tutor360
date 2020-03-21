var express = require('express');
var router = express.Router();
const md5 = require('blueimp-md5')
const { UserModel, ChatModel } = require('../db/models');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});


/* 用戶注冊 */
router.post('/register', async(req, res) => {

    const { username, password, type } = req.body;

    const user = await  UserModel.findOne({ username });

    if (user) {
        res.send({ code: 1, msg: '此用户已存在' });
    } else {
        const newUser = new UserModel({
            username,
            password: md5(password),
            type
        })

        newUser.save()
        .then(user => {
            // 註冊成功等於登入成功
            //res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 * 7 });
            res.send({ code: 0, data: { _id: user._id, username, type ,msg: '註冊成功!'} })
        })
        .catch(err => console.log(err))
    }
   
})

/* 登陸 */
router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username, password: md5(password) }, { password: 0 ,__v:0})
        
    if (user) {
        res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 * 7 });
        res.send({ code: 0, msg: '登入成功!', data: user });
    } else {
        res.send({ code: 1, msg: '用戶名，密碼不正確!' });
    }

})

// 更新用戶
router.post('/update', (req, res) => {

    const userid = req.cookies.userid
    if (!userid) {
        return res.send({ code: 1, msg: '請先登入' });
    }

    UserModel.findByIdAndUpdate({ _id: userid }, req.body)
    .then(user => {
        if (!user) {
            res.clearCookie('userid');
            return res.send({ code: 1, msg: '請先登入' });

        } else {
            const { _id, username, type } = user
            // Object.assign() 合併物件，右向左覆蓋
            const data = Object.assign(req.body, { _id, username, type })
            res.send({ code: 0, data })
        }
    })
})

/* 獲取user */
router.get('/user', (req, res) => {
    const userid = req.cookies.userid
    if (!userid) {
        return res.send({ code: 1, msg: "請先登入" })
    }

    UserModel.findOne({ _id: userid }, { password: 0 })
        .then(user => {
            res.send({ code: 0, data: user })
        })
});

/* 依據用戶類型獲取列表 */
router.get('/userlist', (req, res) => {
    const { type } = req.query;
    UserModel.find({ type }, { password: 0 })
    .then(users => {
        res.send({ code: 0, data: users });
    })
})


/* 獲取聊天列表 */
router.get('/msglist', function (req, res) {

    const userid = req.cookies.userid;

    UserModel.find(function (err, userDocs) {
     
        const users = {} 
        userDocs.forEach(doc => {
            users[doc._id] = { username: doc.username, header: doc.header }
        })
        /*
        查询 userid 相關的所有聊天訊息
        参数1: 查詢條件
        参数2: 過濾條件
        参数3: callBack function
        */
        ChatModel.find({ '$or': [{ from: userid }, { to: userid }] }, {password:0},(err,chatMsgs)=> {
            // 返回包含所有用户和當前用户相關的所有聊天數據
            res.send({ code: 0, data: { users, chatMsgs } })
        })
    })
})


/* 修改指定消息為已讀 */
router.post('/readmsg', function (req, res) {

    const from = req.body.from
    const to = req.cookies.userid
    /*
        更新資料庫中的chat 數據
        参数1: 查詢條件
        参数2: 更新指定的數據物件
        参数3: 是否1 次更新多條, 默認只更新一條
        参数4: 更新完成的回调函數
    */
    ChatModel.update({ from, to, read: false }, { read: true }, { multi: true },  (err,doc)=> {
        console.log('/readmsg', doc)
        res.send({ code: 0, data: doc.nModified }) // 更新的數量
    })
})



module.exports = router;
