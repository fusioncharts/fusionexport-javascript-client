import ExportRequestService from './services/ExportRequestService';
import DSOptValidationService from './services/dashboard/OptionValidationService';
import DSOptProcessorService from './services/dashboard/OptionProcessorService';
import CHOptValidationService from './services/chart/OptionValidationService';
import CHOptProcessorService from './services/chart/OptionProcessorService';
import TemplateBuilderService from './services/dashboard/TemplateBuilderService';

export default class FusionExport {
  constructor(serverConfig) {
    this.exportRequestService = new ExportRequestService(serverConfig);
  }

  exportChart(options, cb = () => {}) {
    try {
      const chOptValidationService = new CHOptValidationService(options);

      chOptValidationService.validate();

      const chOptProcessorService = new CHOptProcessorService(options);

      const processedOptions = chOptProcessorService.process();

      const processResponse = (err, exportedFile) => {
        if (err) {
          cb(err);
          return;
        }

        if (processedOptions.metadata.autoDownload) {
          exportedFile.download();
          cb();
          return;
        }

        cb(null, exportedFile);
      };

      this.exportRequestService.send(processedOptions, processResponse);
    } catch (err) {
      cb(err);
    }
  }

  exportDashboard(options, cb = () => {}) {
    try {
      const dsOptValidationService = new DSOptValidationService(options);

      dsOptValidationService.validate();

      const dsOptProcessorService = new DSOptProcessorService(options);

      let processedOptions = dsOptProcessorService.process();

      const templateBuilderService = new TemplateBuilderService(processedOptions);

      processedOptions = templateBuilderService.build();

      const processResponse = (err, exportedFile) => {
        if (err) {
          cb(err);
          return;
        }

        if (processedOptions.metadata.autoDownload) {
          exportedFile.download();
          cb();
          return;
        }

        cb(null, exportedFile);
      };

      this.exportRequestService.send(processedOptions, processResponse);
    } catch (err) {
      cb(err);
    }
  }
}
