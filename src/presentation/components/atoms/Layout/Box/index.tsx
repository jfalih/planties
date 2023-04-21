import React, {Ref, useMemo} from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';
import {
  MarginType,
  PaddingType,
  PositionType,
  craeateMarginStyle,
  createPaddingStyle,
  createPositionStyle,
} from '../helper';

export interface BoxProps extends ViewProps {
  as?: React.ReactElement;
  height?: number;
  width?: number;
  bgColor?: ViewStyle['backgroundColor'];
  padding?: PaddingType | number;
  margin?: MarginType | number;
  position?: PositionType | string;
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
    bgColor,
    margin,
    ...rest
  } = props;

  const boxStyle = useMemo(() => {
    let paddingStyle, marginStyle, positionStyle;

    if (padding) {
      paddingStyle = createPaddingStyle(padding);
    }

    if (margin) {
      marginStyle = craeateMarginStyle(margin);
    }

    if (position) {
      positionStyle = createPositionStyle(position);
    }

    return {
      ...positionStyle,
      ...paddingStyle,
      ...marginStyle,
      width,
      height,
      backgroundColor: bgColor,
    };
  }, [position, padding, margin, bgColor, width, height]);

  if (as) {
    return React.cloneElement(as, {
      ref,
      style: [boxStyle, style],
      ...rest,
    });
  }
  return <View ref={ref} style={[boxStyle, style]} />;
});

export default Box;
