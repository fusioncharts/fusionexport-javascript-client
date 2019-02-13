import { expect } from 'chai';
import optionParser from '../../src/services/optionParser';

describe('optionParser', () => {
  describe('parseChartConfig', () => {
    it('should convert single object to array', () => {
      const chartConfig = {};
      const parsedChartConfig = optionParser.parseChartConfig(chartConfig);
      expect(parsedChartConfig).to.equal(JSON.stringify([chartConfig]));
    });

    it('should throw an error on providing data of incorrect type', () => {
      const chartConfig = 'abc';
      const fn = () => optionParser.parseChartConfig(chartConfig);
      expect(fn)
        .to.throw(`chartConfig of type ${typeof chartConfig} is unsupported`)
        .with.property('name', 'Invalid Data Type');
    });
  });

  describe('parseQuality', () => {
    it('should convert uppercase value to lowercase', () => {
      const quality = 'GOOD';
      const parsedQuality = optionParser.parseQuality(quality);
      expect(parsedQuality).to.equal(quality.toLowerCase());
    });

    it('should throw an error on providing data of incorrect set', () => {
      const quality = 'high';
      const fn = () => optionParser.parseQuality(quality);
      expect(fn)
        .to.throw(`${quality} is not in supported set.`)
        .with.property('name', 'Enum Parse Error');
    });

    it('should throw an error on providing data of incorrect type', () => {
      const quality = {};
      const fn = () => optionParser.parseQuality(quality);
      expect(fn)
        .to.throw(`quality of type ${typeof quality} is unsupported`)
        .with.property('name', 'Invalid Data Type');
    });
  });

  describe('parseType', () => {
    it('should convert uppercase value to lowercase', () => {
      const type = 'JPEG';
      const parsedType = optionParser.parseType(type);
      expect(parsedType).to.equal(type.toLowerCase());
    });

    it('should throw an error on providing data of incorrect set', () => {
      const type = 'orange';
      const fn = () => optionParser.parseType(type);
      expect(fn)
        .to.throw(`${type} is not in supported set.`)
        .with.property('name', 'Enum Parse Error');
    });

    it('should throw an error on providing data of incorrect type', () => {
      const type = {};
      const fn = () => optionParser.parseType(type);
      expect(fn)
        .to.throw(`type of type ${typeof type} is unsupported`)
        .with.property('name', 'Invalid Data Type');
    });
  });

  describe('parseFilename', () => {
    it('should take string value', () => {
      const filename = 'output';
      const parsedFilename = optionParser.parseFilename(filename);
      expect(parsedFilename).to.equal(filename);
    });

    it('should throw an error on providing data of incorrect type', () => {
      const filename = {};
      const fn = () => optionParser.parseFilename(filename);
      expect(fn)
        .to.throw(`filename of type ${typeof filename} is unsupported`)
        .with.property('name', 'Invalid Data Type');
    });
  });

  describe('parseAutoDownload', () => {
    it('should take boolean value', () => {
      const autoDownload = true;
      const parsedAutoDownload = optionParser.parseAutoDownload(autoDownload);
      expect(parsedAutoDownload).to.equal(true);
    });

    it('should parse string value correctly', () => {
      const autoDownload = 'true';
      const parsedAutoDownload = optionParser.parseAutoDownload(autoDownload);
      expect(parsedAutoDownload).to.equal(true);
    });

    it('should parse number value correctly', () => {
      const autoDownload = 0;
      const parsedAutoDownload = optionParser.parseAutoDownload(autoDownload);
      expect(parsedAutoDownload).to.equal(false);
    });

    it('should throw an error on providing data of incorrect type', () => {
      const autoDownload = {};
      const fn = () => optionParser.parseAutoDownload(autoDownload);
      expect(fn)
        .to.throw(`autoDownload of type ${typeof autoDownload} is unsupported`)
        .with.property('name', 'Invalid Data Type');
    });
  });
});
