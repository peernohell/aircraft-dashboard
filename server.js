
var connect = require('connect')
, serveStatic = require('serve-static')
, http = require('http')
, socket = require('socket.io');

var app = connect()
  .use(serveStatic('build'));

var server = http.createServer(app);

var io = socket(server);
var sockets = [];

function toEmit() {
//  sockets.forEach(function (socket) {
    io.emit('info', {type: 'data', value:"hello world"});
 // });
  setTimeout(toEmit, 2000);
}

io.on('connection', function () {
  console.log('new WebSocket connection');
  sockets.push(socket);
  io.emit('info', {type: 'data', value:"hello world"});
});

if (module) {
  module.exports = function (cb) {
    server.listen(3000, cb);
  };
} else {
    server.listen(3000);
}
