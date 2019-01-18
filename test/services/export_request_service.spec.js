import { expect } from 'chai';
import ExportRequestService from '../../src/services/ExportRequestService';
import defaultServerConfig from '../../config/server.json';

describe('ExportRequestService', () => {
  it('should use default config when no config is passed', () => {
    const exportRequestService = new ExportRequestService();
    expect(exportRequestService.serverConfig.host).to.equal(defaultServerConfig.host);
    expect(exportRequestService.serverConfig.port).to.equal(defaultServerConfig.port);
  });

  it('should use default host when only port is passed', () => {
    const exportRequestService = new ExportRequestService({ port: 1111 });
    expect(exportRequestService.serverConfig.host).to.equal(defaultServerConfig.host);
  });

  it('should use provided port when only port is passed', () => {
    const port = 1111;
    const exportRequestService = new ExportRequestService({ port });
    expect(exportRequestService.serverConfig.port).to.equal(port);
  });

  it('should use default port when only host is passed', () => {
    const exportRequestService = new ExportRequestService({ host: '0.0.0.0' });
    expect(exportRequestService.serverConfig.port).to.equal(defaultServerConfig.port);
  });

  it('should use provided port when only port is passed', () => {
    const host = '0.0.0.0';
    const exportRequestService = new ExportRequestService({ host });
    expect(exportRequestService.serverConfig.host).to.equal(host);
  });

  it('should use provided host and port when passed', () => {
    const host = '0.0.0.0';
    const port = 1111;
    const exportRequestService = new ExportRequestService({ host, port });
    expect(exportRequestService.serverConfig.host).to.equal(host);
    expect(exportRequestService.serverConfig.port).to.equal(port);
  });
});
