function isUndefined(obj) {
  // eslint-disable-next-line no-void
  return obj === void 0;
}

function parseBool(val) {
  if (typeof val === 'string') {
    const stringVal = val.toLowerCase();
    if (stringVal === 'true') return true;
    if (stringVal === 'false') return false;
    throw Error("Couldn't convert to boolean");
  } else if (typeof val === 'number') {
    const numberVal = val;
    if (numberVal === 1) return true;
    if (numberVal === 0) return false;
    throw Error("Couldn't convert to boolean");
  } else if (typeof val === 'boolean') {
    return val;
  }
  throw Error("Couldn't convert to boolean");
}

function humanizeArray(arr) {
  if (!Array.isArray(arr)) return '';

  if (arr.length === 1) {
    return arr[0];
  }

  let str = arr.slice(0, -1).join(', ');
  str += ` and ${arr.slice(-1)}`;
  return str;
}

function blobToText(blob, cb = () => {}) {
  if (!(blob instanceof Blob)) {
    cb(new TypeError(`${blob} is not an instance of Blob`));
    return;
  }

  const reader = new FileReader();

  reader.addEventListener('loadend', ({ target }) => {
    const text = target.result;
    cb(null, text);
  });

  reader.readAsText(blob);
}

function blobToDataURL(blob, cb = () => {}) {
  if (!(blob instanceof Blob)) {
    cb(new TypeError(`${blob} is not an instance of Blob`));
    return;
  }

  const reader = new FileReader();

  reader.addEventListener('loadend', ({ target }) => {
    const dataURL = target.result;
    cb(null, dataURL);
  });

  reader.readAsDataURL(blob);
}

export default {
  isUndefined,
  parseBool,
  humanizeArray,
  blobToText,
  blobToDataURL,
};
