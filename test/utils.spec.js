import { expect } from 'chai';
import utils from '../src/utils';

describe('utils', () => {
  describe('isUndefined', () => {
    it('should return true on passing undefined', () => {
      expect(utils.isUndefined(undefined)).to.equal(true);
    });

    it('should not return true on passing false', () => {
      expect(utils.isUndefined(false)).to.equal(false);
    });

    it('should not return true on passing 0', () => {
      expect(utils.isUndefined(0)).to.equal(false);
    });
  });

  describe('parseBool', () => {
    it('should parse boolean value correctly', () => {
      expect(utils.parseBool(true)).to.equal(true);
      expect(utils.parseBool(false)).to.equal(false);
    });

    it('should parse string value correctly', () => {
      expect(utils.parseBool('true')).to.equal(true);
      expect(utils.parseBool('false')).to.equal(false);
    });

    it('should parse number value correctly', () => {
      expect(utils.parseBool(1)).to.equal(true);
      expect(utils.parseBool(0)).to.equal(false);
    });

    it('should throw an error on passing incorrect string value', () => {
      const fn = () => utils.parseBool('not_parsable');
      expect(fn).to.throw("Couldn't convert to boolean");
    });

    it('should throw an error on passing incorrect number value', () => {
      const fn = () => utils.parseBool(-2);
      expect(fn).to.throw("Couldn't convert to boolean");
    });

    it('should throw an error on passing incorrect type', () => {
      const fn = () => utils.parseBool({});
      expect(fn).to.throw("Couldn't convert to boolean");
    });
  });

  describe('parseNumber', () => {
    it('should parse number value correctly', () => {
      expect(utils.parseNumber(12)).to.equal(12);
    });

    it('should parse string value correctly', () => {
      expect(utils.parseNumber('123')).to.equal(123);
      expect(utils.parseNumber('-123')).to.equal(-123);
    });

    it('should throw an error on passing incorrect string value', () => {
      const fn = () => utils.parseNumber('not_parsable');
      expect(fn).to.throw("Couldn't convert to number");
    });

    it('should throw an error on passing incorrect type', () => {
      const fn = () => utils.parseNumber({});
      expect(fn).to.throw("Couldn't convert to number");
    });
  });

  describe('humanizeArray', () => {
    it('should return empty string on passing incorrect type', () => {
      expect(utils.humanizeArray({})).to.equal('');
    });

    it('should return correct value on passing single value', () => {
      expect(utils.humanizeArray(['a'])).to.equal('a');
    });

    it('should return correct value on passing multiple value', () => {
      expect(utils.humanizeArray(['a', 'b', 'c', 'd'])).to.equal('a, b, c and d');
    });
  });

  describe('blobToText', () => {
    it('should return correct value on passing Blob', (done) => {
      const blob = new Blob(['abcdef']);
      utils.blobToText(blob, (err, text) => {
        expect(text).to.equal('abcdef');
        done();
      });
    });

    it('should throw an error on passing incorrect type', (done) => {
      utils.blobToText({}, (err) => {
        expect(err.message).to.have.string(`${{}} is not an instance of Blob`);
        expect(err.name).to.equal('TypeError');
        done();
      });
    });
  });

  describe('blobToDataURL', () => {
    it('should return correct value on passing Blob', (done) => {
      const blob = new Blob(['abcdef'], { type: 'text/plain' });
      utils.blobToDataURL(blob, (err, dataURL) => {
        expect(dataURL).to.equal('data:text/plain;base64,YWJjZGVm');
        done();
      });
    });

    it('should throw an error on passing incorrect type', (done) => {
      utils.blobToDataURL({}, (err) => {
        expect(err.message).to.have.string(`${{}} is not an instance of Blob`);
        expect(err.name).to.equal('TypeError');
        done();
      });
    });
  });

  describe('getKeyByValue', () => {
    const map = {
      a: 'h',
      b: 'f',
      c: 'p',
      d: 'p',
      e: 'l',
    };

    it('should return correct key for value', () => {
      expect(utils.getKeyByValue(map, 'f')).to.equal('b');
      expect(utils.getKeyByValue(map, 'p')).to.equal('c');
    });

    it('should return undefined key for incorrect value', () => {
      expect(utils.getKeyByValue(map, 'x')).to.equal(undefined);
    });
  });
});
