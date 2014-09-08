
describe('AbstractDataConnection', function () {
  var 
  dataConnectionInstance,
  AbstractDataConnection;

  beforeEach(function () {
    module('aircraft.connection')

    inject(function ($injector) {
      AbstractDataConnection = $injector.get('AbstractDataConnection');
      dataConnectionInstance = Object.create(AbstractDataConnection);
    });

  });

  it('should not have an events Array property when initEvents have not been called', function () {
    expect(dataConnectionInstance).to.not.have.property('events');
  });

  it('should have an events Array property that contains strings when initEvents have been called', function () {

    dataConnectionInstance.initEvents();

    expect(dataConnectionInstance).to.have.property('events');
    expect(dataConnectionInstance.events).to.contain.keys('airspeed', 'altitude', 'flaps', 'landinggear', 'connection');
  });

  it('should have a sendEvents property', function () {
    expect(dataConnectionInstance).to.have.property('sendEvents');
  });

  describe('on', function () {

    function callEvent(evt) {
      return function () {
        dataConnectionInstance.on(evt);
      };
    }

    it('should accept on with valid events', function () {
      dataConnectionInstance.initEvents();

      expect(callEvent('airspeed')).to.not.throw(Error);
      expect(callEvent('altitude')).to.not.throw(Error);
      expect(callEvent('flaps')).to.not.throw(Error);
      expect(callEvent('landinggear')).to.not.throw(Error);
      expect(callEvent('connection')).to.not.throw(Error);
    });

    it('should throw an error when called with an invalid event', function () {
      dataConnectionInstance.initEvents();

      expect(callEvent('invalid event name')).to.throw(Error);
    });

  });

  describe('sendEvents', function () {
    it('should send associated function attached with on', function () {
      dataConnectionInstance.initEvents();
      var
      airspeedEvent1 = sinon.spy(),
      airspeedEvent2 = sinon.spy();

      dataConnectionInstance.on('airspeed', airspeedEvent1);
      dataConnectionInstance.sendEvents('airspeed', 10);

      airspeedEvent1.should.have.been.calledOnce;
      airspeedEvent1.should.have.been.calledWith(10);

      dataConnectionInstance.on('airspeed', airspeedEvent2);
      dataConnectionInstance.sendEvents('airspeed', 20);

      airspeedEvent1.should.have.been.calledTwice;
      airspeedEvent1.should.have.been.calledWith(20);

      airspeedEvent2.should.have.been.calledOnce;
      airspeedEvent2.should.have.been.calledWith(20);

    });
  });

});
