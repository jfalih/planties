import React, {useCallback, useRef} from 'react';
import {AvatarAnimated, AvatarProps} from '../../../atoms/Avatar';
import {
  HStack,
  HStackAnimated,
  VStack,
  VStackAnimated,
} from '../../../atoms/Layout/Stack';
import {
  FadeInDown,
  FadeInRight,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Text from '../../../atoms/Text';
import {useTheme} from '../../../../../services/context/Theme/Theme.context';
import SearchBar from '../../../atoms/SearchBar';
import {useWindowDimensions} from 'react-native';
import Flex, {FlexProps} from '../../../atoms/Layout/Flex';
import {useScroll} from '../../../../../services/context/Scroll/Scroll.context';
import Pressable from '../../../atoms/Pressable';
import Icon from '../../../atoms/Icon';
import auth from '@react-native-firebase/auth';
import {StackActions, useNavigation} from '@react-navigation/native';
import {useAuth} from '../../../../../services/context/Auth/Auth.context';
import {LogoBlack} from '../../../../../assets';

export interface DefaultProps extends FlexProps {
  avatarSource: AvatarProps['source'];
  title: string;
}

const Default = (props: DefaultProps) => {
  const {title, avatarSource, ...rest} = props;
  const {spacing, pallate} = useTheme();
  const ref = useRef();
  const {width} = useWindowDimensions();
  const {contentOffset} = useScroll();
  const {user, handleUser} = useAuth();
  const navigation = useNavigation();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        contentOffset?.y.value > 200 ? 1 : 0,
        [0, 1],
        ['transparent', '#fff'],
      ),
    };
  }, [contentOffset]);

  const animatedSearchStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        contentOffset?.y.value > 200 ? 1 : 0,
        [0, 1],
        [pallate.neutral['01'], pallate.neutral['02']],
      ),
    };
  }, [contentOffset]);

  const handleLogout = useCallback(() => {
    if (user) {
      auth()
        .signOut()
        .then(() => {
          handleUser(null);
          navigation.navigate('Auth', {screen: 'Login'});
        });
    } else {
      navigation.navigate('Auth', {screen: 'Login'});
    }
  }, [handleUser, navigation, user]);

  return (
    <VStackAnimated
      style={animatedStyle}
      padding={{
        paddingHorizontal: spacing.large,
        paddingVertical: spacing.medium,
      }}
      width={width}
      spacing={spacing.medium}
      {...rest}>
      <HStackAnimated items="center" spacing={spacing.standard}>
        {user ? (
          <HStack spacing={spacing.standard} fill>
            <AvatarAnimated
              source={avatarSource}
              rounded
              entering={FadeInRight.duration(1500)}
            />
            <VStackAnimated
              fill
              entering={FadeInDown.duration(1500).delay(200)}>
              <Text type="subtitles" weight="appBar" text="Welcome Back" />
              <Text type="title" weight="05" text={title} />
            </VStackAnimated>
          </HStack>
        ) : (
          <Flex fill>
            <LogoBlack />
          </Flex>
        )}
        <Pressable onPress={handleLogout} self="center">
          <HStack spacing={spacing.tiny} items="center">
            <Icon size={24} color={pallate.neutral['05']} name="IconLogin" />
            <Text type="title" weight="06">
              {user ? 'Sign-Out' : 'Sign-In'}
            </Text>
          </HStack>
        </Pressable>
      </HStackAnimated>
      <SearchBar
        ref={ref}
        style={animatedSearchStyle}
        placeholder="Kamu mau cari Tanaman?"
        icon={{
          name: 'IconSearch',
          size: 24,
          color: pallate.neutral['04'],
        }}
      />
    </VStackAnimated>
  );
};

export default React.memo(Default);
