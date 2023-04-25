import React, {Ref, useMemo} from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';
import {
  BorderColorType,
  BorderWidthType,
  MarginType,
  PaddingType,
  PositionType,
  craeateMarginStyle,
  createBorderColorStyle,
  createBorderWidthStyle,
  createPaddingStyle,
  createPositionStyle,
} from '../helper';

export interface BoxProps extends ViewProps {
  as?: React.ReactElement;
  height?: number;
  width?: number;
  padding?: PaddingType | number;
  margin?: MarginType | number;
  position?: PositionType | string;
  backgroundColor?: ViewStyle['backgroundColor'];
  borderWidth?: BorderWidthType | number;
  borderColor?: BorderColorType | string;
}

/**
 * Box is component serves as a wrapper component for most of the styling properties.
 * Also, for references check it out {@link https://github.com/yamankatby/react-native-flex-layout/blob/main/src/Box.tsx}
 */
const Box = React.forwardRef((props: BoxProps, ref: Ref<View>) => {
  const {
    as,
    style,
    position,
    width,
    height,
    padding,
    margin,
    borderWidth,
    borderColor,
    backgroundColor,
    ...rest
  } = props;

  const boxStyle = useMemo(() => {
    let paddingStyle,
      marginStyle,
      positionStyle,
      borderWidthStyle,
      borderColorStyle;

    if (padding) {
      paddingStyle = createPaddingStyle(padding);
    }

    if (margin) {
      marginStyle = craeateMarginStyle(margin);
    }

    if (position) {
      positionStyle = createPositionStyle(position);
    }

    if (borderWidth) {
      borderWidthStyle = createBorderWidthStyle(borderWidth);
    }

    if (borderColor) {
      borderColorStyle = createBorderColorStyle(borderColor);
    }

    return {
      ...positionStyle,
      ...paddingStyle,
      ...marginStyle,
      ...borderWidthStyle,
      ...borderColorStyle,
      width,
      height,
      backgroundColor,
    };
  }, [
    padding,
    margin,
    position,
    borderWidth,
    borderColor,
    width,
    height,
    backgroundColor,
  ]);

  if (as) {
    if (typeof as?.props.style === 'function') {
      return React.cloneElement(as, {
        ref,
        style: (state: any) => [boxStyle, as?.props.style(state), style],
        ...rest,
      });
    }

    return React.cloneElement(as, {
      ref,
      style: [boxStyle, style],
      ...rest,
    });
  }
  return <View ref={ref} style={[boxStyle, style]} {...rest} />;
});

export default Box;
