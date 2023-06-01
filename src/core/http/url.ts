import qs from 'query-string';

const url = (
  host: string | undefined,
  path: string,
  query?: Record<string, any>,
): string => qs.stringifyUrl({url: new URL(path, host).toString(), query});

export const baseUrl = 'https://planties.com';
export const weatherUrl = 'https://api.openweathermap.org/data/2.5';

export default url;
