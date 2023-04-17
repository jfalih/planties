import React, {useMemo} from 'react';
import {View, ViewProps} from 'react-native';
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
  padding?: PaddingType | number;
  margin?: MarginType | number;
  position?: PositionType | string;
}

/**
 * Box is component serves as a wrapper component for most of the styling properties.
 * Also, for references check it out {@link https://github.com/yamankatby/react-native-flex-layout/blob/main/src/Box.tsx}
 */
const Box = (props: BoxProps) => {
  const {as, style, position, width, height, padding, margin, ...rest} = props;

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
    };
  }, [position, padding, margin, width, height]);

  if (as) {
    return React.cloneElement(as, {
      style: [boxStyle, style],
      ...rest,
    });
  }
  return <View style={[boxStyle, style]} />;
};

export default Box;
