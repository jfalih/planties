import React, {useRef} from 'react';
import {AvatarAnimated} from '../../atoms/Avatar';
import {HStackAnimated, VStack, VStackAnimated} from '../../atoms/Layout/Stack';
import {FadeInDown, FadeInRight} from 'react-native-reanimated';
import Text from '../../atoms/Text';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import Divider from '../../atoms/Layout/Divider';
import SearchBar from '../../atoms/SearchBar';
import Icon from '../../atoms/Icon';

const Navbar = () => {
  const {spacing, pallate} = useTheme();
  const ref = useRef();
  const {top} = useSafeAreaInsets();

  return (
    <VStack
      padding={{
        paddingTop: top + spacing.standard,
        paddingBottom: spacing.standard,
        paddingHorizontal: spacing.large,
      }}
      spacing={spacing.standard}>
      <HStackAnimated
        items="center"
        divider={<Divider horizontal thickness={spacing.standard} />}>
        <AvatarAnimated
          source={{
            uri: 'https://unsplash.it/400/400?image=1',
            priority: FastImage.priority.normal,
          }}
          rounded
          entering={FadeInRight.duration(1500)}
        />
        <VStackAnimated fill entering={FadeInDown.duration(1500).delay(200)}>
          <Text type="subtitles" weight="appBar" text="Welcome Back" />
          <Text type="title" weight="05" text="Jan Falih 👋" />
        </VStackAnimated>
        <Icon name="IconBell" color={pallate.neutral['05']} size={24} />
        <Icon name="IconMessage" color={pallate.neutral['05']} size={24} />
      </HStackAnimated>
      <SearchBar
        ref={ref}
        placeholder="Kamu mau cari Tanaman?"
        icon={{
          name: 'IconSearch',
          size: 24,
          color: pallate.neutral['03'],
        }}
      />
    </VStack>
  );
};

export default Navbar;
