import { expect } from 'chai';
import OptionValidationService from '../../../src/services/dashboard/OptionValidationService';

describe('OptionValidationService', () => {
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
});
