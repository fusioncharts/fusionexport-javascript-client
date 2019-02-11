import download from 'downloadjs';

export default class ExportedFile {
  constructor(blob, filename) {
    this.blob = blob;
    this.filename = filename;
  }

  blob() {
    return this.blob;
  }

  download() {
    download(this.blob, this.filename);
  }
}
