import React from 'react';
import Container from '../../../components/organisms/Container';
import Carousel from '../../../components/molecules/Carousel';
import Text from '../../../components/atoms/Text';
import {HStack, VStack} from '../../../components/atoms/Layout/Stack';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import {Flex} from '../../../components/atoms/Layout';
import Icon from '../../../components/atoms/Icon';
import Section from '../../../components/organisms/Section';
import {FlashList} from '@shopify/flash-list';
import Card from '../../../components/molecules/Card';
import Divider from '../../../components/atoms/Layout/Divider';
import currency from '../../../../core/utils/currency';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useShopDetail} from '../../../../core/apis/shop';

const Detail = ({route, navigation}) => {
  const {spacing, pallate} = useTheme();
  const {id, type} = route.params;
  const {data} = useShopDetail(id);
  console.log('test', data);
  const {top} = useSafeAreaInsets();
  return (
    <Container
      scrollable
      navbar={{
        type: 'back',
        title: data?.name,
        zIndex: 10,
        position: {
          top,
        },
        width: '100%',
      }}>
      <Carousel
        isDetail
        data={[
          {
            image: type === 'plants' ? data?.images[0] : data?.photos?.[0],
          },
          {
            image: type === 'plants' ? data?.images[1] : data?.photos?.[1],
          },
          {
            image: type === 'plants' ? data?.images[2] : data?.photos?.[2],
          },
        ]}
      />
      <VStack spacing={spacing.large} padding={spacing.large}>
        <VStack spacing={spacing.small}>
          <Text type="title" weight="01">
            {data?.name || 'Loading..'}
          </Text>
          <HStack items="center" spacing={spacing.small}>
            <Text type="body" weight="01">
              {currency(data?.price)}
            </Text>
            <Text
              color={pallate.danger['03']}
              type="body"
              strikethrough
              weight="02">
              200.000 IDR
            </Text>
          </HStack>
        </VStack>
        <HStack items="center" spacing={spacing.small}>
          <HStack
            padding={{
              paddingHorizontal: spacing.standard,
              paddingVertical: spacing.small,
            }}
            borderRadius={10}
            backgroundColor={pallate.primary['03']}
            items="center"
            justify="center">
            <Text color={pallate.neutral['01']} type="body" weight="02">
              Terjual {data?.sold}
            </Text>
          </HStack>
          <HStack
            padding={{
              paddingHorizontal: spacing.standard,
              paddingVertical: spacing.small,
            }}
            borderRadius={10}
            backgroundColor={pallate.neutral['01']}
            spacing={spacing.small}
            items="center">
            <Icon name="IconStar" size={12} color={pallate.warning['03']} />
            <Text color={pallate.neutral['05']} type="body" weight="02">
              4.8
            </Text>
          </HStack>
        </HStack>
        <Text color={pallate.neutral['04']}>{data?.description}</Text>
        {data?.propagation && (
          <HStack>
            <Flex
              padding={spacing.standard}
              borderRadius={{
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}
              backgroundColor={pallate.neutral['05']}>
              <Text type="title" color={pallate.neutral['01']} weight="05">
                Propagation
              </Text>
            </Flex>
            <Flex
              fill
              padding={spacing.standard}
              borderRadius={{
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
              }}
              backgroundColor={pallate.neutral['01']}>
              <Text type="title" color={pallate.neutral['05']} weight="05">
                {data?.propagation}
              </Text>
            </Flex>
          </HStack>
        )}
        {type === 'plants' && (
          <HStack justify="space-between">
            <VStack
              spacing={spacing.tiny}
              width={84}
              height={84}
              borderRadius={20}
              backgroundColor={pallate.neutral['01']}
              items="center"
              justify="center">
              <Icon name="IconDroplet" size={24} color={pallate.info['03']} />
              <VStack items="center" justify="center">
                <Text type="title" weight="06">
                  Watering
                </Text>
                <Text>
                  {data?.maxWateringFrequency} {data?.wateringFrequencyUnit}
                </Text>
              </VStack>
            </VStack>
            <VStack
              spacing={spacing.small}
              width={84}
              borderRadius={20}
              height={84}
              backgroundColor={pallate.neutral['01']}
              items="center"
              justify="center">
              <Icon
                name="IconTrendingUp"
                size={24}
                color={pallate.primary['03']}
              />
              <VStack items="center" justify="center">
                <Text type="title" weight="06">
                  Scale
                </Text>
                <Text type="body" weight="02">
                  {data?.growth}
                </Text>
              </VStack>
            </VStack>
            <VStack
              spacing={spacing.small}
              width={84}
              borderRadius={20}
              height={84}
              backgroundColor={pallate.neutral['01']}
              items="center"
              justify="center">
              <Icon
                name="IconArrowsVertical"
                size={24}
                color={pallate.warning['03']}
              />
              <VStack items="center" justify="center">
                <Text type="title" weight="06">
                  Height
                </Text>
                <Text type="body" weight="02">
                  Up to {data?.height}
                  {data?.heightUnit}
                </Text>
              </VStack>
            </VStack>
            <VStack
              spacing={spacing.small}
              width={84}
              height={84}
              borderRadius={20}
              backgroundColor={pallate.neutral['01']}
              items="center"
              justify="center">
              <Icon
                name="IconTemperature"
                size={24}
                color={pallate.danger['03']}
              />
              <VStack items="center" justify="center">
                <Text type="title" weight="06">
                  Temp
                </Text>
                <Text>
                  {data?.minTemp}-{data?.maxTemp} C
                </Text>
              </VStack>
            </VStack>
          </HStack>
        )}
      </VStack>
    </Container>
  );
};

export default Detail;
