// var express = require('express');
// var config = require('./config/index');
//
// var port = process.env.PORT || config.build.port;
//
// var app = express();
//
// var router = express.Router();
// router.get('/', function (req, res, next) {
//   req.url = '/index.html';
//   next();
//
// })
// app.use(router);

//引入express中间件
var express = require('express');
var app = express();

// 开始
var fs = require("fs");
var contents = fs.readFileSync("data.json");
var appData = JSON.parse(contents);
// exports.requests = data.requests;

// var appData = require('data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

// app.get('/user/:id?', function(req, res){
//   console.log(req.route);
// });

app.get('/api/seller', (req, res) => {
  res.json({
    errno: 0,
    data: seller
  })// 接口返回json数据，上面配置的数据seller就赋值给data请求后调用
}),
  app.get('/api/goods', (req, res) => {
    res.json({
      errno: 0,
      data: goods
    })
  }),
  app.get('/api/ratings', (req, res) => {
    res.json({
      errno: 0,
      data: ratings
    })
  })
//指定启动服务器到哪个文件夹，我这边指的是dist文件夹
app.use(express.static('dist'));

//监听端口为3000
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
