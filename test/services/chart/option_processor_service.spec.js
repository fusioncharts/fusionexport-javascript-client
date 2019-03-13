import { expect } from 'chai';
import OptionProcessorService from '../../../src/services/chart/OptionProcessorService';

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
