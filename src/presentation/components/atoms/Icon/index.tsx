import React, {useMemo} from 'react';
import * as Icons from 'tabler-icons-react-native';
import {TablerIconsProps} from 'tabler-icons-react-native';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import Animated from 'react-native-reanimated';
//TODO: Add Icons Components

export interface IconProps extends TablerIconsProps {
  name: keyof typeof Icons;
  size: number;
  color: string;
}

const Icon = React.memo((props: IconProps) => {
  const {name = 'IconQuestionMark', size, color} = props;
  const IconComponents = Icons[name];
  const {pallate} = useTheme();

  // Set Default Icon Color;
  const iconColor = useMemo(() => {
    if (color) {
      return color;
    }
    return pallate.neutral['05'];
  }, [color, pallate.neutral]);

  return <IconComponents size={size} color={iconColor} stroke={2} />;
});

export const IconAnimated = Animated.createAnimatedComponent(Icon);
export default Icon;
