import { expect } from 'chai';
import OptionProcessorService from '../../../src/services/dashboard/OptionProcessorService';

describe('OptionProcessorService', () => {
  it('should process chartConfig correctly', () => {
    const opts = {
      chartConfig: {
        type: 'column2d',
      },
    };
    const ops = new OptionProcessorService(opts);
    const processedOpts = ops.process();
    expect(processedOpts.formdata.chartConfig).to.equal(JSON.stringify([opts.chartConfig]));
  });

  it('should process template correctly', () => {
    const opts = {
      template: '<body></body>',
    };
    const ops = new OptionProcessorService(opts);
    const processedOpts = ops.process();
    expect(processedOpts.formdata.template).to.equal(opts.template);
  });

  it('should process templateWidth correctly', () => {
    const opts = {
      template: '<body></body>',
      templateWidth: 300,
    };
    const ops = new OptionProcessorService(opts);
    const processedOpts = ops.process();
    expect(processedOpts.formdata.templateWidth).to.equal(opts.templateWidth);
  });

  it('should process templateHeight correctly', () => {
    const opts = {
      template: '<body></body>',
      templateHeight: 500,
    };
    const ops = new OptionProcessorService(opts);
    const processedOpts = ops.process();
    expect(processedOpts.formdata.templateHeight).to.equal(opts.templateHeight);
  });

  it('should process templateFormat correctly', () => {
    const opts = {
      template: '<body></body>',
      templateFormat: 'a4',
    };
    const ops = new OptionProcessorService(opts);
    const processedOpts = ops.process();
    expect(processedOpts.formdata.templateFormat).to.equal(opts.templateFormat);
  });

  it('should process templateOnLoad correctly', () => {
    const opts = {
      template: '<body></body>',
      templateOnLoad: () => {},
    };
    const ops = new OptionProcessorService(opts);
    const processedOpts = ops.process();
    expect(processedOpts.metadata.templateOnLoad).to.equal(opts.templateOnLoad);
  });

  it('should process resources correctly', () => {
    const opts = {
      template: '<body></body>',
      resources: { links: [] },
    };
    const ops = new OptionProcessorService(opts);
    const processedOpts = ops.process();
    expect(processedOpts.metadata.resources).to.deep.equal(opts.resources);
  });

  it('should process asyncCapture correctly', () => {
    const opts = {
      template: '<body></body>',
      asyncCapture: true,
    };
    const ops = new OptionProcessorService(opts);
    const processedOpts = ops.process();
    expect(processedOpts.formdata.asyncCapture).to.deep.equal(opts.asyncCapture);
  });

  it('should process maxWaitForCaptureExit correctly', () => {
    const opts = {
      template: '<body></body>',
      maxWaitForCaptureExit: 3000,
    };
    const ops = new OptionProcessorService(opts);
    const processedOpts = ops.process();
    expect(processedOpts.formdata.maxWaitForCaptureExit).to.deep.equal(opts.maxWaitForCaptureExit);
  });

  it('should process quality correctly', () => {
    const opts = {
      chartConfig: {},
      quality: 'good',
    };
    const ops = new OptionProcessorService(opts);
    const processedOpts = ops.process();
    expect(processedOpts.formdata.quality).to.equal(opts.quality);
  });

  it('should process type correctly', () => {
    const opts = {
      chartConfig: {},
      type: 'pdf',
    };
    const ops = new OptionProcessorService(opts);
    const processedOpts = ops.process();
    expect(processedOpts.formdata.type).to.equal(opts.type);
  });

  it('should process filename correctly', () => {
    const opts = {
      chartConfig: {},
      filename: 'output',
    };
    const ops = new OptionProcessorService(opts);
    const processedOpts = ops.process();
    expect(processedOpts.formdata.outputFile).to.equal(opts.filename);
    expect(processedOpts.metadata.filename).to.equal(opts.filename);
  });

  it('should use default filename when no filename is passed', () => {
    const opts = {
      chartConfig: {},
    };
    const ops = new OptionProcessorService(opts);
    const processedOpts = ops.process();
    expect(processedOpts.formdata.outputFile).to.equal(ops.defaults.filename);
    expect(processedOpts.metadata.filename).to.equal(ops.defaults.filename);
  });

  it('should process autoDownload correctly', () => {
    const opts = {
      chartConfig: {},
      autoDownload: false,
    };
    const ops = new OptionProcessorService(opts);
    const processedOpts = ops.process();
    expect(processedOpts.metadata.autoDownload).to.equal(opts.autoDownload);
  });

  it('should use default autoDownload when no autoDownload is passed', () => {
    const opts = {
      chartConfig: {},
    };
    const ops = new OptionProcessorService(opts);
    const processedOpts = ops.process();
    expect(processedOpts.metadata.autoDownload).to.equal(ops.defaults.autoDownload);
  });
});
