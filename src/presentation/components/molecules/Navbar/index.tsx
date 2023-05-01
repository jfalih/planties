import React, {useRef} from 'react';
import {AvatarAnimated, AvatarProps} from '../../atoms/Avatar';
import {HStackAnimated, VStack, VStackAnimated} from '../../atoms/Layout/Stack';
import {FadeInDown, FadeInRight} from 'react-native-reanimated';
import Text from '../../atoms/Text';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import SearchBar from '../../atoms/SearchBar';
import Icon from '../../atoms/Icon';

export interface NavbarProps {
  avatarSource: AvatarProps['source'];
  title: string;
}

const Navbar = (props: NavbarProps) => {
  const {title, avatarSource} = props;
  const {spacing, pallate} = useTheme();
  const ref = useRef();

  return (
    <VStack
      padding={{
        paddingHorizontal: spacing.large,
        paddingVertical: spacing.standard,
      }}
      spacing={spacing.standard}>
      <HStackAnimated items="center" spacing={spacing.standard}>
        <AvatarAnimated
          source={avatarSource}
          rounded
          entering={FadeInRight.duration(1500)}
        />
        <VStackAnimated fill entering={FadeInDown.duration(1500).delay(200)}>
          <Text type="subtitles" weight="appBar" text="Welcome Back" />
          <Text type="title" weight="05" text={title} />
        </VStackAnimated>
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
