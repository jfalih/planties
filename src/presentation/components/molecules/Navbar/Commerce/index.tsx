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

export interface CommerceProps extends VStackProps {
  title?: string;
  category?: string;
  onSearch?: (item: string) => void;
  onSelectCategory?: (category: string) => void;
}

const Commerce: React.FC<CommerceProps> = props => {
  const {title, category, onSearch, onSelectCategory, ...rest} = props;
  const navigation = useNavigation();
  const {spacing, pallate} = useTheme();
  const data = ['Buah', 'Hias', 'Alat', 'Benih'];

  const ItemSeparatorComponent = useCallback(
    () => <Divider horizontal thickness={spacing.small} />,
    [spacing.small],
  );

  const dataTitle = data.find(val => val === category);

  return (
    <VStack
      spacing={spacing.standard}
      justify="space-between"
      padding={{
        paddingHorizontal: spacing.large,
        paddingVertical: spacing.standard,
      }}
      {...rest}>
      <HStack items="center" spacing={spacing.small}>
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
        <SearchBar
          containerProps={{
            fill: true,
          }}
          placeholder={`Kamu mau cari ${
            dataTitle?.toLocaleLowerCase() || title?.toLocaleLowerCase()
          }?`}
          onChangeText={text => onSearch(text)}
          padding={{
            paddingHorizontal: spacing.medium,
          }}
        />
      </HStack>
      <HStack spacing={spacing.standard}>
        <Flex fill>
          <FlashList
            data={data}
            extraData={category}
            horizontal
            contentContainerStyle={{
              paddingRight: spacing.extraLarge,
            }}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={ItemSeparatorComponent}
            estimatedItemSize={111}
            renderItem={({item}) => (
              <Button
                onPress={() => onSelectCategory?.(item)}
                text={{
                  type: 'body',
                  weight: '02',
                  color:
                    item === category
                      ? pallate.neutral['01']
                      : pallate.neutral['05'],
                  text: item,
                }}
                borderRadius={spacing.tiny}
                backgroundColor={
                  item === category
                    ? pallate.primary['03']
                    : pallate.neutral['01']
                }
              />
            )}
          />
        </Flex>
      </HStack>
    </VStack>
  );
};

export default Commerce;
