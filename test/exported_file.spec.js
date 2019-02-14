import { expect } from 'chai';
import ExportedFile from '../src/ExportedFile';

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
});
