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

  describe('parseTemplate', () => {
    it('should take string value', () => {
      const template = '<html></html>';
      const parsedTemplate = optionParser.parseTemplate(template);
      expect(parsedTemplate).to.equal(template);
    });

    it('should throw an error on providing data of incorrect type', () => {
      const template = {};
      const fn = () => optionParser.parseTemplate(template);
      expect(fn)
        .to.throw(`template of type ${typeof template} is unsupported`)
        .with.property('name', 'Invalid Data Type');
    });
  });

  describe('parseTemplateWidth', () => {
    it('should take number value', () => {
      const templateWidth = 300;
      const parsedTemplateWidth = optionParser.parseTemplateWidth(templateWidth);
      expect(parsedTemplateWidth).to.equal(templateWidth);
    });

    it('should parse string value correctly', () => {
      const templateWidth = '300';
      const parsedTemplateWidth = optionParser.parseTemplateWidth(templateWidth);
      expect(parsedTemplateWidth).to.equal(300);
    });

    it('should throw an error on providing data of incorrect type', () => {
      const templateWidth = {};
      const fn = () => optionParser.parseTemplateWidth(templateWidth);
      expect(fn)
        .to.throw(`templateWidth of type ${typeof templateWidth} is unsupported`)
        .with.property('name', 'Invalid Data Type');
    });
  });

  describe('parseTemplateHeight', () => {
    it('should take number value', () => {
      const templateHeight = 300;
      const parsedTemplateHeight = optionParser.parseTemplateHeight(templateHeight);
      expect(parsedTemplateHeight).to.equal(templateHeight);
    });

    it('should parse string value correctly', () => {
      const templateHeight = '300';
      const parsedTemplateHeight = optionParser.parseTemplateHeight(templateHeight);
      expect(parsedTemplateHeight).to.equal(300);
    });

    it('should throw an error on providing data of incorrect type', () => {
      const templateHeight = {};
      const fn = () => optionParser.parseTemplateHeight(templateHeight);
      expect(fn)
        .to.throw(`templateHeight of type ${typeof templateHeight} is unsupported`)
        .with.property('name', 'Invalid Data Type');
    });
  });

  describe('parseTemplateFormat', () => {
    it('should convert uppercase value to lowercase', () => {
      const templateFormat = 'A4';
      const parsedTemplateFormat = optionParser.parseTemplateFormat(templateFormat);
      expect(parsedTemplateFormat).to.equal(templateFormat.toLowerCase());
    });

    it('should throw an error on providing data of incorrect set', () => {
      const templateFormat = 'high5';
      const fn = () => optionParser.parseTemplateFormat(templateFormat);
      expect(fn)
        .to.throw(`${templateFormat} is not in supported set.`)
        .with.property('name', 'Enum Parse Error');
    });

    it('should throw an error on providing data of incorrect type', () => {
      const templateFormat = {};
      const fn = () => optionParser.parseTemplateFormat(templateFormat);
      expect(fn)
        .to.throw(`templateFormat of type ${typeof templateFormat} is unsupported`)
        .with.property('name', 'Invalid Data Type');
    });
  });

  describe('parseTemplateOnLoad', () => {
    it('should take function as value', () => {
      const templateOnLoad = () => { console.log('Hi!'); };
      const parsedTemplateOnLoad = optionParser.parseTemplateOnLoad(templateOnLoad);
      expect(parsedTemplateOnLoad).to.equal(templateOnLoad);
    });

    it('should throw an error on providing data of incorrect type', () => {
      const templateOnLoad = {};
      const fn = () => optionParser.parseTemplateOnLoad(templateOnLoad);
      expect(fn)
        .to.throw(`templateOnLoad of type ${typeof templateOnLoad} is unsupported`)
        .with.property('name', 'Invalid Data Type');
    });
  });

  describe('parseResources', () => {
    it('should take object as value', () => {
      const resources = {};
      const parsedResources = optionParser.parseResources(resources);
      expect(parsedResources).to.deep.equal(resources);
    });

    it('should throw an error on providing data of incorrect type', () => {
      const resources = '';
      const fn = () => optionParser.parseResources(resources);
      expect(fn)
        .to.throw(`resources of type ${typeof resources} is unsupported`)
        .with.property('name', 'Invalid Data Type');
    });
  });

  describe('parseAsyncCapture', () => {
    it('should take boolean value', () => {
      const asyncCapture = true;
      const parsedAsyncCapture = optionParser.parseAsyncCapture(asyncCapture);
      expect(parsedAsyncCapture).to.equal(true);
    });

    it('should parse string value correctly', () => {
      const asyncCapture = 'true';
      const parsedAsyncCapture = optionParser.parseAsyncCapture(asyncCapture);
      expect(parsedAsyncCapture).to.equal(true);
    });

    it('should parse number value correctly', () => {
      const asyncCapture = 0;
      const parsedAsyncCapture = optionParser.parseAsyncCapture(asyncCapture);
      expect(parsedAsyncCapture).to.equal(false);
    });

    it('should throw an error on providing data of incorrect type', () => {
      const asyncCapture = {};
      const fn = () => optionParser.parseAsyncCapture(asyncCapture);
      expect(fn)
        .to.throw(`asyncCapture of type ${typeof asyncCapture} is unsupported`)
        .with.property('name', 'Invalid Data Type');
    });
  });

  describe('parseMaxWaitForCaptureExit', () => {
    it('should take number value', () => {
      const maxWaitForCaptureExit = 3000;
      const parsedMaxWaitForCaptureExit = optionParser
        .parseMaxWaitForCaptureExit(maxWaitForCaptureExit);
      expect(parsedMaxWaitForCaptureExit).to.equal(maxWaitForCaptureExit);
    });

    it('should parse string value correctly', () => {
      const maxWaitForCaptureExit = '3000';
      const parsedMaxWaitForCaptureExit = optionParser
        .parseMaxWaitForCaptureExit(maxWaitForCaptureExit);
      expect(parsedMaxWaitForCaptureExit).to.equal(3000);
    });

    it('should throw an error on providing data of incorrect type', () => {
      const maxWaitForCaptureExit = {};
      const fn = () => optionParser.parseMaxWaitForCaptureExit(maxWaitForCaptureExit);
      expect(fn)
        .to.throw(`maxWaitForCaptureExit of type ${typeof maxWaitForCaptureExit} is unsupported`)
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
