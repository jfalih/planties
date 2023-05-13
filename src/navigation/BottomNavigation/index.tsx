/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from '../../presentation/pages';
import BottomTabBar from '../../presentation/components/molecules/BottomTabBar';
import {useTheme} from '../../services/context/Theme/Theme.context';
import Icon from '../../presentation/components/atoms/Icon';
import Shop from '../../presentation/pages/Shop';
import Scan from '../../presentation/pages/Scan';
import Care from '../../presentation/pages/Care';
import Community from '../../presentation/pages/Community';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      tabBar={props => <BottomTabBar {...props} theme={theme} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="IconSmartHome" color={color} size={size} />
          ),
          unmountOnBlur: true,
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="IconShoppingBag" color={color} size={size} />
          ),
          unmountOnBlur: true,
        }}
        name="Shop"
        component={Shop}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'QR',
          tabBarIcon: ({color, size}) => (
            <Icon name="IconScan" color={color} size={size} />
          ),
        }}
        name="Scan"
        component={Scan}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="IconBucketDroplet" color={color} size={size} />
          ),
          unmountOnBlur: true,
        }}
        name="Plant Care"
        component={Care}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="IconSocial" color={color} size={size} />
          ),
          unmountOnBlur: true,
        }}
        name="Community"
        component={Community}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
