import React from 'react';
import {ThemeProvider} from './Theme/Theme.provider';
import RootNavigation from '../../navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Provider = () => {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <RootNavigation />
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default Provider;
