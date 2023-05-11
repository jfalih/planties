import React from 'react';
import {ThemeProvider} from './Theme/Theme.provider';
import RootNavigation from '../../navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider} from './Auth/Auth.provider';
import Toast from 'react-native-toast-message';

const queryClient = new QueryClient();

const Provider = () => {
  console.log('Provider');
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
