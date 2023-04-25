import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const AuthStack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator initialRouteName="Onboarding">
      <AuthStack.Screen name="Onboarding" component={() => {}} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
