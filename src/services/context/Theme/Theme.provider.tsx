import React, {useMemo} from 'react';
import {useColorScheme} from 'react-native';
import {ThemeContext, ThemeProviderProps} from './Theme.context';
import {darkTheme, defaultTheme} from './defaultTheme';

export const ThemeProvider: React.FC<ThemeProviderProps> = props => {
  const {theme, children} = props;
  const colorScheme = useColorScheme();

  const value = useMemo(
    () => (theme ? theme : colorScheme === 'dark' ? darkTheme : defaultTheme),
    [colorScheme, theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
