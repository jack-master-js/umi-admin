export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}

export const getMs = (num, pattern) => {
    switch (pattern) {
        case "day":
          return num * 24 * 60 * 60 * 1000;
        case "hour":
          return num * 60 * 60 * 1000;
        case "minute":
          return num * 60 * 1000;
        case "second":
          return num * 1000;
        default:
          return null;
      }
}