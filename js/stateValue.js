
angular
.module('aircraft.stateValue', [])
.factory('StateValue', function () {
  return {
    set: function (value) {

      if (!('current' in this)) {
        // it's the first value so we set all attribute
        this.current = value;
        this.min = value;
        this.max = value;
        this.avg = value;
        this._nbValueSetted = 1;
        return;
      }

      this._nbValueSetted++;
      this.current = value;
      if (this.min > value) {
        this.min = value;
      }

      if (this.max < value) {
        this.max = value;
      }

      this.avg = (this.avg * (this._nbValueSetted - 1)  + value) / this._nbValueSetted;

    }
  };
})
.factory('LimitStateValue', function (StateValue) {
  return Object.create(StateValue, {
    set: {
      value: function (value) {
        if (this.isInLimit(value))
            StateValue.set.apply(this, arguments);
      },
    },
    isInLimit: {
      value: function (value) {
        return (isNaN(this.minValue) || this.minValue <= value)
            && (isNaN(this.maxValue) || this.maxValue >= value);
      }
    }
  });
})
.factory('SpeedValue', function (LimitStateValue) {
  return Object.create(LimitStateValue, {
    minValue: {
      value: 0,
    },
    maxValue: {
      value: 420 
    }
  });
})
.factory('AltitudeValue', function (LimitStateValue) {
  return Object.create(LimitStateValue, {
    minValue: {
      value: 0,
    },
    maxValue: {
      value: 10000 
    }
  });
});
