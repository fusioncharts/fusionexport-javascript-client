import ExportedFile from '../ExportedFile';
import defaultServerConfig from '../../config/server.json';

function readError(blob, cb) {
  if (!(blob instanceof Blob)) {
    cb(new TypeError(`${blob} is not an instance of Blob`));
    return;
  }

  const reader = new FileReader();

  reader.addEventListener('loadend', ({ target }) => {
    const text = target.result;

    if (blob.type === 'application/json') {
      let json = {};

      try {
        json = JSON.parse(text);
      } catch (err) {
        cb(null, text);
        return;
      }

      cb(null, json.error);
    } else {
      cb(null, text);
    }
  });

  reader.readAsText(blob);
}

export default class ExportRequestService {
  constructor(serverConfig) {
    this.serverConfig = Object.assign({}, defaultServerConfig, serverConfig);
    this.serverURL = `http://${this.serverConfig.host}:${this.serverConfig.port}`;
    this.exportEndpoint = `${this.serverURL}/api/v2.0/export`;
  }

  send(options, cb) {
    const http = new XMLHttpRequest();
    const data = new FormData();

    Object.keys(options.formdata).forEach((key) => {
      data.append(key, options.formdata[key]);
    });

    http.open('POST', this.exportEndpoint, true);
    http.responseType = 'blob';

    http.onreadystatechange = evt => this.readyStateChangeListener(evt, options, cb);

    http.send(data);
  }

  readyStateChangeListener({ target }, options, cb) {
    if (target.readyState !== 4) return;

    if (target.status === 0) {
      const connRefusedError = new Error(`Cannot connect to FusionExport server. Please check if FusionExport is running on ${this.serverURL}.`);
      connRefusedError.name = 'Connection Refused';
      cb(connRefusedError);
      return;
    }

    if (!(target.response instanceof Blob)) {
      cb(new TypeError(`Response ${target.response} is not of type Blob`));
      return;
    }

    if (target.status === 200) {
      const exportedFile = new ExportedFile(target.response, options.metadata.filename);
      cb(null, exportedFile);
      return;
    }

    readError(target.response, (err, errText) => {
      if (err) {
        cb(err);
        return;
      }

      const requestFailedError = new Error(errText);
      requestFailedError.responseStatus = target.status;
      requestFailedError.responseStatusText = target.statusText;
      cb(requestFailedError);
    });
  }
}
