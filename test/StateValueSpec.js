describe('StateValue', function () {

  var
  StateValue,
  value;

  beforeEach(function () {
    
    module('aircraft.stateValue');

    inject(function ($injector) {
      StateValue = $injector.get('StateValue');
      value = Object.create(StateValue);
    });

  });

  it('should have a set function', function () {
    expect(value).to.have.property('set');
  });

  describe('set', function () {
    it('should define all value', function () {
      value.set(3);
      expect(value.current).to.equal(3);
      expect(value.min).to.equal(3);
      expect(value.max).to.equal(3);
      expect(value.avg).to.equal(3);
    });

    it('should set min and current to 3, max to 5 and avg to 4 if called with 5 then 3', function () {
      value.set(5);
      value.set(3);
      expect(value.current).to.equal(3);
      expect(value.min).to.equal(3);
      expect(value.max).to.equal(5);
      expect(value.avg).to.equal(4);

    });

    it('sould have avg set to 10 if called with 5, 3, 15 then 17', function () {

      value.set(5);
      value.set(3);
      value.set(15);
      value.set(17);
      expect(value.avg).to.equal(10);
    });
  });
});
