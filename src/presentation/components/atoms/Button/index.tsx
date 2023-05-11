import React from 'react';
import Pressable, {PressableProps} from '../Pressable';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import Icon, {IconProps} from '../Icon';
import Text, {TextProps} from '../Text';
import {HStack} from '../Layout/Stack';
import {ActivityIndicator} from 'react-native';

//TODO: Refactor Button
interface ButtonProps extends PressableProps {
  leading?: React.ReactElement;
  trailing?: React.ReactElement;
  icon?: IconProps;
  text?: TextProps;
  color?: string;
  spacing?: number;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = props => {
  const {leading, isLoading, trailing, icon, text, spacing, ...rest} = props;
  const {spacing: themeSpacing, pallate} = useTheme();
  return (
    <Pressable
      padding={{
        paddingHorizontal: themeSpacing.standard,
        paddingVertical: themeSpacing.small,
      }}
      borderRadius={30}
      {...rest}>
      {isLoading ? (
        <ActivityIndicator size={'small'} color={pallate.neutral['01']} />
      ) : (
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
          <Text {...text} />
          {trailing}
        </HStack>
      )}
    </Pressable>
  );
};

export default Button;
