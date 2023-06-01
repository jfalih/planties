import React, {useEffect, useState} from 'react';
import Container from '../../components/organisms/Container';
import {HStack, VStack} from '../../components/atoms/Layout/Stack';
import {useTheme} from '../../../services/context/Theme/Theme.context';
import Text from '../../components/atoms/Text';
import Divider from '../../components/atoms/Layout/Divider';
import SearchBar from '../../components/atoms/SearchBar';
import {Box, Flex} from '../../components/atoms/Layout';
import {FlashList} from '@shopify/flash-list';
import useGardens from '../../../core/apis/Plants/useGarden';
import {SVGWater} from '../../../assets';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../../components/atoms/Icon';
import Card from '../../components/molecules/Card';
import Image from '../../components/atoms/Image';
import useWeather from '../../../core/apis/Weather/useWeather';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';

const Care = ({navigation}) => {
  const {spacing, pallate} = useTheme();
  const {data: gardens} = useGardens();
  const [position, setPosition] = useState<GeolocationResponse>();
  const {data: weathers} = useWeather({
    lat: position?.coords?.latitude,
    lon: position?.coords?.longitude,
    exclude: 'hourly, daily',
    units: 'metric',
  });

  const {weather, main, name, wind} = weathers?.data || {};

  useEffect(() => {
    Geolocation.getCurrentPosition(
      res => {
        setPosition(res);
      },
      err => {},
    );
  }, []);

  const dividerSeparator = () => <Divider thickness={spacing.medium} />;
  const ListSeparator = () => <Divider horizontal thickness={spacing.medium} />;

  return (
    <Container
      edges={['top', 'bottom']}
      spacing={spacing.large}
      scrollable
      padding={{
        paddingTop: spacing.large,
        paddingHorizontal: spacing.large,
      }}>
      <SearchBar
        icon={{
          name: 'IconSearch',
          size: 24,
          color: pallate.neutral['04'],
        }}
      />
      <VStack
        spacing={spacing.small}
        borderRadius={16}
        backgroundColor={pallate.neutral['01']}
        padding={spacing.large}>
        <HStack items="center" spacing={spacing.large}>
          <VStack spacing={spacing.medium}>
            <HStack items="center" spacing={spacing.tiny}>
              <Icon name="IconMapPin" size={24} color={pallate.neutral['05']} />
              <Text type="title" weight="05">
                {name}
              </Text>
            </HStack>
            <HStack spacing={spacing.medium} fill items="center">
              <HStack>
                <Text
                  style={{
                    fontSize: 64,
                  }}
                  type="subtitles"
                  weight="02">
                  {Math.round(main?.temp) || 0}
                </Text>
                <Text type="title" weight="02">
                  °C
                </Text>
              </HStack>
              <VStack>
                <Text>L: {Math.round(main?.temp_min) || 0}°C</Text>
                <Text>H: {Math.round(main?.temp_max) || 0}°C</Text>
              </VStack>
              <Image
                backgroundColor="transparent"
                width={84}
                height={84}
                resizeMode="contain"
                src={{
                  uri: `https://openweathermap.org/img/w/${weather?.[0]?.icon}.png`,
                }}
              />
            </HStack>
          </VStack>
        </HStack>
        <HStack justify="space-between">
          <VStack>
            <Text>Humidity</Text>
            <Text type="title" weight="06">
              {main?.humidity || 0}%
            </Text>
          </VStack>
          <VStack>
            <Text>Feels Like</Text>
            <Text type="title" weight="06">
              {Math.round(main?.feels_like) || 0}°C
            </Text>
          </VStack>
          <VStack>
            <Text>Pressure</Text>
            <Text type="title" weight="06">
              {main?.pressure || 0} hPa
            </Text>
          </VStack>
          <VStack>
            <Text>Wind</Text>
            <Text type="title" weight="06">
              {wind?.speed || 0} m/s
            </Text>
          </VStack>
        </HStack>
      </VStack>
      <VStack
        spacing={spacing.small}
        borderRadius={16}
        backgroundColor={pallate.neutral['01']}
        padding={spacing.large}>
        <VStack spacing={spacing.small}>
          <Text type="title" weight="04">
            Reminder
          </Text>
          <Text>Pengingat agar kamu tidak lupa merawat tanamanmu</Text>
        </VStack>
        <VStack spacing={spacing.small}>
          <Text type="title" weight="06">
            Siram tanaman hari ini
          </Text>
          <Flex>
            <FlashList
              data={gardens}
              scrollEnabled={false}
              extraData={gardens}
              ItemSeparatorComponent={dividerSeparator}
              estimatedItemSize={100}
              renderItem={({item}) => {
                return (
                  <VStack spacing={spacing.small}>
                    <Text type="subtitles" weight="02">
                      {item?.name}
                    </Text>
                    <HStack
                      items="center"
                      fill
                      spacing={spacing.small}
                      width="100%">
                      <Box height={24}>
                        <SVGWater />
                      </Box>
                      <VStack>
                        <Text
                          type="subtitles"
                          weight="03"
                          color={pallate.neutral['04']}>
                          WATER
                        </Text>
                        <Text
                          type="button"
                          weight="03"
                          color={pallate.neutral['05']}>
                          {item.wateringCountdown || 0}{' '}
                          {item.wateringFreqUnit || 'hour'}
                        </Text>
                      </VStack>
                    </HStack>
                    <VStack spacing={spacing.tiny} fill>
                      <Flex
                        height={10}
                        borderRadius={20}
                        width="100%"
                        backgroundColor={pallate.neutral['02']}>
                        <Flex
                          width={`${
                            ((item.wateringFreq - item.wateringCountdown) /
                              item.wateringFreq) *
                            100
                          }%`}
                          borderRadius={20}
                          as={
                            <LinearGradient
                              start={{
                                x: 1,
                                y: 0,
                              }}
                              ends={{
                                x: 0,
                                y: 1,
                              }}
                              colors={['#7DD3FC', '#2563EB']}
                            />
                          }
                        />
                      </Flex>
                    </VStack>
                  </VStack>
                );
              }}
            />
          </Flex>
        </VStack>
      </VStack>
      <VStack
        spacing={spacing.large}
        borderRadius={16}
        backgroundColor={pallate.neutral['01']}
        padding={spacing.large}>
        <VStack spacing={spacing.small}>
          <Text type="title" weight="04">
            Outdoor
          </Text>
          <Text>Terjadi hujan. Tidak perlu menyiram</Text>
        </VStack>
        <Flex height={180}>
          <FlashList
            data={gardens}
            extraData={gardens}
            horizontal
            ItemSeparatorComponent={ListSeparator}
            estimatedItemSize={180}
            renderItem={({item}) => (
              <Card
                type="garden"
                onPress={() =>
                  navigation.navigate('DetailGarden', {id: item.key})
                }
                plants={item.photos}
                name={item.name}
              />
            )}
          />
        </Flex>
      </VStack>
      <VStack
        spacing={spacing.large}
        borderRadius={16}
        backgroundColor={pallate.neutral['01']}
        padding={spacing.large}>
        <VStack spacing={spacing.small}>
          <Text type="title" weight="04">
            Indoor
          </Text>
          <Text>Jangan lupa, siram tanamanmu pagi ini..</Text>
        </VStack>
        <Flex height={180}>
          <FlashList
            data={gardens}
            extraData={gardens}
            horizontal
            ItemSeparatorComponent={ListSeparator}
            estimatedItemSize={180}
            renderItem={({item}) => (
              <Card
                type="garden"
                onPress={() =>
                  navigation.navigate('DetailGarden', {id: item.key})
                }
                plants={item.photos}
                name={item.name}
              />
            )}
          />
        </Flex>
      </VStack>
    </Container>
  );
};

export default Care;
