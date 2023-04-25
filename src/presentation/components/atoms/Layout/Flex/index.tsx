import React from 'react';
import {useMemo} from 'react';
import Box, {BoxProps} from '../Box';
import {FlexStyle} from 'react-native/types';

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

const Flex = (props: FlexProps) => {
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

  const flex: FlexStyle['flex'] = useMemo(() => (fill ? 1 : undefined), [fill]);

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

  return <Box style={[flexStyle, style]} {...rest} />;
};

export default Flex;
