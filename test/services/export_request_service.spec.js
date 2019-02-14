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

  it('should define correct server url', () => {
    const host = '0.0.0.0';
    const port = 1111;
    const exportRequestService = new ExportRequestService({ host, port });
    expect(exportRequestService.serverURL).to.equal(`http://${host}:${port}`);
  });

  it('should define correct export endpoint', () => {
    const host = '0.0.0.0';
    const port = 1111;
    const exportRequestService = new ExportRequestService({ host, port });
    expect(exportRequestService.exportEndpoint).to.equal(`http://${host}:${port}/api/v2.0/export`);
  });

  it('should return error when connected to incorrect url', (done) => {
    const host = '0.0.0.0';
    const port = 1111;
    const exportRequestService = new ExportRequestService({ host, port });
    const options = { formdata: {}, metadata: {} };
    exportRequestService.send(options, (err) => {
      expect(err.message).to.have.string('Cannot connect to FusionExport server.');
      expect(err.name).to.equal('Connection Refused');
      done();
    });
  });
});
