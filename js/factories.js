

angular
.module('AircraftDashboard')
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
.factory('AircraftData', function ($rootScope) {

	function AircaftWebSocketData () {
		this.socket = io();

		this.socket.on('telemetry', function (data) {
			$rootScope.$apply(this.update.bind(this, data))
    }.bind(this));

		this.events('airspeed', 'altitude', 'flaps');
	}

	AircaftWebSocketData.prototype = {
		events: function () {
			[].forEach.call(arguments, function (evt) {
				this.events[evt] = [];
			}.bind(this));
		},
		sendEvents: function (evt) {
			var args = [].slice.call(arguments, 1);
			if (!(evt in this.events)) {
				throw new Error('unknown event ' + evt);
			}
			this.events[evt].forEach(function (fn) {
				fn.apply(null, args);
			});
		},
		on: function (evt, fn) {
			if (!(evt in this.events)) {
				throw new Error('unknown event ' + evt);
			}
			this.events[evt].push(fn);
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
		}
	};

	return new AircaftWebSocketData();

})
.factory('AircraftService', function AircraftService (StateValue, AircraftData) {
	var AircraftServiceSingleton = {
		speed: new StateValue(),
		altitude: new StateValue(),
    landingGear: false,
    flaps: 0,
    connection: 'Disconnected'
	};

	AircraftData.on('altitude', function (altitude) {
		AircraftServiceSingleton.altitude.set(altitude);
	});

	AircraftData.on('airspeed', function (speed) {
		AircraftServiceSingleton.speed.set(speed);
	});

  return AircraftServiceSingleton;
});

