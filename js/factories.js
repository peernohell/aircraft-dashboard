angular
.module('aircraft.factories', [
  'aircraft.connection',
  'aircraft.stateValue'])
.config(['DataConnectionProvider', function (ConnectionProvider) {
	var config = {url: 'http://localhost:3000'};

	ConnectionProvider.setDataConnectionName('WebsocketDataConnection');
	if (location.host !== 'localhost') {
		config.url = 'http://176.34.94.213:8888/telemetry';
	}

	ConnectionProvider.setDataConnectionConfiguration(config);

}])
.factory('AircraftService', function AircraftService (SpeedValue, AltitudeValue, DataConnection) {
  var ConnectionProvider = DataConnection;
	var AircraftServiceSingleton = {
		speed: SpeedValue,
		altitude: AltitudeValue,
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
