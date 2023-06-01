import React, {useCallback, useEffect, useState} from 'react';
import {useTheme} from '../../../services/context/Theme/Theme.context';
import Welcome from '../../components/organisms/Welcome';
import Container from '../../components/organisms/Container';
import Section from '../../components/organisms/Section';
import {Flex} from '../../components/atoms/Layout';
import {FlashList} from '@shopify/flash-list';
import Divider from '../../components/atoms/Layout/Divider';
import Card from '../../components/molecules/Card';
import {HStack, VStack} from '../../components/atoms/Layout/Stack';
import Button from '../../components/atoms/Button';
import Icon from '../../components/atoms/Icon';
import {useAuth} from '../../../services/context/Auth/Auth.context';
import Text from '../../components/atoms/Text';
import {ImageBackground, useWindowDimensions} from 'react-native';
import useGardens from '../../../core/apis/Plants/useGarden';
import {useRecommendationPlants} from '../../../core/apis/Plants/usePlants';
import {useCategories} from '../../../core/apis/Categories/useCategories';
import useExperts from '../../../core/apis/Plants/useExperts';
import Pressable from '../../components/atoms/Pressable';
import {useUserOxygen} from '../../../core/apis/Plants/useOxygen';
import currency from '../../../core/utils/currency';
import Geolocation from '@react-native-community/geolocation';
import Toast from 'react-native-toast-message';

const Home = ({navigation}) => {
  const {user} = useAuth();
  const {pallate, spacing} = useTheme();
  const {data: categories} = useCategories();
  const {data: userOxygen} = useUserOxygen();

  const {width} = useWindowDimensions();
  const {data: experts} = useExperts();
  const [category, setCategory] = useState<{
    filter: string;
    category_id: string;
  }>({
    filter: '',
    category_id: '',
  });

  const {data} = useRecommendationPlants(category.category_id);
  const {data: gardens} = useGardens();

  const handleAddPlant = useCallback(() => {
    if (user) {
      navigation.navigate('AddGarden');
    } else {
      navigation.navigate('Auth', {screen: 'Login'});
    }
  }, [navigation, user]);

  const handleScanPlant = useCallback(() => {
    navigation.navigate('Scan');
  }, [navigation]);

  const handleGarden = useCallback(
    id => {
      navigation.navigate('DetailGarden', {
        id,
      });
    },
    [navigation],
  );

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
      <VStack
        spacing={spacing.small}
        width={width - spacing.large * 2}
        items="center"
        justify="center">
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
        <VStack items="center">
          <Text type="title" weight="05">
            Hmm, Tanaman kamu gak ada nih..
          </Text>
          <Text type="body" align="center" weight="01">
            Kami tidak menemukan tanaman yang kamu punya, ayo belanja pada
            layanan e-commerce kami ya..
          </Text>
        </VStack>
        <Button
          onPress={() => navigation.navigate('Shop')}
          self="center"
          backgroundColor={pallate.primary['03']}
          text={{
            text: 'Belanja Sekarng',
            color: pallate.neutral['01'],
            type: 'title',
            weight: '06',
          }}
        />
      </VStack>
    );
  }, [
    navigation,
    pallate.neutral,
    pallate.primary,
    spacing.large,
    spacing.small,
    spacing.standard,
    width,
  ]);

  useEffect(() => {
    Geolocation.requestAuthorization(
      () => {
        Toast.show({
          type: 'success',
          text1: 'Yey, berhasil nih!',
          text2: 'Kamu berhasil memberikan akses lokasi!',
        });
      },
      error => {
        Toast.show({
          type: 'error',
          text1: 'Hmm, kami nemu error nih!',
          text2: error?.message || 'Server sedang sibuk...',
        });
      },
    );
  }, []);

  return (
    <Container
      spacing={spacing.large}
      scrollable
      navbar={{
        type: 'default',
        title: `${user?.displayName} 👋`,
        avatarSource: {
          uri: 'https://images.unsplash.com/photo-1682616323196-8a4df1e30151?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        },
      }}>
      <Welcome
        title="Selamat Pagi!"
        description="Hai, jangan lupa untuk cek tanamanmu hari ini ya.."
        onPressAddPlant={handleAddPlant}
        onPressScan={handleScanPlant}
        onPressGarden={handleGarden}
        gardens={gardens}
      />
      <Pressable
        onPress={() => navigation.navigate('Oxygen')}
        self="stretch"
        direction="column">
        <VStack
          as={
            <ImageBackground
              imageStyle={{
                borderRadius: 22,
              }}
              source={require('../../../assets/background/oxygen.jpg')}
            />
          }
          margin={{
            marginHorizontal: spacing.large,
          }}
          borderRadius={22}
          spacing={spacing.extraLarge}
          padding={spacing.large}
          backgroundColor={pallate.neutral['01']}>
          <HStack justify="flex-end" spacing={spacing.small} items="center">
            <Text type="body" color={pallate.info['03']} weight="01">
              Peringkat Kamu
            </Text>
            <Text type="title" color={pallate.info['03']} weight="01">
              #{userOxygen?.rank || 0}
            </Text>
          </HStack>
          <VStack>
            <HStack spacing={spacing.tiny} items="flex-end">
              <Text type="title" weight="01">
                Oksigen
              </Text>
              <Text type="title" weight="06">
                #untukbumi
              </Text>
            </HStack>
            <Text
              style={{
                width: 200,
              }}
              type="body"
              weight="01">
              Kamu telah menghasilkan{' '}
              <Text type="title" weight="05">
                {currency(userOxygen?.oxygen || 0, {symbol: 'mg'})}
              </Text>{' '}
              oksigen
            </Text>
          </VStack>
        </VStack>
      </Pressable>
      <Section
        useFilter
        title="Perhatikan Tanamanmu"
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
              text: 'Paling Laris',
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
                onPress={() =>
                  navigation.navigate('ProductDetail', {
                    id: item.key,
                    type: 'plants',
                  })
                }
                status={item.attention}
                onPressAddToCart={() => addToCart(item.key, user.uid)}
                onPressAddToWishlist={() => {}}
                source={{
                  uri: item.images[0],
                }}
              />
            )}
          />
        </Flex>
      </Section>
      <Section
        title="Belajar Dari Pakar"
        description="Konsultasikan tanamanmu dengan pakar ternama.">
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
        <Flex height={180}>
          <FlashList
            data={experts}
            horizontal
            contentContainerStyle={{
              paddingHorizontal: spacing.large,
            }}
            ItemSeparatorComponent={() => <Divider horizontal thickness={20} />}
            estimatedItemSize={180}
            renderItem={({item}) => (
              <Card
                type="pakar"
                pakar={item.profileImg}
                name={item.plantName}
                source={{
                  uri: item.plantImg,
                }}
              />
            )}
          />
        </Flex>
      </Section>
    </Container>
  );
};

export default Home;
