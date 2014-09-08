describe('SpeedValue', function () {
  var
  SpeedValue,
  value;

  beforeEach(function () {
    
    module('aircraft.stateValue');

    inject(function ($injector) {
      value = $injector.get('SpeedValue');
    });

  });

  it('should accept value between 0 to 420', function () {
    var valueToTest = [0, 200, 400, 420];
    valueToTest.forEach(function (test) {
      value.set(test);
      expect(value.current).to.equal(test);
    });
  });
  it('should refuse value lower than 0 and greater than 420', function () {
    var valueToTest = [-1, -200, 421, Infinity];
    valueToTest.forEach(function (test) {
      value.set(test);
      expect(value.current).to.not.equal(test);
    });
  });
});
