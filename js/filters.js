
angular
.module('AircraftDashboard')
.filter('landingGearCss', function () {
    return function landingGearCss (landingState) {
      return landingState ? 'on' : '';
    };
})
.filter('flapsCss', function () {
  return function flapsCss (flapsPosition) {
    return 'pos-' + flapsPosition;
  };
})
.filter('connectionCss', function () {
  var connectionToCss = {
    Connected: 'online',
    Disconnected: 'offline',
    Connecting: 'connecting',
  };
  return function connectionCss (state) {
    return connectionToCss[state] || connectionToCss.Disconnected;
  };
})
.filter('speedNeedle', function () {
  return function speedNeedle (speed) {
   return speed / 50 * 36;
  };
});

