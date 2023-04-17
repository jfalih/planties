import {ViewStyle} from 'react-native/types';

export interface PaddingType {
  paddingTop?: number;
  paddingBottom?: number;
  paddingRight?: number;
  paddingLeft?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
}

export interface PositionType {
  bottom?: number;
  top?: number;
  right?: number;
  left?: number;
  set?: ViewStyle['position'];
}

export interface MarginType {
  marginTop?: number;
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
  marginHorizontal?: number;
  marginVertical?: number;
}

export const createPaddingStyle = (padding: PaddingType | number) => {
  if (typeof padding === 'number') {
    return {padding};
  }

  const {
    paddingTop,
    paddingBottom,
    paddingRight,
    paddingLeft,
    paddingHorizontal,
    paddingVertical,
  } = padding;

  return {
    paddingTop,
    paddingBottom,
    paddingRight,
    paddingLeft,
    paddingHorizontal,
    paddingVertical,
  };
};

export const craeateMarginStyle = (margin: MarginType | number) => {
  if (typeof margin === 'number') {
    return {margin};
  }

  const {
    marginTop,
    marginBottom,
    marginRight,
    marginLeft,
    marginHorizontal,
    marginVertical,
  } = margin;

  return {
    marginTop,
    marginBottom,
    marginRight,
    marginLeft,
    marginHorizontal,
    marginVertical,
  };
};

export const createPositionStyle = (position: PositionType | string) => {
  if (typeof position === 'string') {
    return {position};
  }

  const {top, bottom, set, right, left} = position;
  return {
    position: set,
    top,
    bottom,
    right,
    left,
  };
};
