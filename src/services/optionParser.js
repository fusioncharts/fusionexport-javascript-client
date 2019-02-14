import cloneDeep from 'lodash.clonedeep';
import utils from '../utils';
import typings from '../../config/typings.json';

function checkDatasetSupport(value, dataset) {
  const lowerCasedDataset = dataset.map(d => d.toLowerCase());
  const lowerCasedValue = value.toLowerCase();

  if (!lowerCasedDataset.includes(lowerCasedValue)) {
    const enumParseError = new Error(`${value} is not in supported set. Supported values are ${utils.humanizeArray(dataset)}`);
    enumParseError.name = 'Enum Parse Error';
    enumParseError.dataset = dataset;
    throw enumParseError;
  }
}

function checkSupport(name, value) {
  const { supportedTypes, dataset } = typings[name];

  const isSupported = supportedTypes.some((supportedType) => {
    // eslint-disable-next-line valid-typeof
    if (typeof value === supportedType) {
      return true;
    }

    return false;
  });

  if (!isSupported) {
    const invalidDataTypeError = new Error(`${name} of type ${typeof value} is unsupported. Supported data type are ${utils.humanizeArray(supportedTypes)}.`);
    invalidDataTypeError.name = 'Invalid Data Type';
    throw invalidDataTypeError;
  }

  if (dataset) {
    checkDatasetSupport(value, dataset);
  }
}

function parseChartConfig(_chartConfig) {
  const configName = 'chartConfig';

  let chartConfig = cloneDeep(_chartConfig);

  checkSupport(configName, chartConfig);

  if (!Array.isArray(chartConfig)) {
    chartConfig = [chartConfig];
  }

  chartConfig = JSON.stringify(chartConfig);

  return chartConfig;
}

function parseTemplate(_template) {
  const configName = 'template';

  const template = cloneDeep(_template);

  checkSupport(configName, template);

  return template;
}

function parseTemplateWidth(_templateWidth) {
  const configName = 'templateWidth';

  let templateWidth = cloneDeep(_templateWidth);

  checkSupport(configName, templateWidth);

  templateWidth = utils.parseNumber(templateWidth);

  return templateWidth;
}

function parseTemplateHeight(_templateHeight) {
  const configName = 'templateHeight';

  let templateHeight = cloneDeep(_templateHeight);

  checkSupport(configName, templateHeight);

  templateHeight = utils.parseNumber(templateHeight);

  return templateHeight;
}

function parseTemplateFormat(_templateFormat) {
  const configName = 'templateFormat';

  let templateFormat = cloneDeep(_templateFormat);

  checkSupport(configName, templateFormat);

  templateFormat = templateFormat.toLowerCase();

  return templateFormat;
}

function parseTemplateOnLoad(_templateOnLoad) {
  const configName = 'templateOnLoad';

  const templateOnLoad = cloneDeep(_templateOnLoad);

  checkSupport(configName, templateOnLoad);

  return templateOnLoad;
}

function parseResources(_resources) {
  const configName = 'resources';

  const resources = cloneDeep(_resources);

  checkSupport(configName, resources);

  return resources;
}

function parseAsyncCapture(_asyncCapture) {
  const configName = 'asyncCapture';

  let asyncCapture = cloneDeep(_asyncCapture);

  checkSupport(configName, asyncCapture);

  asyncCapture = utils.parseBool(asyncCapture);

  return asyncCapture;
}

function parseMaxWaitForCaptureExit(_maxWaitForCaptureExit) {
  const configName = 'maxWaitForCaptureExit';

  let maxWaitForCaptureExit = cloneDeep(_maxWaitForCaptureExit);

  checkSupport(configName, maxWaitForCaptureExit);

  maxWaitForCaptureExit = utils.parseNumber(maxWaitForCaptureExit);

  return maxWaitForCaptureExit;
}

function parseQuality(_quality) {
  const configName = 'quality';

  let quality = cloneDeep(_quality);

  checkSupport(configName, quality);

  quality = quality.toLowerCase();

  return quality;
}

function parseType(_type) {
  const configName = 'type';

  let type = cloneDeep(_type);

  checkSupport(configName, type);

  type = type.toLowerCase();

  return type;
}

function parseFilename(_filename) {
  const configName = 'filename';

  const filename = cloneDeep(_filename);

  checkSupport(configName, filename);

  return filename;
}

function parseAutoDownload(_autoDownload) {
  const configName = 'autoDownload';

  let autoDownload = cloneDeep(_autoDownload);

  checkSupport(configName, autoDownload);

  autoDownload = utils.parseBool(autoDownload);

  return autoDownload;
}

export default {
  parseChartConfig,
  parseTemplate,
  parseTemplateWidth,
  parseTemplateHeight,
  parseTemplateFormat,
  parseTemplateOnLoad,
  parseResources,
  parseAsyncCapture,
  parseMaxWaitForCaptureExit,
  parseQuality,
  parseType,
  parseFilename,
  parseAutoDownload,
};
