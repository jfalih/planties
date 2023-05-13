import React, {useCallback, useState} from 'react';
import {useGardenDetail} from '../../../../core/apis/Plants/useGarden';
import Container from '../../../components/organisms/Container';
import {HStack, VStack} from '../../../components/atoms/Layout/Stack';
import Text from '../../../components/atoms/Text';
import Icon from '../../../components/atoms/Icon';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import {SvgTemp} from '../../../../assets';
import Section from '../../../components/organisms/Section';
import Button from '../../../components/atoms/Button';
import {Flex} from '../../../components/atoms/Layout';
import Divider from '../../../components/atoms/Layout/Divider';
import {FlashList} from '@shopify/flash-list';
import Card from '../../../components/molecules/Card';
import {ScrollView, useWindowDimensions} from 'react-native';
import {useMedium} from '../../../../core/apis/Plants/useMedium';
import {useCategories} from '../../../../core/apis/Categories/useCategories';
import {useRecommendationPlants} from '../../../../core/apis/Plants/usePlants';
import Image from '../../../components/atoms/Image';

const Detail = ({route}) => {
  const {id} = route.params;
  const {pallate, spacing} = useTheme();
  const {data: garden} = useGardenDetail(id);
  const {width} = useWindowDimensions();
  const [category, setCategory] = useState<{
    filter: string;
    category_id: string;
  }>({
    filter: '',
    category_id: '',
  });

  const {data} = useRecommendationPlants(category.category_id);
  const {data: medium} = useMedium();
  const {data: categories} = useCategories();
  console.log(garden);
  const ListHeaderComponentPlants = useCallback(() => {
    const isActive = !category.category_id;
    return (
      <Button
        onPress={() =>
          setCategory({
            ...category,
            category_id: null,
          })
        }
        text={{
          type: 'body',
          weight: '02',
          text: 'Semua Tanaman',
          color: isActive ? pallate.neutral['01'] : pallate.neutral['05'],
        }}
        margin={{
          marginRight: spacing.small,
        }}
        borderRadius={10}
        backgroundColor={
          isActive ? pallate.primary['03'] : pallate.neutral['01']
        }
      />
    );
  }, [category, pallate.neutral, pallate.primary, spacing.small]);

  const ListEmptyComponentPlants = useCallback(() => {
    return (
      <VStack width={width - spacing.large * 2} items="center" justify="center">
        <Flex
          margin={{
            marginBottom: spacing.standard,
          }}
          items="center"
          justify="center"
          borderWidth={2}
          borderColor={pallate.primary['04']}
          backgroundColor={pallate.primary['03']}
          width={50}
          height={50}
          borderRadius={25}>
          <Icon name="IconPlantOff" size={32} color={pallate.neutral['01']} />
        </Flex>
        <Text type="title" weight="04">
          Hmm, Tanaman kamu gak ada nih..
        </Text>
        <Text type="body" align="center" weight="01">
          Kami tidak menemukan rekomendasi untukmu, coba pilih temukan tanaman
          yang lain yuk..
        </Text>
      </VStack>
    );
  }, [
    pallate.neutral,
    pallate.primary,
    spacing.large,
    spacing.standard,
    width,
  ]);

  return (
    <Container
      scrollable
      navbar={{
        type: 'back',
        title: garden?.name || 'Loading',
      }}>
      <VStack
        spacing={spacing.small}
        margin={spacing.large}
        borderRadius={16}
        backgroundColor={pallate.neutral['01']}
        padding={spacing.large}>
        <HStack items="center" spacing={spacing.large}>
          <VStack>
            <Text type="title" weight="05">
              Indoor Sensor
            </Text>
            <HStack items="center">
              <HStack>
                <Text
                  style={{
                    fontSize: 64,
                  }}
                  type="subtitles"
                  weight="02">
                  {garden?.temp}
                </Text>
                <Text type="title" weight="02">
                  °C
                </Text>
              </HStack>
              <Divider horizontal thickness={spacing.large} />
              <VStack>
                <Text>H: {garden?.tempH}°C</Text>
                <Text>H: {garden?.tempL}°C</Text>
              </VStack>
            </HStack>
          </VStack>
        </HStack>
        <HStack justify="space-between">
          <VStack>
            <Text>Humidity</Text>
            <Text type="title" weight="06">
              {garden?.humidity}%
            </Text>
          </VStack>
          <VStack>
            <Text>Precipitation</Text>
            <Text type="title" weight="06">
              {garden?.precipitation} ml
            </Text>
          </VStack>
          <VStack>
            <Text>Pressure</Text>
            <Text type="title" weight="06">
              {garden?.pressure} hPa
            </Text>
          </VStack>
          <VStack>
            <Text>Wind</Text>
            <Text type="title" weight="06">
              {garden?.wind} m/s
            </Text>
          </VStack>
        </HStack>
      </VStack>
      <Section title="Photos" description="Lihat tanamanmu melalui kamera">
        <Flex height={230}>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: spacing.large,
            }}
            horizontal>
            <Image
              borderRadius={{
                borderTopLeftRadius: 12,
                borderBottomLeftRadius: 12,
              }}
              width={192}
              height={208}
              source={{uri: garden?.photos[0].image}}
            />
            <VStack>
              <Image
                width={96}
                height={104}
                source={{uri: garden?.photos[1].image}}
              />
              <Image
                width={96}
                height={104}
                source={{uri: garden?.photos[2].image}}
              />
            </VStack>
            <Image
              borderRadius={{
                borderTopRightRadius: 12,
                borderBottomRightRadius: 12,
              }}
              width={192}
              height={208}
              source={{uri: garden?.photos?.[3]?.image}}
            />
          </ScrollView>
        </Flex>
      </Section>
      <Section
        title="Tanamanmu"
        description="Berikan perhatian yang cukup. Ingatlah untuk selalu agar ia tetap tumbuh subur dan cantik.">
        <HStack
          padding={{
            paddingHorizontal: spacing.large,
          }}
          spacing={spacing.standard}>
          <Button
            text={{
              type: 'body',
              weight: '02',
              text: 'Rekomendasi',
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
          <Divider horizontal color={pallate.neutral['04']} thickness={1} />
          <Flex fill>
            <FlashList
              data={categories}
              extraData={category}
              horizontal
              contentContainerStyle={{
                paddingRight: spacing.extraLarge,
              }}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => (
                <Divider horizontal thickness={spacing.small} />
              )}
              estimatedItemSize={111}
              ListHeaderComponent={ListHeaderComponentPlants}
              renderItem={({item}) => (
                <Button
                  key={item.key}
                  onPress={() =>
                    setCategory({...category, category_id: item.key})
                  }
                  text={{
                    type: 'body',
                    weight: '02',
                    color:
                      category.category_id === item.key
                        ? pallate.neutral['01']
                        : pallate.neutral['05'],
                    text: item.name,
                  }}
                  borderRadius={10}
                  backgroundColor={
                    category.category_id === item.key
                      ? pallate.primary['03']
                      : pallate.neutral['01']
                  }
                />
              )}
            />
          </Flex>
        </HStack>
        <Flex height={200}>
          <FlashList
            data={data}
            extraData={data}
            horizontal
            contentContainerStyle={{
              paddingHorizontal: spacing.large,
            }}
            ListEmptyComponent={ListEmptyComponentPlants}
            ItemSeparatorComponent={() => <Divider horizontal thickness={20} />}
            estimatedItemSize={180}
            renderItem={({item}) => (
              <Card
                key={item.key}
                type="plant"
                name={item.name}
                onPress={() => {}}
                status={item.attention}
                source={{
                  uri: item.images[0],
                }}
              />
            )}
          />
        </Flex>
      </Section>
    </Container>
  );
};

export default Detail;
