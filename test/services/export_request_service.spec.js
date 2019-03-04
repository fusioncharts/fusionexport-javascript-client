import sinon from 'sinon';
import { expect } from 'chai';
import ExportRequestService from '../../src/services/ExportRequestService';

describe('ExportRequestService', () => {
  const defaultServerHost = '127.0.0.1';
  const defaultServerPort = 1337;
  let fakeXHR;
  let req;

  beforeEach(() => {
    fakeXHR = sinon.useFakeXMLHttpRequest();
    fakeXHR.onCreate = (_req) => { req = _req; };
  });

  it('should use default config when no config is passed', () => {
    const exportRequestService = new ExportRequestService();
    expect(exportRequestService.serverConfig.host).to.equal(defaultServerHost);
    expect(exportRequestService.serverConfig.port).to.equal(defaultServerPort);
  });

  it('should use provided port when only port is passed', () => {
    const port = 1111;
    const exportRequestService = new ExportRequestService({ port });
    expect(exportRequestService.serverConfig.port).to.equal(port);
    expect(exportRequestService.serverConfig.host).to.equal(defaultServerHost);
  });

  it('should use provided port when only port is passed', () => {
    const host = '0.0.0.0';
    const exportRequestService = new ExportRequestService({ host });
    expect(exportRequestService.serverConfig.host).to.equal(host);
    expect(exportRequestService.serverConfig.port).to.equal(defaultServerPort);
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
    req.respond(0);
  });

  it('should set correct method, url, responseType and requestBody', (done) => {
    const ers = new ExportRequestService();
    const opts = { formdata: {}, metadata: {} };
    ers.send(opts, () => {
      expect(req.method).to.equal('POST');
      expect(req.url).to.equal(`http://${defaultServerHost}:${defaultServerPort}/api/v2.0/export`);
      expect(req.responseType).to.equal('blob');
      expect(req.requestBody).to.be.an.instanceOf(FormData);
      done();
    });
    req.respond(200, {}, 'OK');
  });

  it('should populate requestBody correctly', (done) => {
    const ers = new ExportRequestService();
    const opts = { formdata: { a: 'a', b: true, c: 123 }, metadata: {} };
    ers.send(opts, () => {
      expect(req.requestBody).to.be.an.instanceOf(FormData);
      expect(req.requestBody.get('a')).to.equal('a');
      expect(req.requestBody.get('b')).to.equal('true');
      expect(req.requestBody.get('c')).to.equal('123');
      done();
    });
    req.respond(200, {}, 'OK');
  });

  it('should set exported file with response data', (done) => {
    const ers = new ExportRequestService();
    const opts = { formdata: {}, metadata: {} };
    ers.send(opts, (e, ef) => {
      expect(ef.getDataURL((_, data) => {
        expect(data).to.equal('data:text/html;base64,T0s=');
        done();
      }));
    });
    req.respond(200, { 'Content-Type': 'text/html' }, 'OK');
  });

  it('should set exported file with provided filename', (done) => {
    const ers = new ExportRequestService();
    const opts = { formdata: {}, metadata: { filename: 'output' } };
    ers.send(opts, (err, ef) => {
      expect(ef.filename).to.equal('output');
      done();
    });
    req.respond(200, {}, 'OK');
  });

  it('should set exported file with attachment filename', (done) => {
    const ers = new ExportRequestService();
    const opts = { formdata: {}, metadata: {} };
    ers.send(opts, (err, ef) => {
      expect(ef.filename).to.equal('random');
      done();
    });
    req.respond(200, { 'Content-Disposition': 'attachment; filename="random"' }, 'OK');
  });

  it('should parse server error of type JSON correctly', (done) => {
    const ers = new ExportRequestService();
    const opts = { formdata: {}, metadata: {} };
    ers.send(opts, (err) => {
      expect(err.message).to.equal('I am an error!');
      expect(err.responseStatus).to.equal(500);
      expect(err.responseStatusText).to.equal('Internal Server Error');
      done();
    });
    req.respond(500, { 'Content-Type': 'application/json' }, '{"error":"I am an error!"}');
  });

  it('should parse server error of type text correctly', (done) => {
    const ers = new ExportRequestService();
    const opts = { formdata: {}, metadata: {} };
    ers.send(opts, (err) => {
      expect(err.message).to.equal('I am an text error!');
      expect(err.responseStatus).to.equal(500);
      expect(err.responseStatusText).to.equal('Internal Server Error');
      done();
    });
    req.respond(500, {}, 'I am an text error!');
  });

  afterEach(() => {
    fakeXHR.restore();
  });
});
