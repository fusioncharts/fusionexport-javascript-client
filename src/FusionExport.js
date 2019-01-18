import ExportRequestService from './services/ExportRequestService';
import DSOptValidationService from './services/dashboard/OptionValidationService';
import DSOptProcessorService from './services/dashboard/OptionProcessorService';
import CHOptValidationService from './services/chart/OptionValidationService';
import CHOptProcessorService from './services/chart/OptionProcessorService';

export default class FusionExport {
  constructor(serverConfig) {
    this.exportRequestService = new ExportRequestService(serverConfig);
  }

  async dashboard(options) {
    const dsOptValidationService = new DSOptValidationService(options);

    dsOptValidationService.validate();

    const dsOptProcessorService = new DSOptProcessorService();

    const exportRqParams = dsOptProcessorService.process();

    return this.exportRequestService.send(exportRqParams);
  }

  async chart(options) {
    const chOptValidationService = new CHOptValidationService(options);

    chOptValidationService.validate();

    const chOptProcessorService = new CHOptProcessorService();

    const exportRqParams = chOptProcessorService.process();

    return this.exportRequestService.send(exportRqParams);
  }
}
