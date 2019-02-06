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

export default {
  parseBool,
  humanizeArray,
};
