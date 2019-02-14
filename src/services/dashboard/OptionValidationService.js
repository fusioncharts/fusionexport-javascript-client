export default class OptionValidationService {
  constructor(options) {
    this.options = options;
  }

  checkMinimumRequirements() {
    if (!this.options.chartConfig && !this.options.template) {
      throw new Error('Minimum requirements not satisfied. Need either a valid chartConfig or a template.');
    }
  }

  validate() {
    this.checkMinimumRequirements();
  }
}
