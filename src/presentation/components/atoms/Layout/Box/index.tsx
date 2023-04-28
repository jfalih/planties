import React, {Ref, useMemo} from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';
import {
  BorderColorType,
  BorderRadiusType,
  BorderWidthType,
  MarginType,
  PaddingType,
  PositionType,
  craeateMarginStyle,
  createBorderColorStyle,
  createBorderRadiusStyle,
  createBorderWidthStyle,
  createPaddingStyle,
  createPositionStyle,
} from '../helper';
import Reanimated from 'react-native-reanimated';
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
  borderRadius?: BorderRadiusType | number;
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
    borderRadius,
    backgroundColor,
    ...rest
  } = props;

  const boxStyle = useMemo(() => {
    let paddingStyle,
      marginStyle,
      positionStyle,
      borderWidthStyle,
      borderColorStyle,
      borderRadiusStyle;

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

    if (borderRadius) {
      borderRadiusStyle = createBorderRadiusStyle(borderRadius);
    }

    return {
      ...positionStyle,
      ...paddingStyle,
      ...marginStyle,
      ...borderWidthStyle,
      ...borderColorStyle,
      ...borderRadiusStyle,
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
    borderRadius,
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
      style: [boxStyle, style, as.props.style],
      ...rest,
    });
  }
  return <View ref={ref} style={[boxStyle, style]} {...rest} />;
});
export const BoxAnimated = Reanimated.createAnimatedComponent(Box);
export default Box;
