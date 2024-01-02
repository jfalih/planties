import React, {useCallback, useState} from 'react';
import Container from '../../../components/organisms/Container';
import {HStack, VStack} from '../../../components/atoms/Layout/Stack';
import Text from '../../../components/atoms/Text';
import Icon from '../../../components/atoms/Icon';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import Section from '../../../components/organisms/Section';
import Button from '../../../components/atoms/Button';
import {Flex} from '../../../components/atoms/Layout';
import Divider from '../../../components/atoms/Layout/Divider';
import {FlashList} from '@shopify/flash-list';
import Card from '../../../components/molecules/Card';
import {ScrollView, useWindowDimensions} from 'react-native';
import Image from '../../../components/atoms/Image';
import {SvgTemp} from '../../../../assets';
import {useGardenDetail, useDeleteGarden, gardenKeys} from '../../../../core/apis/garden';
import {usePlantsByGarden} from '../../../../core/apis/plants';
import Toast from 'react-native-toast-message';
import Pressable from '../../../components/atoms/Pressable';
import {useQueryClient} from '@tanstack/react-query';

const Detail = ({route, navigation}) => {
  const {id} = route.params;
  const {pallate, spacing} = useTheme();
  const {data: detailGarden} = useGardenDetail(id);
  const {data: detailPlant} = usePlantsByGarden(id);
  const queryClient = useQueryClient();
  const {mutate} = useDeleteGarden(id);
  const {garden} = detailGarden?.data?.data || {};
  const {plants} = detailPlant?.data?.data || {};
  const {width} = useWindowDimensions();
  const [category, setCategory] = useState<{
    filter: string;
    category_id: string;
  }>({
    filter: '',
    category_id: '',
  });

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

  const handlePressDelete = useCallback(() => {
    mutate(
      {},
      {
        onSuccess(res) {
          Toast.show({
            type: 'success',
            text1: 'Yey, berhasil nih!',
            text2: 'Kamu berhasil menghapus..',
          });
          queryClient.invalidateQueries({
            queryKey: gardenKeys._def,
          });
          navigation.goBack();
        },
        onError(e) {
          Toast.show({
            type: 'error',
            text1: 'Hmm, kami nemu error nih!',
            text2: e?.response?.data?.message || 'Server sedang sibuk...',
          });
        },
      },
    );
  }, [mutate, navigation, queryClient]);

  return (
    <Container
      scrollable
      navbar={{
        type: 'back',
        title: garden?.name || 'Loading',
      }}>
      <Pressable
        self="flex-start"
        margin={{
          marginLeft: 24,
        }}
        onPress={handlePressDelete}
        backgroundColor={pallate.danger['05']}
        borderRadius={8}
        padding={{
          paddingVertical: spacing.tiny,
          paddingHorizontal: spacing.standard,
        }}>
        <Text color={pallate.neutral['01']}>Delete</Text>
      </Pressable>
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
            <HStack spacing={spacing.standard} items="center">
              <HStack>
                <Text
                  style={{
                    fontSize: 64,
                  }}
                  type="subtitles"
                  weight="02">
                  {garden?.temp || 0}
                </Text>
                <Text type="title" weight="02">
                  °C
                </Text>
              </HStack>
              <Divider horizontal thickness={spacing.tiny} />
              <VStack>
                <Text>H: {garden?.tempH || 0}°C</Text>
                <Text>H: {garden?.tempL || 0}°C</Text>
              </VStack>
              <Divider horizontal thickness={spacing.large} />
              <SvgTemp />
            </HStack>
          </VStack>
        </HStack>
        <HStack justify="space-between">
          <VStack>
            <Text>Humidity</Text>
            <Text type="title" weight="06">
              {garden?.humidity || 0}%
            </Text>
          </VStack>
          <VStack>
            <Text>Precipitation</Text>
            <Text type="title" weight="06">
              {garden?.precipitation || 0} ml
            </Text>
          </VStack>
          <VStack>
            <Text>Pressure</Text>
            <Text type="title" weight="06">
              {garden?.pressure || 0} hPa
            </Text>
          </VStack>
          <VStack>
            <Text>Wind</Text>
            <Text type="title" weight="06">
              {garden?.wind || 0} m/s
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
              source={{uri: garden?.photos[0]}}
            />
            <VStack>
              <Image
                width={96}
                height={104}
                source={{uri: garden?.photos[1]}}
              />
              <Image
                width={96}
                height={104}
                source={{uri: garden?.photos[2]}}
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
        <Button
          onPress={() =>
            navigation.navigate('AddPlant', {
              gardenId: id,
            })
          }
          margin={{
            marginLeft: spacing.large,
          }}
          backgroundColor={pallate.neutral['05']}
          color={pallate.neutral['01']}
          text={{
            type: 'button',
            text: 'Tambah Tanaman',
            weight: 'tabItem',
            color: pallate.neutral['01'],
          }}
          icon={{
            name: 'IconPlant',
            size: 16,
            color: pallate.neutral['01'],
            stroke: 2.5,
          }}
        />
        <Flex height={200}>
          <FlashList
            data={plants}
            extraData={plants}
            horizontal
            contentContainerStyle={{
              paddingHorizontal: spacing.large,
            }}
            ListEmptyComponent={ListEmptyComponentPlants}
            ItemSeparatorComponent={() => <Divider horizontal thickness={20} />}
            estimatedItemSize={180}
            renderItem={({item}) => (
              <Card
                key={item.name}
                type="plant"
                name={item.name}
                onPress={() => {
                  throw new Error('');
                }}
                status={'ok'}
                source={{
                  uri: item.banner,
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
