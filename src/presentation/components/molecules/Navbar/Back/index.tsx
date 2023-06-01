import React from 'react';
import Icon from '../../../atoms/Icon';
import {HStackAnimated, VStackProps} from '../../../atoms/Layout/Stack';
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
  color?: string;
}

const Back: React.FC<BackProps> = props => {
  const {title, trailing, color, style, ...rest} = props;
  const navigation = useNavigation();
  const {spacing, pallate} = useTheme();
  const {contentOffset} = useScroll();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        contentOffset?.y.value > 120 ? 1 : 0,
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
      spacing={spacing.small}
      justify="space-between"
      {...rest}>
      <Pressable
        self="center"
        onPress={() => navigation.goBack()}
        width={50}
        height={32}>
        <Icon
          size={32}
          color={color || pallate.neutral['05']}
          name="IconArrowNarrowLeft"
        />
      </Pressable>
      <Text color={color} type="title" weight="05">
        {title}
      </Text>
      {trailing || <Flex width={50} />}
    </HStackAnimated>
  );
};

export default Back;
