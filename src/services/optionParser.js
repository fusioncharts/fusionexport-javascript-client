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

function parseQuality(_quality) {
  const configName = 'quality';

  let quality = cloneDeep(_quality);

  checkSupport(configName, quality);

  quality = quality.toLowerCase();

  return quality;
}

function parseType(_type) {
  const configName = 'quality';

  let type = cloneDeep(_type);

  checkSupport(configName, type);

  type = type.toLowerCase();

  return type;
}

function parseFilename(_filename) {
  const configName = 'quality';

  const filename = cloneDeep(_filename);

  checkSupport(configName, filename);

  return filename;
}

function parseBase64(_base64) {
  const configName = 'quality';

  let base64 = cloneDeep(_base64);

  checkSupport(configName, base64);

  base64 = utils.parseBool(base64);

  return base64;
}

export default {
  parseChartConfig,
  parseQuality,
  parseType,
  parseFilename,
  parseBase64,
};
