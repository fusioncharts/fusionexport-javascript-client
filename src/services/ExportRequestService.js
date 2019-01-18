import defaultServerConfig from '../../config/server.json';

export default class ExportRequestService {
  constructor(serverConfig) {
    this.serverConfig = Object.assign({}, defaultServerConfig, serverConfig);
  }
}
