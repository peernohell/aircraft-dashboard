describe('AltitudeValue', function () {
  var
  AltitudeValue,
  value;

  beforeEach(function () {
    
    module('aircraft.stateValue');

    inject(function ($injector) {
      value = $injector.get('AltitudeValue');
    });

  });

  it('should accept value between 0 to 10000', function () {
    var valueToTest = [0, 200, 1400, 10000];
    valueToTest.forEach(function (test) {
      value.set(test);
      expect(value.current).to.equal(test);
    });
  });

  it('should refuse value lower than 0 and greater than 10000', function () {
    var valueToTest = [-1, -200, 10001, Infinity];
    valueToTest.forEach(function (test) {
      value.set(test);
      expect(value.current).to.not.equal(test);
    });
  });
});
