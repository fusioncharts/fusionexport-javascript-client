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
    if (utils.isUndefined(this.options.chartConfig)) return;
    this.processedOptions.formdata
      .chartConfig = optionParser.parseChartConfig(this.options.chartConfig);
  }

  processTemplate() {
    if (utils.isUndefined(this.options.template)) return;
    this.processedOptions.formdata
      .template = optionParser.parseTemplate(this.options.template);
  }

  processTemplateWidth() {
    if (utils.isUndefined(this.options.templateWidth)) return;
    this.processedOptions.formdata
      .templateWidth = optionParser.parseTemplateWidth(this.options.templateWidth);
  }

  processTemplateHeight() {
    if (utils.isUndefined(this.options.templateHeight)) return;
    this.processedOptions.formdata
      .templateHeight = optionParser.parseTemplateHeight(this.options.templateHeight);
  }

  processTemplateFormat() {
    if (utils.isUndefined(this.options.templateFormat)) return;
    this.processedOptions.formdata
      .templateFormat = optionParser.parseTemplateFormat(this.options.templateFormat);
  }

  processTemplateOnLoad() {
    if (utils.isUndefined(this.options.templateOnLoad)) return;
    this.processedOptions.metadata
      .templateOnLoad = optionParser.parseTemplateOnLoad(this.options.templateOnLoad);
  }

  processResources() {
    if (utils.isUndefined(this.options.resources)) return;
    this.processedOptions.metadata
      .resources = optionParser.parseResources(this.options.resources);
  }

  processAsyncCapture() {
    if (utils.isUndefined(this.options.asyncCapture)) return;
    this.processedOptions.formdata
      .asyncCapture = optionParser.parseAsyncCapture(this.options.asyncCapture);
  }

  processMaxWaitForCaptureExit() {
    if (utils.isUndefined(this.options.maxWaitForCaptureExit)) return;
    this.processedOptions.formdata
      .maxWaitForCaptureExit = optionParser.parseMaxWaitForCaptureExit(
        this.options.maxWaitForCaptureExit,
      );
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
    this.processTemplate();
    this.processTemplateWidth();
    this.processTemplateHeight();
    this.processTemplateFormat();
    this.processTemplateOnLoad();
    this.processResources();
    this.processAsyncCapture();
    this.processMaxWaitForCaptureExit();
    this.processQuality();
    this.processType();
    this.processFilename();
    this.processAutoDownload();

    return this.processedOptions;
  }
}
