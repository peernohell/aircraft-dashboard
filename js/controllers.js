angular
.module('AircraftDashboard', [])

.controller('SpeedCtrl', function ($scope, AircraftService) {
    $scope.speed = AircraftService.speed;
})

.controller('LandingGearCtrl', function ($scope, AircraftService) {
    $scope.landingGear = AircraftService.landingGear;
})

.controller('FlapsCtrl', function ($scope, AircraftService) {
  $scope.flaps = AircraftService.flaps;
})

.controller('ConnectionCtrl', function ($scope, AircraftService) {
  $scope.connection = AircraftService.connection;
})

.controller('AltitudeCtrl', function ($scope, AircraftService) {
  $scope.altitude = AircraftService.altitude;
});
