angular
.module('AircraftDashboard', [])

.controller('SpeedCtrl', function ($scope, AircraftService) {
    $scope.speed = AircraftService.speed;
})

.controller('LandingGearCtrl', function ($scope, AircraftService) {
    $scope.data = AircraftService;
    $scope.toggleLandingGear = function () {
      console.log('controler toggle');
      AircraftService.toggleLandingGear();
    };
})

.controller('FlapsCtrl', function ($scope, AircraftService) {
  $scope.data =  AircraftService;
})

.controller('ConnectionCtrl', function ($scope, AircraftService) {
  $scope.data = AircraftService;
})

.controller('AltitudeCtrl', function ($scope, AircraftService) {
  $scope.altitude = AircraftService.altitude;
});
