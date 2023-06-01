import React from 'react';
import {ThemeProvider} from './Theme/Theme.provider';
import RootNavigation from '../../navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider} from './Auth/Auth.provider';
import Toast from 'react-native-toast-message';
import Geolocation from '@react-native-community/geolocation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const queryClient = new QueryClient();

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  locationProvider: 'auto',
});

const Provider = () => {
  GoogleSignin.configure({
    webClientId:
      '808902657378-c1m6s08esqdditqjafkhbfncjrlmbo41.apps.googleusercontent.com',
    iosClientId:
      '808902657378-0fo2bae0dc832gv8f36ta0tr6bgi548m.apps.googleusercontent.com',
  });

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RootNavigation />
            <Toast topOffset={50} />
          </AuthProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default Provider;
