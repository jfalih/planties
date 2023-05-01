import React from 'react';
import Pressable, {PressableProps} from '../Pressable';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import Icon, {IconProps} from '../Icon';
import Text from '../Text';
import {HStack} from '../Layout/Stack';

//TODO: Add Button Components - In progress
interface ButtonProps extends PressableProps {
  leading?: React.ReactElement;
  trailing?: React.ReactElement;
  icon?: IconProps;
  text?: string;
  color?: string;
  spacing?: number;
}

const Button: React.FC<ButtonProps> = props => {
  const {leading, trailing, icon, color, text, spacing, ...rest} = props;
  const {spacing: themeSpacing, pallate} = useTheme();
  return (
    <Pressable
      padding={{
        paddingHorizontal: themeSpacing.standard,
        paddingVertical: themeSpacing.small,
      }}
      borderRadius={30}
      {...rest}>
      <HStack spacing={spacing || themeSpacing.small} items="center">
        {(leading || icon) && icon ? (
          <Icon
            name={icon.name}
            size={icon.size}
            color={icon.color}
            stroke={icon.stroke}
          />
        ) : (
          leading
        )}
        <Text
          type="button"
          color={color || pallate.neutral['05']}
          weight="tabItem"
          text={text}
        />
        {trailing}
      </HStack>
    </Pressable>
  );
};

export default Button;
