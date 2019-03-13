import utils from '../../utils';
import optionParser from '../optionParser';

export default class OptionProcessorService {
  constructor(options) {
    this.options = options;
    this.defaults = {
      autoDownload: true,
    };
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
    if (utils.isUndefined(this.options.quality)) return;
    this.processedOptions.formdata
      .quality = optionParser.parseQuality(this.options.quality);
  }

  processType() {
    if (utils.isUndefined(this.options.type)) return;
    this.processedOptions.formdata
      .type = optionParser.parseType(this.options.type);
  }

  processFilename() {
    if (utils.isUndefined(this.options.filename)) return;
    this.processedOptions.formdata
      .outputFile = optionParser.parseFilename(this.options.filename);
  }

  processAutoDownload() {
    if (utils.isUndefined(this.options.autoDownload)) {
      this.processedOptions.metadata.autoDownload = this.defaults.autoDownload;
      return;
    }

    this.processedOptions.metadata
      .autoDownload = optionParser.parseAutoDownload(this.options.autoDownload);
  }

  process() {
    this.processChartConfig();
    this.processQuality();
    this.processType();
    this.processFilename();
    this.processAutoDownload();

    return this.processedOptions;
  }
}
