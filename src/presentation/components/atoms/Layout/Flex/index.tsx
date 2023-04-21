import React from 'react';
import {useMemo} from 'react';
import Box, {BoxProps} from '../Box';
import {FlexStyle} from 'react-native/types';

interface FlexProps extends BoxProps {
  fill?: boolean;
  wrap?: boolean;
  flexDirection?: FlexStyle['flexDirection'];
  content?: FlexStyle['alignContent'];
  self?: FlexStyle['alignSelf'];
  items?: FlexStyle['alignItems'];
  justify?: FlexStyle['justifyContent'];
  direction?: FlexStyle['direction'];
}

const Flex = (props: FlexProps) => {
  const {
    fill,
    wrap,
    flexDirection = 'row',
    direction,
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

  const flexStyle = useMemo(() => {
    return {
      flex,
      flexWrap,
      flexDirection,
      alignContent: content,
      justifyContent: justify,
      alignSelf: self,
      alignItems: items,
      direction,
    };
  }, [flex, content, flexWrap, flexDirection, justify, self, items, direction]);

  return <Box style={[flexStyle, style]} {...rest} />;
};

export default Flex;
