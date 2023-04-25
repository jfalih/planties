import {ViewStyle} from 'react-native/types';

import React from 'react';

/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 *
 * @param children the children
 */
export function getValidChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter(child =>
    React.isValidElement(child),
  ) as React.ReactElement[];
}
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

export interface BorderWidthType {
  borderTopWidth?: number;
  borderBottomWidth?: number;
  borderLeftWidth?: number;
  borderRightWidth?: number;
}

export interface BorderColorType {
  borderTopColor?: string;
  borderBottomColor?: string;
  borderLeftColor?: string;
  borderRightColor?: string;
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

export const createBorderColorStyle = (
  borderColor: BorderColorType | string,
) => {
  if (typeof borderColor === 'string') {
    return {borderColor};
  }
  const {borderTopColor, borderBottomColor, borderLeftColor, borderRightColor} =
    borderColor;

  return {
    borderTopColor,
    borderBottomColor,
    borderLeftColor,
    borderRightColor,
  };
};

export const createBorderWidthStyle = (
  borderWidth: BorderWidthType | number,
) => {
  if (typeof borderWidth === 'number') {
    return {borderWidth};
  }
  const {borderTopWidth, borderBottomWidth, borderLeftWidth, borderRightWidth} =
    borderWidth;

  return {
    borderTopWidth,
    borderBottomWidth,
    borderLeftWidth,
    borderRightWidth,
  };
};
