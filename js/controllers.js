angular
.module('AircraftDashboard', [
  'aircraft.factory'
])
.config(['DataConnectionProvider', function (ConnectionProvider) {
  var config = {url: 'http://localhost:3000'};

  ConnectionProvider.setDataConnectionName('WebsocketDataConnection');
  if (location.hostname !== 'localhost')
    config.url = 'http://176.34.94.213:8888/telemetry';

  ConnectionProvider.setDataConnectionConfiguration(config);

}])

.controller('SpeedCtrl', function ($scope, AircraftService) {
  $scope.speed = AircraftService.speed;
})

.controller('AltitudeCtrl', function ($scope, AircraftService) {
  $scope.altitude = AircraftService.altitude;
})

.controller('LandingGearCtrl', function ($scope, AircraftService) {
  $scope.data = AircraftService;

  $scope.toggleLandingGear = function () {
    console.log('controler toggle');
    AircraftService.toggleLandingGear();
  };
})

.controller('FlapsCtrl', function ($scope, AircraftService) {
  $scope.data = AircraftService;
})

.controller('ConnectionCtrl', function ($scope, AircraftService) {
  $scope.data = AircraftService;
});
