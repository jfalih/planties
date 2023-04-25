import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {RoutesItemType, routes} from './routes';
import RNBootSplash from 'react-native-bootsplash';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      <Stack.Navigator>
        {routes.map((res: RoutesItemType, _) => (
          <Stack.Screen
            key={res.key}
            name={res.name}
            options={res.options}
            component={res.component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
