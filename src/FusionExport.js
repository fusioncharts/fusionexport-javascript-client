import ExportRequestService from './services/ExportRequestService';
import DSOptValidationService from './services/dashboard/OptionValidationService';
import DSOptProcessorService from './services/dashboard/OptionProcessorService';
import CHOptValidationService from './services/chart/OptionValidationService';
import CHOptProcessorService from './services/chart/OptionProcessorService';

const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_PORT = 1337;

export default class FusionExport {
  constructor(serverConfig) {
    const defaultServerConfig = {
      host: DEFAULT_HOST,
      port: DEFAULT_PORT,
    };

    this.serverConfig = Object.assign({}, defaultServerConfig, serverConfig);

    this.exportRequestService = new ExportRequestService(this.serverConfig);
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
