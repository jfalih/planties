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
import {useCategories} from '../../../../../core/apis/Categories/useCategories';
import {useWindowDimensions} from 'react-native';

export interface CommerceProps extends VStackProps {
  title?: string;
  categoryId?: string;
  onSelectCategory?: (category: string) => void;
}

const Commerce: React.FC<CommerceProps> = props => {
  const {title, categoryId, onSelectCategory, ...rest} = props;
  const navigation = useNavigation();
  const {spacing, pallate} = useTheme();
  const {data} = useCategories();

  const ItemSeparatorComponent = useCallback(
    () => <Divider horizontal thickness={spacing.small} />,
    [spacing.small],
  );

  const dataTitle = data.find(val => val.key === categoryId);

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
            dataTitle?.name.toLocaleLowerCase() || title?.toLocaleLowerCase()
          }?`}
          padding={{
            paddingHorizontal: spacing.medium,
          }}
        />
      </HStack>
      <HStack spacing={spacing.standard}>
        <Button
          text={{
            type: 'body',
            weight: '02',
            text: 'Selected',
          }}
          borderRadius={spacing.tiny}
          backgroundColor={pallate.neutral['01']}
          trailing={
            <Icon
              name="IconArrowsSort"
              size={14}
              color={pallate.neutral['05']}
            />
          }
        />
        <Divider horizontal color={pallate.neutral['03']} thickness={1} />
        <Flex fill>
          <FlashList
            data={data}
            extraData={categoryId}
            horizontal
            contentContainerStyle={{
              paddingRight: spacing.extraLarge,
            }}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={ItemSeparatorComponent}
            estimatedItemSize={111}
            renderItem={({item}) => (
              <Button
                onPress={() => onSelectCategory?.(item.key)}
                text={{
                  type: 'body',
                  weight: '02',
                  color:
                    item.key === categoryId
                      ? pallate.neutral['01']
                      : pallate.neutral['05'],
                  text: item.name,
                }}
                borderRadius={spacing.tiny}
                backgroundColor={
                  item.key === categoryId
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
