import ExportRequestService from './services/ExportRequestService';
import DSOptValidationService from './services/dashboard/OptionValidationService';
import DSOptProcessorService from './services/dashboard/OptionProcessorService';
import CHOptValidationService from './services/chart/OptionValidationService';
import CHOptProcessorService from './services/chart/OptionProcessorService';

export default class FusionExport {
  constructor(serverConfig) {
    this.exportRequestService = new ExportRequestService(serverConfig);
  }

  chart(options, cb) {
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

        if (processedOptions.metadata.base64) {
          cb(null, exportedFile.data());
          return;
        }

        exportedFile.download();
        cb();
      };

      this.exportRequestService.send(processedOptions, processResponse);
    } catch (err) {
      cb(err);
    }
  }

  dashboard(options, cb) {
    try {
      const dsOptValidationService = new DSOptValidationService(options);

      dsOptValidationService.validate();

      const dsOptProcessorService = new DSOptProcessorService(options);

      const processedOptions = dsOptProcessorService.process();

      const processResponse = (err, exportedFile) => {
        if (err) {
          cb(err);
          return;
        }

        if (processedOptions.metadata.base64) {
          cb(null, exportedFile.data());
          return;
        }

        exportedFile.download();
        cb();
      };

      this.exportRequestService.send(processedOptions, processResponse);
    } catch (err) {
      cb(err);
    }
  }
}
