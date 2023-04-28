import {Home} from '../presentation/pages';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

export type RoutesItemType = {
  key: string;
  name: string;
  options?: NativeStackNavigationOptions;
  component(): JSX.Element;
};

export const routes = [
  {
    key: 'routes-2',
    name: 'Home',
    component: Home,
  },
];
