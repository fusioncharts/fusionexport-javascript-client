export default class OptionValidatorService {
  constructor(options) {
    this.options = options;
  }

  checkMinimumRequirements() {
    if (!this.options.chartConfig) {
      throw new Error('Minimum requirements not satisfied. Need a valid chartConfig.');
    }
  }

  validate() {
    this.checkMinimumRequirements();
  }
}
