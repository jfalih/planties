import {createContext, useContext} from 'react';
import {
  ColorScheme,
  Elevations,
  Palette,
  Spacing,
  Typography,
} from './Theme.types';
import {defaultTheme} from './defaultTheme';

export interface Theme {
  colorScheme: ColorScheme;
  elevations: Elevations;
  pallate: Palette;
  typography: Typography;
  spacing: Spacing;
}

export const ThemeContext = createContext<Theme>(defaultTheme);

export const useTheme = () => useContext(ThemeContext);
