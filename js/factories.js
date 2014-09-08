angular
.module('aircraft.factory', ['aircraft.connection'])
.config(['DataConnectionProvider', function (ConnectionProvider) {
	var config = {url: 'http://localhost:3000'};

	ConnectionProvider.setDataConnectionName('WebsocketDataConnection');
	if (location.host !== 'localhost') {
		config.url = 'http://176.34.94.213:8888/telemetry';
	}

	ConnectionProvider.setDataConnectionConfiguration(config);

}])
.factory('StateValue', function () {
  function StateValue () {
    var _nbValueSetted = 0;

    this.set = (function (value) {
      _nbValueSetted++;

      if (!('current' in this)) {
        // it's the first value so we set all attribute
        this.current = value;
        this.min = value;
        this.max = value;
        this.avg = value;
        return;
      }

      this.current = value;
      if (this.min > value) {
        this.min = value;
      }

      if (this.max < value) {
        this.max = value;
      }

      this.avg = (this.avg * (_nbValueSetted - 1)  + value) / _nbValueSetted;

    }).bind(this);
  }
  return StateValue;
})
.factory('AircraftService', function AircraftService (StateValue, DataConnection) {
  var ConnectionProvider = DataConnection;
	var AircraftServiceSingleton = {
		speed: new StateValue(),
		altitude: new StateValue(),
    landingGear: false,
    flaps: 0,
    connection: 'Disconnected',
    toggleLandingGear: function () {
      console.log('server toggle');
      ConnectionProvider.setLandingGear(this.landingGear ? 0 : 1);
    }
	};

	ConnectionProvider.on('altitude', function (altitude) {
		AircraftServiceSingleton.altitude.set(altitude);
	});

	ConnectionProvider.on('airspeed', function (airspeed) {
		AircraftServiceSingleton.speed.set(airspeed);
	});

	ConnectionProvider.on('landinggear', function (landinggear) {
		AircraftServiceSingleton.landingGear = !!landinggear;
	});

	ConnectionProvider.on('flaps', function (flaps) {
		AircraftServiceSingleton.flaps = flaps;
	});

	ConnectionProvider.on('connection', function (connection) {
		AircraftServiceSingleton.connection = connection;
	});

  ConnectionProvider.init();

  return AircraftServiceSingleton;
});
