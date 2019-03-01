export default class OptionValidationService {
  constructor(options) {
    this.options = options;
    this.supportedOptions = [
      'chartConfig',
      'template',
      'templateWidth',
      'templateHeight',
      'templateFormat',
      'templateOnLoad',
      'resources',
      'asyncCapture',
      'maxWaitForCaptureExit',
      'quality',
      'type',
      'filename',
      'autoDownload',
    ];
  }

  checkMinimumRequirements() {
    if (!this.options.chartConfig && !this.options.template) {
      throw new Error('Minimum requirements not satisfied. Need either a valid chartConfig or a template.');
    }
  }

  checkInvalidOptions() {
    Object.keys(this.options).forEach((key) => {
      if (!this.supportedOptions.includes(key)) {
        console.warn(`${key} is not a valid configuration for dashboard export. It will be ignored.`);
      }
    });
  }

  validate() {
    this.checkMinimumRequirements();
    this.checkInvalidOptions();
  }
}
