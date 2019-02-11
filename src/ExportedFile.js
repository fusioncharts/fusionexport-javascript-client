import download from 'downloadjs';
import utils from './utils';

export default class ExportedFile {
  constructor(blob, filename) {
    this.blob = blob;
    this.filename = filename;
  }

  blob() {
    return this.blob;
  }

  dataURL(cb = () => {}) {
    return utils.blobToDataURL(this.blob, cb);
  }

  download() {
    download(this.blob, this.filename);
  }
}
