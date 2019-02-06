import download from 'downloadjs';

export default class ExportedFile {
  constructor(data, filename) {
    this.data = data;
    this.filename = filename;
  }

  data() {
    return this.data;
  }

  download() {
    download(this.data, this.filename);
  }
}
