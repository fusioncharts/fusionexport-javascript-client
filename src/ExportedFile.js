import download from 'downloadjs';
import cloneDeep from 'lodash.clonedeep';
import utils from './utils';

const ext2mimeMap = {
  zip: 'application/zip',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  pdf: 'application/pdf',
  svg: 'image/svg+xml',
  html: 'text/html',
  csv: 'text/csv',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

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
    let filename = cloneDeep(this.filename);

    if (ext2mimeMap[filename.split('.').slice(-1)[0]] !== this.blob.type) {
      filename += `.${utils.getKeyByValue(ext2mimeMap, this.blob.type)}`;
    }

    download(this.blob, filename);
  }
}
