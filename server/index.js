let path = require('path');         // nodejs自带模块
let express = require('express');       // 引入express
let app = express();                    // 创建express实例

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200); /让options请求快速返回/
    }
    else {
        next();
    }
});

app.use('/api', require('./routes'));

// 设置路由配置
// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, '../index.html'));
// });

// 监听端口, 创建服务器
let server = app.listen(3001, function () {
    console.log('app listening at http://localhost:3001');
})