import sinon from 'sinon';
import { expect } from 'chai';
import OptionValidationService from '../../../src/services/dashboard/OptionValidationService';

describe('OptionValidationService', () => {
  beforeEach(() => {
    sinon.stub(console, 'warn');
  });

  it('should validate only chartConfig is passed', () => {
    const opts = {
      chartConfig: {
        type: 'column2d',
      },
    };
    const ovs = new OptionValidationService(opts);
    const fn = () => ovs.validate();
    expect(fn).to.not.throw('Minimum requirements not satisfied.');
  });

  it('should validate only chartConfig is passed', () => {
    const opts = {
      template: '<html></html>',
    };
    const ovs = new OptionValidationService(opts);
    const fn = () => ovs.validate();
    expect(fn).to.not.throw('Minimum requirements not satisfied.');
  });

  it('should throw an error when no chartConfig and template is passed', () => {
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
    expect(console.warn.calledWithMatch('typel is not a valid configuration for dashboard export.')).to.equal(true);
  });

  it('should warn when incompatible configurations are passed', () => {
    const opts = {
      chartConfig: {},
      templateFormat: 'A4',
      type: 'png',
    };
    const ovs = new OptionValidationService(opts);
    ovs.validate();
    expect(console.warn.calledWithMatch('templateFormat is not supported for types other than PDF.')).to.equal(true);
  });

  afterEach(() => {
    console.warn.restore();
  });
});
