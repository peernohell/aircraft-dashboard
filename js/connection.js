angular
.module('aircraft.connection', [])
.factory('AbstractDataConnection', function () {

  /**
   * initEvents must be call durring constructor of the super class
   */
  AbstractDataConnection = {
    attachEvent: function (evt) {
      this.events[evt] = [];
    },
    initEvents: function () {
      this.events = {};
      ['airspeed', 'altitude', 'flaps', 'landinggear', 'connection'].forEach(this.attachEvent.bind(this));
    },
		sendEvents: function (evt) {
			var args = [].slice.call(arguments, 1);
			if (!(evt in this.events))
				throw new Error('unknown event ' + evt);

			this.events[evt].forEach(function (fn) {
				fn.apply(null, args);
			});
		},
		on: function (evt, fn) {
			if (!(evt in this.events))
				throw new Error('unknown event ' + evt);

			this.events[evt].push(fn);
		},
  };

  // define events

  return AbstractDataConnection;
})
.factory('WebsocketDataConnection', function ($rootScope, AbstractDataConnection) {

  // a hash that associate socketio event to connection state
  var socketioToConnectionStates = {
    connect: 'Connected',
    disconnect: 'Disconnected',
    reconnecting: 'Connecting'
  };

  /**
   * This class grabe data from websocket. You have to configure
   * the url to the websocket server.
   *
   * @params {Object} config An object with configuration option
   * @params {String} config.host the websocket server host
   * @params {String} config.port the websocket server port
   */
	function WebsocketDataConnection (config) {
		angular.extend(this, config);
    this.initEvents();
	}

	WebsocketDataConnection.prototype = {
    // init connection
    init: function () {

      console.log('websocket on: ', this.url);
      this.socket = io(this.url);

      // websocket is open. update state to connecting
      this.update({connection: 'Connecting'});

      // attache socketio event to update connection state.
      Object.keys(socketioToConnectionStates).forEach(function (socketioEvent) {
        var connectionState = socketioToConnectionStates[socketioEvent];

        this.socket.on(socketioEvent, this.onConnection.bind(this, connectionState));

      }.bind(this));

      // manage telemetry information
      this.socket.on('telemetry', function (data) {
        $rootScope.$apply(this.update.bind(this, data))
      }.bind(this));

    },
    setLandingGear: function (landingGear) {
      console.log('send control');
      this.socket.emit('control', {
        type: 'landing_gear',
        value: landingGear
      });
    },
		update: function (data) {
			var
			key,
			keys = Object.keys(data);

			console.log('update', data);
			if (keys.length > 1) {
				throw new Error('udpate data must have only one attribute!');
			}
			key = keys[0];
			if (!(key in this.events)) {
				console.log('server send an unmanaged value: ' + key);
				return;
			}
			this.sendEvents(key, data[key]);
		},
    onConnection: function (connectionState) {
      $rootScope.$apply(this.update.bind(this, {connection: connectionState}));
    }
  };
  angular.extend(WebsocketDataConnection.prototype, AbstractDataConnection);

	return WebsocketDataConnection;
})
.provider('DataConnection', function ConnectionProvider () {
  var
  dataConnectionName,
  dataConnectionConfiguration = {};

  this.setDataConnectionName = function (newDataConnectionName) {
    dataConnectionName = newDataConnectionName;
  };

  this.setDataConnectionConfiguration = function (newDataConnectionConfiguration) {
    dataConnectionConfiguration = newDataConnectionConfiguration;
  };

  this.$get = ['$injector', function ($injector) {
    if (!dataConnectionName)
      throw new Error('DataConnectionProvider: you must configure the DataConnection to use (ex: WebsocketDataConnection)');

    var DataConnection = $injector.get(dataConnectionName);
		console.log('create', dataConnectionName, dataConnectionConfiguration);
    return new DataConnection(dataConnectionConfiguration);
  }];

});
