

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
.factory('AircraftService', function AircraftService (StateValue) {
	var AircraftServiceSingleton = {
		speed: new StateValue(),
		altitude: new StateValue(),
    landingGear: false,
    flaps: 3,
    connection: 'Connected' 
	};

  AircraftServiceSingleton.speed.set(340);
  AircraftServiceSingleton.speed.set(240);
  AircraftServiceSingleton.speed.set(300);
  AircraftServiceSingleton.speed.set(440);
  AircraftServiceSingleton.speed.set(34);

  AircraftServiceSingleton.altitude.set(3400);
  AircraftServiceSingleton.altitude.set(2400);
  AircraftServiceSingleton.altitude.set(3000);
  AircraftServiceSingleton.altitude.set(4400);
  AircraftServiceSingleton.altitude.set(1300);
	
  return AircraftServiceSingleton;
});

