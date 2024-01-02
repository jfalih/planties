import React, {useCallback} from 'react';
import {useTheme} from '../../../../../services/context/Theme/Theme.context';
import {HStack, HStackAnimated, HStackProps} from '../../../atoms/Layout/Stack';
import Pressable from '../../../atoms/Pressable';
import Icon from '../../../atoms/Icon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Flex} from '../../../atoms/Layout';
import {LogoBlack} from '../../../../../assets';
import {useScroll} from '../../../../../services/context/Scroll/Scroll.context';
import {interpolateColor, useAnimatedStyle} from 'react-native-reanimated';
import {Linking} from 'react-native';

const WHATSAPP_NUMBER = '+6285156043265';
const Logo = (props: HStackProps) => {
  const {spacing, pallate} = useTheme();
  const {...rest} = props;
  const {top} = useSafeAreaInsets();
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

  const handleMessage = useCallback(() => {
    Linking.openURL(`whatsapp://send?phone=${WHATSAPP_NUMBER}`);
  }, []);
  return (
    <HStackAnimated
      style={animatedStyle}
      padding={{
        paddingTop: top + spacing.medium,
        paddingBottom: spacing.medium,
        paddingHorizontal: spacing.large,
      }}
      {...rest}>
      <Flex fill>
        <LogoBlack />
      </Flex>
      <HStack spacing={spacing.medium}>
        <Pressable onPress={handleMessage}>
          <Icon name="IconMessage" size={24} color={pallate.neutral['05']} />
        </Pressable>
      </HStack>
    </HStackAnimated>
  );
};

export default Logo;
