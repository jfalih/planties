import React, {useCallback} from 'react';
import Icon from '../../../atoms/Icon';
import {
  HStack,
  HStackAnimated,
  VStack,
  VStackProps,
} from '../../../atoms/Layout/Stack';
import Pressable from '../../../atoms/Pressable';
import {useTheme} from '../../../../../services/context/Theme/Theme.context';
import {useNavigation} from '@react-navigation/native';
import {Flex} from '../../../atoms/Layout';
import Text from '../../../atoms/Text';
import {interpolateColor, useAnimatedStyle} from 'react-native-reanimated';
import {useScroll} from '../../../../../services/context/Scroll/Scroll.context';

export interface BackProps extends VStackProps {
  title?: string;
  trailing?: React.ReactNode;
}

const Sidebar: React.FC<BackProps> = props => {
  const {title, trailing, style, ...rest} = props;
  const navigation = useNavigation();
  const {spacing, pallate} = useTheme();
  const {contentOffset} = useScroll();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        contentOffset?.y.value > 200 ? 1 : 0,
        [0, 1],
        ['transparent', pallate.neutral['01']],
      ),
    };
  }, [contentOffset]);

  return (
    <HStackAnimated
      items="center"
      style={[animatedStyle, style]}
      padding={{
        paddingHorizontal: spacing.large,
        paddingVertical: spacing.standard,
      }}
      spacing={spacing.large}
      {...rest}>
      <Pressable self="center" onPress={() => navigation.goBack()} height={24}>
        <Icon size={24} color={pallate.neutral['05']} name="IconMenu" />
      </Pressable>
      <Text fill type="title" weight="02">
        {title}
      </Text>
      <Pressable self="center" onPress={() => navigation.goBack()} height={24}>
        <Icon size={24} color={pallate.neutral['05']} name="IconBell" />
      </Pressable>
      <Pressable self="center" onPress={() => navigation.goBack()} height={24}>
        <Icon size={24} color={pallate.neutral['05']} name="IconSearch" />
      </Pressable>
    </HStackAnimated>
  );
};

export default Sidebar;
