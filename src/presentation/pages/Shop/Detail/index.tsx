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
import {usePlant} from '../../../../core/apis/Plants/usePlants';
import {addToCart} from '../../../../core/apis/Cart/useCart';
import Divider from '../../../components/atoms/Layout/Divider';
import currency from '../../../../core/utils/currency';
import {useMedium} from '../../../../core/apis/Plants/useMedium';
import useVideos from '../../../../core/apis/Plants/useVideos';

const Detail = ({route, navigation}) => {
  const {spacing, pallate} = useTheme();
  const {id, type} = route.params;
  const {data} = usePlant(id, type);
  const {data: medium} = useMedium();
  const {data: videos} = useVideos(id);

  console.log(id);
  console.log(videos);
  return (
    <Container
      scrollable
      navbar={{
        type: 'back',
        title: 'Hallo',
        zIndex: 10,
        position: {
          top: 0,
        },
        width: '100%',
      }}>
      <Carousel
        isDetail
        data={[
          {
            image: type === 'plants' ? data?.images[0] : data?.photos[0],
          },
          {
            image: type === 'plants' ? data?.images[1] : data?.photos[1],
          },
          {
            image: type === 'plants' ? data?.images[2] : data?.photos[2],
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
            <Icon
              name="IconStarFilled"
              size={12}
              color={pallate.warning['03']}
            />
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
      {type !== 'medium' && (
        <Section
          title="Cara Merawat"
          description="Lorem ipsum dolor sit amet consectetur. Lobortis egestas dolor venenatis arcu tristique est odio feugiat.">
          <Flex height={200}>
            <FlashList
              data={videos}
              horizontal
              contentContainerStyle={{
                paddingHorizontal: spacing.large,
              }}
              ItemSeparatorComponent={() => (
                <Divider horizontal thickness={20} />
              )}
              estimatedItemSize={180}
              renderItem={({item}) => (
                <Card
                  source={{
                    uri: item.imageCover,
                  }}
                  key={item.key}
                  type="video"
                  title={item.title}
                />
              )}
            />
          </Flex>
        </Section>
      )}
      <Section
        title="Media tanam yang cocok"
        description="Media tanam yang direkomendasikan untuk Philodendron.">
        <Flex height={340}>
          <FlashList
            data={medium}
            horizontal
            contentContainerStyle={{
              paddingHorizontal: spacing.large,
            }}
            ItemSeparatorComponent={() => <Divider horizontal thickness={20} />}
            estimatedItemSize={180}
            renderItem={({item}) => (
              <Card
                key={item.key}
                type="commerce"
                title={item.name}
                onPress={() =>
                  navigation.navigate('ProductDetail', {
                    id: item.key,
                    type: 'medium',
                  })
                }
                onPressAddToCart={() => addToCart(item.key, user.uid)}
                onPressAddToWishlist={() => {}}
                source={{
                  uri: item.photos[0],
                }}
                price={item.price}
              />
            )}
          />
        </Flex>
      </Section>
    </Container>
  );
};

export default Detail;
