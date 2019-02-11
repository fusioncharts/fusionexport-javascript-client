import optionParser from '../optionParser';

export default class OptionProcessorService {
  constructor(options) {
    this.options = options;
    this.processedOptions = {
      formdata: {},
      metadata: {},
    };
  }

  processChartConfig() {
    this.processedOptions.formdata
      .chartConfig = optionParser.parseChartConfig(this.options.chartConfig);
  }

  processQuality() {
    if (!this.options.quality) return;
    this.processedOptions.formdata
      .quality = optionParser.parseChartConfig(this.options.quality);
  }

  processType() {
    if (!this.options.type) return;
    this.processedOptions.formdata
      .type = optionParser.parseChartConfig(this.options.type);
  }

  processFilename() {
    if (!this.options.filename) return;
    this.processedOptions.formdata
      .outputFile = optionParser.parseChartConfig(this.options.filename);
  }

  processBase64() {
    if (!this.options.filename) return;
    this.processedOptions.metadata
      .base64 = optionParser.parseChartConfig(this.options.base64);
  }

  process() {
    this.processChartConfig();
    this.processQuality();
    this.processType();
    this.processFilename();
    this.processBase64();

    return this.processedOptions;
  }
}
