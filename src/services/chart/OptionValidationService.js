export default class OptionValidatorService {
  constructor(options) {
    this.options = options;
    this.supportedOptions = [
      'chartConfig',
      'quality',
      'type',
      'filename',
      'autoDownload',
    ];
  }

  checkMinimumRequirements() {
    if (!this.options.chartConfig) {
      throw new Error('Minimum requirements not satisfied. Need a valid chartConfig.');
    }
  }

  checkInvalidOptions() {
    Object.keys(this.options).forEach((key) => {
      if (!this.supportedOptions.includes(key)) {
        console.warn(`${key} is not a valid configuration for chart export. It will be ignored.`);
      }
    });
  }

  validate() {
    this.checkMinimumRequirements();
    this.checkInvalidOptions();
  }
}
