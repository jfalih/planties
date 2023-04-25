import React from 'react';
import {ThemeProvider} from './Theme/Theme.provider';
import RootNavigation from '../../navigation';

const Provider = () => {
  return (
    <ThemeProvider>
      <RootNavigation />
    </ThemeProvider>
  );
};

export default Provider;
