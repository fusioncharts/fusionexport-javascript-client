import sinon from 'sinon';
import { expect } from 'chai';
// eslint-disable-next-line
import ExportedFileInjector from 'inject-loader!../src/ExportedFile';

const downloadSpy = sinon.spy();
const ExportedFile = ExportedFileInjector({
  downloadjs: downloadSpy,
});

describe('ExportedFile', () => {
  it('should return correct blob', () => {
    const blob = new Blob(['abcdef']);
    const ef = new ExportedFile(blob, 'output.txt');
    expect(ef.getBlob()).to.equal(blob);
  });

  it('should return correct dataURL', (done) => {
    const blob = new Blob(['abcdef'], { type: 'text/plain' });
    const ef = new ExportedFile(blob, 'output.txt');
    ef.getDataURL((err, dataURL) => {
      expect(dataURL).to.equal('data:text/plain;base64,YWJjZGVm');
      done();
    });
  });

  it('should append correct extension when incorrect extension is provided', () => {
    const blob = new Blob(['abcdef'], { type: 'text/csv' });
    const ef = new ExportedFile(blob, 'output.zip');
    ef.download();
    expect(downloadSpy.calledWith(blob, 'output.zip.csv')).to.equal(true);
  });
});
