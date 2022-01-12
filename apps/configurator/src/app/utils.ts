export function rand(min = 0, max = 1) {
  return min + Math.random() * (max - min);
}

export function parseQuery(str: string) {
  const res: { [key: string]: any } = {};
  str.substring(1).split('&').map((item) => item.split('=')).forEach((item) => {
    // eslint-disable-next-line prefer-destructuring
    res[item[0]] = item[1];
  });
  return res;
}

export function stringifyQuery(obj: { [key: string]: string }) {
  const params = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    if (key) {
      params.push(`${key}=${obj[key]}`);
    }
  }
  return `?${params.join('&')}`;
}

export function uid4() {
  // @ts-ignore
  return crypto.randomUUID();
}
