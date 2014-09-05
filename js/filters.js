
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
})
.filter('altitudeThousandNeedle', function () {
  return function altitudeThousandNeedle (altitude) {
   return altitude/1000 * 36;
  };
})
.filter('altitudeHundredNeedle', function () {
  return function altitudeHundredNeedle (altitude) {
   return (altitude/100 % 10) * 36;
  };
})
.filter('round', function () {
  return function round (value, decimals) {
    return isNaN(value) ? 0 : Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }; 
});

