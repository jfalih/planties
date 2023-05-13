import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import BottomNavigation from './BottomNavigation';
import Category from '../presentation/pages/Shop/Category';
import AddGarden from '../presentation/pages/Garden/Add';
import Detail from '../presentation/pages/Shop/Detail';
import {default as ScanDetail} from '../presentation/pages/Scan/Detail';
import {default as DetailGarden} from '../presentation/pages/Garden/Detail';

import AddPlant from '../presentation/pages/Plant/Add';
import Oxygen from '../presentation/pages/Oxygen';

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
    name: 'AddPlant',
    component: AddPlant,
  },
  {
    key: 'routes-4',
    name: 'ScanDetail',
    component: ScanDetail,
  },
  {
    key: 'routes-5',
    name: 'Category',
    component: Category,
  },
  {
    key: 'routes-6',
    name: 'ProductDetail',
    component: Detail,
  },
  {
    key: 'routes-7',
    name: 'DetailGarden',
    component: DetailGarden,
  },
  {
    key: 'routes-8',
    name: 'Oxygen',
    component: Oxygen,
  }
];
