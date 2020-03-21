
const md5 =require('blueimp-md5')

// 1. 連接資料庫
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testDb',{ useNewUrlParser: true,
useUnifiedTopology: true})
const conn = mongoose.connection
conn.on('connected', function () {
    console.log('資料庫連接成功!')
})



// 2. 設定Model

const userSchema = mongoose.Schema({
    username: {type: String, required: true}, 
    password: {type: String, required: true}, 
    type: {type: String, required: true}, // 用户類型: teacher/student
    header:{type: String}
})
    
const UserModel = mongoose.model('user', userSchema) // 集合名: users


// ===================== CRUD 測試 =====================

// 新增
function testSave(){
    const userModel = new UserModel({username:'pig',password:md5('123'),type:'laoban'});
    userModel.save(function(err,userDoc){
        console.log('testSave===>',err,userDoc)
    })
}

//testSave();

// 查詢
function testFind(){
    UserModel.find(function(err,users){
       
    })
}

//testFind()

function testFindOne(){
    UserModel.findOne({_id:'5e01ad502707c220a0651688'},function(err,user){
        console.log('testFindOne===>',user)
    })
}

//testFindOne()

// 修改
function testUpdate() {
    UserModel.findByIdAndUpdate({_id: '5e01ad502707c220a0651688'}, {username: 'yyy'},function (err, user) {
        console.log('findByIdAndUpdate()', err, user)
    })
}

//testUpdate()

// 刪除
function testDelete() {
    UserModel.remove({_id: '5e01ad502707c220a0651688'}, function (err, result) {
        console.log('remove()', err, result)
    })
}
// testDelete()

