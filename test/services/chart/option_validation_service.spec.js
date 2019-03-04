import sinon from 'sinon';
import { expect } from 'chai';
import OptionValidationService from '../../../src/services/chart/OptionValidationService';

describe('OptionValidationService', () => {
  beforeEach(() => {
    sinon.stub(console, 'warn');
  });

  it('should throw an error when no chartConfig is passed', () => {
    const opts = {
      type: 'png',
    };
    const ovs = new OptionValidationService(opts);
    const fn = () => ovs.validate();
    expect(fn).to.throw('Minimum requirements not satisfied.');
  });

  it('should warn when invalid configuration is passed', () => {
    const opts = {
      chartConfig: {},
      typel: 'png',
    };
    const ovs = new OptionValidationService(opts);
    ovs.validate();
    expect(console.warn.calledWithMatch('typel is not a valid configuration for chart export.')).to.equal(true);
  });

  afterEach(() => {
    console.warn.restore();
  });
});
