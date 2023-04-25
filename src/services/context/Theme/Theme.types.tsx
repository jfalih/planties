import {ImageStyle, TextStyle, ViewStyle} from 'react-native/types';

export type ColorScheme = 'light' | 'dark';
export type Elevation =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24;
export type Elevations = Record<Elevation, ViewStyle | TextStyle | ImageStyle>;

export type PaletteColorName =
  | 'primary'
  | 'neutral'
  | 'warning'
  | 'danger'
  | 'info';
export type PaletteNumber = '01' | '02' | '03' | '04' | '05';
export type PaletteColor = Record<PaletteNumber, string>;
export type Palette = Record<PaletteColorName, PaletteColor>;

export type TypographyType =
  | 'title'
  | 'subtitles'
  | 'button'
  | 'body'
  | 'caption'
  | 'selection';

export type TypographyWeight =
  | 'appBar'
  | 'navbar'
  | 'active'
  | 'inavtive'
  | '01'
  | '02'
  | '03'
  | '04'
  | '05';

export type Typography = Record<
  TypographyType,
  Record<
    TypographyWeight,
    {
      fontFamily: string;
      fontSize: number;
    }
  >
>;
