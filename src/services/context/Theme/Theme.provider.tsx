import React, {useMemo} from 'react';
import {useColorScheme} from 'react-native';
import {Theme, ThemeContext} from './Theme.context';
import {darkTheme, defaultTheme} from './defaultTheme';

export interface ThemeProviderProps {
  theme?: Theme;
  children?: React.ReactNode;
}

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
