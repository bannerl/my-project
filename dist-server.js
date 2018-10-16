var express = require('express')
var config = require('./config/index')

var port = process.env.PORT || 8080

var app = express()

var router = express.Router()

router.get('/', function (req, res, next) {
  req.url = './a/index.html'
  next()
})

app.use(router)

var appData = require('./data.json')
var seller = appData.seller
var goods = appData.goods
var user = appData.user
var users = appData.users
var ratings = appData.ratings
var address = appData.user.address
var index = appData.index
var shops = appData.shops
var category = appData.category
var apiRoutes = express.Router()

apiRoutes.get('/seller', function (req, res) {
  res.json({
  status: 0,
  data: seller
})
})

apiRoutes.get('/goods', function (req, res) {
  res.json({
  status: 0,
  data: goods
})
})

apiRoutes.get('/ratings', function (req, res) {
  res.json({
  status: 0,
  data: ratings
})
})

apiRoutes.get('/user', function (req, res) {
  res.json({
  status: 0,
  data: user
})
})

apiRoutes.get('/shops', function (req, res) {
  let data = []
  for (var i = 0; i < shops.length; i++) {
  if ((shops[i].maxType - 0) === (req.query.max_type - 0)) {
  data = shops[i]
}
}
  res.json({
  status: 0,
  data: data
})
})

apiRoutes.get('/category', function (req, res) {
  res.json({
  status: 0,
  data: category
})
})

apiRoutes.get('/users', function (req, res) {
  res.json({
  status: 0,
  data: users
})
})

apiRoutes.get('/users/address', function (req, res) {
  res.json({
  status: 0,
  data: address
})
})

apiRoutes.get('/index', function (req, res) {
  res.json({
  status: 0,
  data: index
})
})

app.use('/api', apiRoutes)

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
  console.log(err)
  return
}
  console.log('run in http://localhost:8080')
})
