import React from 'react';
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

const Care = ({navigation}) => {
  const {spacing, pallate} = useTheme();
  const {data: gardens} = useGardens();

  const dividerSeparator = () => <Divider thickness={spacing.medium} />;
  const ListSeparator = () => <Divider horizontal thickness={spacing.medium} />;

  console.log(gardens);
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
          <VStack>
            <HStack spacing={spacing.tiny}>
              <Icon name="IconMapPin" size={24} color={pallate.neutral['05']} />
              <Text type="title" weight="05">
                Bandung
              </Text>
            </HStack>
            <HStack items="center">
              <HStack>
                <Text
                  style={{
                    fontSize: 64,
                  }}
                  type="subtitles"
                  weight="02">
                  25
                </Text>
                <Text type="title" weight="02">
                  °C
                </Text>
              </HStack>
              <Divider horizontal thickness={spacing.large} />
              <VStack>
                <Text>H: 26°C</Text>
                <Text>H: 23°C</Text>
              </VStack>
              <Divider horizontal thickness={spacing.large} />
              <Image
                backgroundColor="transparent"
                width={120}
                height={84}
                resizeMode="contain"
                source={require('../../../assets/background/rain.png')}
              />
            </HStack>
          </VStack>
        </HStack>
        <HStack justify="space-between">
          <VStack>
            <Text>Humidity</Text>
            <Text type="title" weight="06">
              30%
            </Text>
          </VStack>
          <VStack>
            <Text>Precipitation</Text>
            <Text type="title" weight="06">
              5.1 ml
            </Text>
          </VStack>
          <VStack>
            <Text>Pressure</Text>
            <Text type="title" weight="06">
              450 hPa
            </Text>
          </VStack>
          <VStack>
            <Text>Wind</Text>
            <Text type="title" weight="06">
              23 m/s
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
