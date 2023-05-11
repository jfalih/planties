import React, {useCallback} from 'react';
import Icon from '../../../atoms/Icon';
import {HStack, VStack, VStackProps} from '../../../atoms/Layout/Stack';
import Pressable from '../../../atoms/Pressable';
import {useTheme} from '../../../../../services/context/Theme/Theme.context';
import {useNavigation} from '@react-navigation/native';
import Button from '../../../atoms/Button';
import Divider from '../../../atoms/Layout/Divider';
import {FlashList} from '@shopify/flash-list';
import {Flex} from '../../../atoms/Layout';
import SearchBar from '../../../atoms/SearchBar';
import Text from '../../../atoms/Text';

export interface BackProps extends VStackProps {
  title?: string;
}

const Back: React.FC<BackProps> = props => {
  const {title, ...rest} = props;
  const navigation = useNavigation();
  const {spacing, pallate} = useTheme();
  const ItemSeparatorComponent = useCallback(
    () => <Divider horizontal thickness={spacing.small} />,
    [spacing.small],
  );
  return (
    <HStack
      items="center"
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
        width={32}
        height={32}>
        <Icon
          size={32}
          color={pallate.neutral['05']}
          name="IconArrowNarrowLeft"
        />
      </Pressable>
      <Text type="title" weight="05">
        {title}
      </Text>
      <Pressable
        self="center"
        onPress={() => navigation.goBack()}
        width={32}
        height={32}>
        <Icon
          size={32}
          color={pallate.neutral['05']}
          name="IconInfoSquareRounded"
        />
      </Pressable>
    </HStack>
  );
};

export default Back;
