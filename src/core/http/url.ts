import qs from 'query-string';
import Config from 'react-native-config';

const url = (
  host: string | undefined,
  path: string,
  query?: Record<string, any>,
): string => qs.stringifyUrl({url: new URL(path, host).toString(), query});

export const weatherUrl = 'https://api.openweathermap.org/data/2.5';

export const plantiesUrl = (path: string, query?: Record<string, any>) =>
  url(Config.BASE_URL, path, query);
export default url;
