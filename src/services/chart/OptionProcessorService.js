import utils from '../../utils';
import optionParser from '../optionParser';

export default class OptionProcessorService {
  constructor(options) {
    this.options = options;
    this.defaults = {
      filename: 'export',
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

  // TODO: Return correct filename from server and write a simpler logic here
  processFilename() {
    const chartConfigCount = JSON.parse(this.processedOptions.formdata.chartConfig).length;

    if (utils.isUndefined(this.options.filename)) {
      if (chartConfigCount === 1) {
        this.processedOptions.formdata.outputFile = this.defaults.filename;
      }
      this.processedOptions.metadata.filename = this.defaults.filename;
      return;
    }

    const parsedFilename = optionParser.parseFilename(this.options.filename);
    this.processedOptions.formdata.outputFile = parsedFilename;
    if (chartConfigCount > 1) {
      this.processedOptions.metadata.filename = this.defaults.filename;
    }
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
