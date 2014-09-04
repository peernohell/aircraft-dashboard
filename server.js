
var connect = require('connect')
, serveStatic = require('serve-static')
, http = require('http')
, socket = require('socket.io');

var app = connect()
  .use(serveStatic('build'));

var server = http.createServer(app);

var io = socket(server);
var sockets = [];

var emitmsg = false;

actions = [function altitude () {
	var altitude = Math.random() * 30000 | 0;
	console.log('send altitude ' + altitude);
	io.emit('telemetry', {"altitude": altitude});

}, function speed () {
	var speed = Math.random() * 500 | 0;
	console.log('send speed ' + speed);
	io.emit('telemetry', {"airspeed": speed});

}, function flaps () {
	var flaps = Math.random() * 6 | 0;
	console.log('send flaps ' + flaps);
	io.emit('telemetry', {"flaps": flaps});
}, function disconnect () {
	console.log('TODO send disconnect ');
}];


function sendAction() {
	var
	nextAction = ((Math.random() * 4 | 0) + 1) * 1000,
	actionIndex = (Math.random() * 10 | 0) % 4;

	actions[actionIndex]();

	console.log('next action in ' + nextAction);
  setTimeout(sendAction, nextAction);
}

if (module) {
  module.exports = function (cb) {
    server.listen(3000, function () {
			sendAction();
		});
  };
} else {
    server.listen(3000);
}
