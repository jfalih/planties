import {Home} from '../presentation/pages';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import Scan from '../presentation/pages/Scan';

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
  {
    key: 'routes-3',
    name: 'Scan',
    component: Scan,
  },
];
