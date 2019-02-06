import ExportedFile from '../ExportedFile';
import defaultServerConfig from '../../config/server.json';

export default class ExportRequestService {
  constructor(serverConfig) {
    this.serverConfig = Object.assign({}, defaultServerConfig, serverConfig);
    this.url = `http://${this.serverConfig.host}:${this.serverConfig.port}/api/v2.0/export`;
  }

  send(options, cb) {
    const http = new XMLHttpRequest();
    const data = new FormData();

    Object.keys(options.formdata).forEach((key) => {
      data.append(key, options.formdata[key]);
    });

    http.open('POST', this.url, true);

    http.responseType = 'blob';

    http.onreadystatechange = () => {
      if (http.readyState === 4 && http.status === 200) {
        const exportedFile = new ExportedFile(http.responseText, options.filename);
        cb(null, exportedFile);
      }
    };

    http.send(data);
  }
}
