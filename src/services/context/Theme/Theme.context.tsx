import React, {createContext, useContext} from 'react';
import {ColorScheme, Elevations, Palette, Typography} from './Theme.types';
import {defaultTheme} from './defaultTheme';

export interface Theme {
  colorScheme: ColorScheme;
  elevations: Elevations;
  pallate: Palette;
  typography: Typography;
}

export interface ThemeProviderProps {
  theme?: Theme;
  children?: React.ReactNode;
}

export const ThemeContext = createContext<Theme>(defaultTheme);

export const useTheme = () => useContext(ThemeContext);
