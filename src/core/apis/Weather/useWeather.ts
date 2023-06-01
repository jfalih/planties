import {useQuery} from '@tanstack/react-query';
import request from '../../http/request';
import url, {weatherUrl} from '../../http/url';

interface WeatherParamsType {
  lat?: string;
  lon?: string;
  exclude?: string;
  mode?: string;
  units?: string;
  lang?: string;
}

const weatherKey = {
  weather: (params: WeatherParamsType) =>
    url(weatherUrl, 'weather', {
      ...params,
      appid: '204f979833f2cfbd2de1611d468612eb',
    }),
};

const useWeather = (params: WeatherParamsType) => {
  const result = useQuery(
    [weatherKey.weather(params)],
    () => request(weatherKey.weather(params)),
    {
      enabled: !!params?.lat && !!params?.lon,
    },
  );
  return result;
};

export default useWeather;
