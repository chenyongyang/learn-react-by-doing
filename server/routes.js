let express = require('express');   // 引入express文件
let router = express.Router();      // 创建router实例

router.all('/initlist', function (req, res) {
    let data = [
        "aaa", "bbb","ccc"
    ];
    res.json(data);
});

module.exports = router;