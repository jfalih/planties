import React, {useMemo} from 'react';
import Box, {BoxProps} from '../Box';

export interface DividerProps extends BoxProps {
  /**
   * The orientation of the divider.
   *
   * @default 'horizontal'
   */
  horizontal?: boolean;

  /**
   * The thickness of the divider.
   *
   * @default 1
   */
  thickness?: number;

  /**
   * The color of the divider.
   *
   * @default '#E0E0E0'
   */
  color?: string;
}

const Divider: React.FC<DividerProps> = ({
  horizontal,
  thickness = 1,
  color,
  style,
  ...rest
}) => {
  const dividerStyle = useMemo(() => {
    if (horizontal) {
      return {width: thickness, backgroundColor: color};
    } else {
      return {height: thickness, backgroundColor: color};
    }
  }, [horizontal, thickness, color]);

  return <Box style={[dividerStyle, style]} {...rest} />;
};

export default Divider;
