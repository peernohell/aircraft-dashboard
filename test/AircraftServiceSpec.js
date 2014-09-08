
describe('AircraftService', function () {

  var AircraftService;

  beforeEach(function () {
    module('AircraftDashboard')

    inject(function ($injector) {
      AircraftService = $injector.get('AircraftService');
    });

  });

  it('should have a speed property', function () {
    expect(AircraftService).to.have.property('speed');
  });

  it('should have an altitude property', function () {
    expect(AircraftService).to.have.property('altitude');
  });
});
