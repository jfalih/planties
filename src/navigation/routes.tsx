import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import BottomNavigation from './BottomNavigation';
import Category from '../presentation/pages/Shop/Category';
import AddGarden from '../presentation/pages/Garden/Add';
import Detail from '../presentation/pages/Shop/Detail';
import {default as ScanDetail} from '../presentation/pages/Scan/Detail';

export type RoutesItemType = {
  key: string;
  name: string;
  options?: NativeStackNavigationOptions;
  component(): JSX.Element;
};

export type RootStackParamList = {
  Login: undefined;
  EmailVerification: undefined;
  Register: undefined;
  Home: undefined;
  BottomNavigation: undefined;
};

export const routes = [
  {
    key: 'routes-1',
    name: 'BottomNavigation',
    component: BottomNavigation,
  },
  {
    key: 'routes-2',
    name: 'AddGarden',
    component: AddGarden,
  },
  {
    key: 'routes-3',
    name: 'ScanDetail',
    component: ScanDetail,
  },
  {
    key: 'routes-3',
    name: 'Category',
    component: Category,
  },
  {
    key: 'routes-3',
    name: 'ProductDetail',
    component: Detail,
  },
];
