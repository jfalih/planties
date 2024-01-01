import React, {useCallback, useState} from 'react';
import Container from '../../components/organisms/Container';
import {
  HStack,
  VStack,
  VStackAnimated,
} from '../../components/atoms/Layout/Stack';
import {FadeIn} from 'react-native-reanimated';
import Section from '../../components/organisms/Section';
import Button from '../../components/atoms/Button';
import Pressable from '../../components/atoms/Pressable';
import Icon from '../../components/atoms/Icon';
import {useTheme} from '../../../services/context/Theme/Theme.context';
import Text from '../../components/atoms/Text';
import {Flex} from '../../components/atoms/Layout';
import {FlashList} from '@shopify/flash-list';
import Divider from '../../components/atoms/Layout/Divider';
import Card from '../../components/molecules/Card';
import {
  useRecommendationPlants,
  useUserPlants,
} from '../../../core/apis/Plants/usePlants';
import Carousel from '../../components/molecules/Carousel';
import SearchBar from '../../components/atoms/SearchBar';
import {useWindowDimensions} from 'react-native';
import {useCategories} from '../../../core/apis/Categories/useCategories';
import {addToCart} from '../../../core/apis/Cart/useCart';
import {useAuth} from '../../../services/context/Auth/Auth.context';
import {useMedium} from '../../../core/apis/Plants/useMedium';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';

const Shop = ({navigation}) => {
  const {user} = useAuth();
  const {pallate, spacing} = useTheme();
  const {data: plants} = useUserPlants();
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

  const ListEmptyComponentMedium = useCallback(() => {
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
          Hmm, Media tanaman kamu gak ada nih..
        </Text>
        <Text type="body" align="center" weight="01">
          Kami tidak menemukan rekomendasi untukmu, coba pilih temukan media
          tanaman yang lain yuk..
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

  const handlePressWishlist = useCallback(
    async (id: string) => {
      try {
        await firestore().collection('wishlist').add({
          plant_id: id,
          user_id: user?.uid,
        });
        Toast.show({
          type: 'success',
          text1: 'Yey berhasil nih!',
          text2: 'Kami berhasil menambahkan item ke wishlist',
        });
      } catch (e) {
        Toast.show({
          type: 'error',
          text1: 'Hmm, kami nemu error nih!',
          text2: (e as Error).message || 'Server Sedang Sibuk!',
        });
      }
    },
    [user?.uid],
  );

  return (
    <Container
      scrollable
      navbar={{
        type: 'logo',
        zIndex: 10,
        position: {
          top: 0,
        },
      }}
      edges={['right', 'left']}
      spacing={spacing.large}>
      <VStack
        margin={{
          marginBottom: spacing.large,
        }}>
        <Carousel
          data={[
            {
              bg: 'red',
              image: 'https://i.ibb.co/TwW84nZ/carousel-1-2x.webp',
            },
            {
              bg: 'blue',
              image: 'https://i.ibb.co/wwBv0WQ/carousel-2-2x.webp',
            },
            {
              bg: 'green',
              image: 'https://i.ibb.co/0Dw15jg/carousel-2-2x.webp',
            },
          ]}
        />
        <SearchBar
          height={50}
          containerProps={{
            position: {
              bottom: (50 / 2) * -1,
              left: spacing.large,
            },
            width: width - spacing.large * 2,
          }}
          icon={{
            size: 24,
            color: pallate.neutral['04'],
            name: 'IconSearch',
          }}
        />
      </VStack>
      <Section
        title="Kategori"
        description="Kategori tanaman yang bisa kamu pilih">
        <HStack
          padding={{
            paddingHorizontal: spacing.large,
          }}
          justify="space-between">
          {categories.map((val, index) => (
            <Pressable
              key={val.key}
              onPress={() =>
                navigation.navigate('Category', {
                  category: val.name,
                  category_id: val.key,
                })
              }
              items="center"
              width={50}
              height={74}
              justify="space-between"
              borderRadius={12}
              direction="column">
              <VStackAnimated
                entering={FadeIn.duration(1500).delay(500 * index)}
                spacing={spacing.small}
                borderRadius={12}
                height={50}
                width={50}
                backgroundColor={pallate.neutral['01']}
                items="center"
                justify="center">
                <Icon color={pallate.neutral['05']} name={val.icon} size={28} />
              </VStackAnimated>
              <Text text={val.name} type="button" weight="tabItem" />
            </Pressable>
          ))}
        </HStack>
      </Section>
      <Section
        useFilter
        title="Media tanam untukmu"
        description="Media tanam yang direkomendasikan sesuai tanaman yang kamu miliki.">
        <Flex height={340}>
          <FlashList
            data={[]}
            horizontal
            contentContainerStyle={{
              paddingHorizontal: spacing.large,
            }}
            ListEmptyComponent={ListEmptyComponentMedium}
            ItemSeparatorComponent={() => <Divider horizontal thickness={20} />}
            estimatedItemSize={180}
            renderItem={({item}) => (
              <Card
                type="commerce"
                title={item.name}
                price={item.price}
                onPress={() =>
                  navigation.navigate('ProductDetail', {
                    id: item.key,
                    type: 'medium',
                  })
                }
                onPressAddToCart={() => {}}
                onPressAddToWishlist={() => handlePressWishlist(item.key)}
                source={{
                  uri: item.photos[0],
                }}
              />
            )}
          />
        </Flex>
      </Section>

      <Section
        useFilter
        title="Rekomendasi Tanaman"
        description="Kami pilihin yang baik #untukbumi dan kemudahan dalam merawatnya.">
        <Flex height={340}>
          <FlashList
            data={[]}
            extraData={[]}
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
                type="commerce"
                title={item.name}
                onPress={() =>
                  navigation.navigate('ProductDetail', {
                    id: item.key,
                    type: 'plants',
                  })
                }
                onPressAddToCart={() => addToCart(item.key, user.uid)}
                onPressAddToWishList={() => handlePressWishlist(item.key)}
                source={{
                  uri: item.images[0],
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

export default React.memo(Shop);
