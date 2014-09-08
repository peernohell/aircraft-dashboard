describe('LimitStateValue', function () {

  var
  LimitStateValue,
  value;

  beforeEach(function () {
    
    module('aircraft.stateValue');

    inject(function ($injector) {
      LimitStateValue = $injector.get('LimitStateValue');
      value = Object.create(LimitStateValue);
    });

  });

  it('should have no limit if none are setted', function () {
    var valueToTest = [-1000, 200, 400, 0, -Infinity, +Infinity];
    valueToTest.forEach(function (test) {
      value.set(test);
      expect(value.current).to.equal(test);
    });
  });

  it('should refuse value lower than minValue', function () {
    value.minValue = -100;
    var
    validValudToTest = [-100, 200, 0, Infinity];
    invalidValudToTest = [-1000];

    validValudToTest.forEach(function (test) {
      value.set(test);
      expect(value.current).to.equal(test);
    });

    invalidValudToTest.forEach(function (test) {
      value.set(test);
      expect(value.current).to.not.equal(test);
    });
  });

  it('should refuse value greater than maxValue', function () {
    value.maxValue = 230;
    var
    validValudToTest = [-Infinity, -100, 0, 200];
    invalidValudToTest = [231, 400];

    validValudToTest.forEach(function (test) {
      value.set(test);
      expect(value.current).to.equal(test);
    });

    invalidValudToTest.forEach(function (test) {
      value.set(test);
      expect(value.current).to.not.equal(test);
    });
  });
});
