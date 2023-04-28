import React, {Ref} from 'react';
import {useMemo} from 'react';
import Box, {BoxProps} from '../Box';
import {FlexStyle, View} from 'react-native/types';
import Reanimated from 'react-native-reanimated';
export interface FlexProps extends BoxProps {
  fill?: boolean;
  wrap?: boolean;
  inline?: boolean;
  content?: FlexStyle['alignContent'];
  self?: FlexStyle['alignSelf'];
  items?: FlexStyle['alignItems'];
  justify?: FlexStyle['justifyContent'];
  direction?: FlexStyle['flexDirection'];
}

const Flex = React.memo(
  React.forwardRef((props: FlexProps, ref: Ref<View>) => {
    const {
      fill,
      wrap,
      inline,
      direction = 'row',
      justify,
      self,
      items,
      content,
      style,
      ...rest
    } = props;

    const flex: FlexStyle['flex'] = useMemo(
      () => (fill ? 1 : undefined),
      [fill],
    );

    const flexWrap: FlexStyle['flexWrap'] = useMemo(
      () => (wrap ? 'wrap' : undefined),
      [wrap],
    );

    const flexDirection = useMemo(
      () => (inline ? 'row' : direction || 'column'),
      [direction, inline],
    );

    const flexStyle = useMemo(() => {
      return {
        flex,
        flexWrap,
        flexDirection,
        alignContent: content,
        justifyContent: justify,
        alignSelf: self,
        alignItems: items,
      };
    }, [flex, content, flexWrap, flexDirection, justify, self, items]);

    return <Box ref={ref} style={[flexStyle, style]} {...rest} />;
  }),
);

export const FlexAnimated = Reanimated.createAnimatedComponent(Flex);
export default Flex;
