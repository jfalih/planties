import React from 'react';
import {FlashList} from '@shopify/flash-list';
import {HStack, VStack} from '../../atoms/Layout/Stack';
import Text from '../../atoms/Text';
import {Box, Flex} from '../../atoms/Layout';
import Card from '../../molecules/Card';
import Divider from '../../atoms/Layout/Divider';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';

const Section = () => {
  const {spacing, pallate} = useTheme();
  return (
    <VStack spacing={spacing.medium}>
      <HStack padding={{paddingHorizontal: spacing.large}}>
        <VStack>
          <Text type="title" weight="02">
            Belajar Dari Pakar
          </Text>
          <Text color={pallate.neutral['03']}>
            Lorem ipsum dolor sit amet consectetur. Commodo ultricies amet cras
            aliquam tristique odio nisl.
          </Text>
        </VStack>
        {/* TODO Add Button Here */}
      </HStack>
      <HStack
        padding={{
          paddingHorizontal: spacing.large,
        }}
        spacing={spacing.standard}>
        <Button
          text="Selected"
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
            data={[1, 2, 3, 4]}
            horizontal
            contentContainerStyle={{
              paddingRight: spacing.extraLarge,
            }}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <Divider horizontal thickness={spacing.small} />
            )}
            estimatedItemSize={111}
            renderItem={({item}) => (
              <Button
                text="Selected"
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
            )}
          />
        </Flex>
      </HStack>
      <Box height={180}>
        <FlashList
          data={[1, 2, 3]}
          horizontal
          contentContainerStyle={{
            paddingHorizontal: spacing.large,
          }}
          ItemSeparatorComponent={() => <Divider horizontal thickness={20} />}
          estimatedItemSize={111}
          renderItem={({item}) => (
            <Card type="plant" name="Tomato" status="ok" />
          )}
        />
      </Box>
    </VStack>
  );
};

export default Section;
