import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../../presentation/pages/Auth/Login';
import Register from '../../presentation/pages/Auth/Register';
import EmailVerification from '../../presentation/pages/Auth/EmailVerification';
import Forgot from '../../presentation/pages/Auth/Forgot';

const AuthStack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        orientation: 'portrait',
        gestureDirection: 'horizontal',
      }}
      initialRouteName="Login">
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="Forgot" component={Forgot} />
      <AuthStack.Screen
        name="EmailVerification"
        component={EmailVerification}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
