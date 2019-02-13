import { expect } from 'chai';
import OptionValidationService from '../../../src/services/chart/OptionValidationService';

describe('OptionValidationService', () => {
  it('should throw an error when no chartConfig is passed', () => {
    const opts = {
      type: 'png',
    };
    const ovs = new OptionValidationService(opts);
    const fn = () => ovs.validate();
    expect(fn).to.throw('Minimum requirements not satisfied.');
  });
});
