import ExportRequestService from './services/ExportRequestService';
import DSOptValidationService from './services/dashboard/OptionValidationService';
import DSOptProcessorService from './services/dashboard/OptionProcessorService';
import CHOptValidationService from './services/chart/OptionValidationService';
import CHOptProcessorService from './services/chart/OptionProcessorService';

export default class FusionExport {
  constructor(serverConfig) {
    this.exportRequestService = new ExportRequestService(serverConfig);
  }

  dashboard(options, cb) {
    try {
      const dsOptValidationService = new DSOptValidationService(options);

      dsOptValidationService.validate();

      const dsOptProcessorService = new DSOptProcessorService();

      const exportRqParams = dsOptProcessorService.process();

      const processResponse = (err, exportedFile) => {
        if (err) {
          cb(err);
          return;
        }

        if (exportRqParams.metadata.base64) {
          cb(null, exportedFile.data());
          return;
        }

        exportedFile.download();
        cb();
      };

      this.exportRequestService.send(exportRqParams, processResponse);
    } catch (err) {
      cb(err);
    }
  }

  chart(options, cb) {
    try {
      const chOptValidationService = new CHOptValidationService(options);

      chOptValidationService.validate();

      const chOptProcessorService = new CHOptProcessorService();

      const exportRqParams = chOptProcessorService.process();

      const processResponse = (err, exportedFile) => {
        if (err) {
          cb(err);
          return;
        }

        if (exportRqParams.metadata.base64) {
          cb(null, exportedFile.data());
          return;
        }

        exportedFile.download();
        cb();
      };

      this.exportRequestService.send(exportRqParams, processResponse);
    } catch (err) {
      cb(err);
    }
  }
}
