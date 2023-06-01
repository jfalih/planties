import React, {useCallback} from 'react';
import {ImageBackground} from 'react-native';
import Container from '../../components/organisms/Container';
import {HStack, VStack} from '../../components/atoms/Layout/Stack';
import {useTheme} from '../../../services/context/Theme/Theme.context';
import Text from '../../components/atoms/Text';
import {FlashList} from '@shopify/flash-list';
import useOxygen, {useUserOxygen} from '../../../core/apis/Plants/useOxygen';
import currency from '../../../core/utils/currency';
import Divider from '../../components/atoms/Layout/Divider';
import LinearGradient from 'react-native-linear-gradient';
import {Box} from '../../components/atoms/Layout';
import {SVGClown} from '../../../assets';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Oxygen = () => {
  const {spacing, pallate} = useTheme();
  const {data: oxygen} = useOxygen();
  const {data: userOxygen} = useUserOxygen();
  const {top} = useSafeAreaInsets();
  const ItemSeparatorComponent = () => <Divider thickness={spacing.standard} />;
  const generateColors = useCallback((id: number) => {
    switch (id) {
      case 0:
        return ['#7DD3FC', '#2563EB'];
      case 1:
        return ['#BAE6FD', '#60A5FA'];
      case 2:
        return ['#E0F2FE', '#93C5FD'];
    }
  }, []);

  return (
    <Container
      scrollable
      navbar={{
        type: 'back',
        title: 'Oxygen Leaderboard',
        zIndex: 10,
        position: {
          top,
        },
        width: '100%',
      }}>
      <VStack
        as={
          <ImageBackground
            imageStyle={{
              borderRadius: 22,
            }}
            source={require('../../../assets/background/oxygen.jpg')}
          />
        }
        spacing={spacing.extraLarge}
        padding={{
          paddingHorizontal: spacing.large,
          paddingTop: spacing.extraLarge * 3,
          paddingBottom: spacing.large,
        }}
        backgroundColor={pallate.neutral['01']}>
        <HStack spacing={spacing.small} items="center">
          <Text type="title" color={pallate.info['03']} weight="01">
            #{userOxygen?.rank || 0}
          </Text>
          <Text type="body" color={pallate.info['03']} weight="01">
            Kontribusi Oksigen
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
              {currency(userOxygen?.oxygen, {symbol: 'mg'}) || 0}
            </Text>{' '}
            oksigen
          </Text>
        </VStack>
      </VStack>
      <FlashList
        data={oxygen}
        contentContainerStyle={{
          paddingHorizontal: spacing.large,
          paddingTop: spacing.large,
        }}
        ItemSeparatorComponent={ItemSeparatorComponent}
        estimatedItemSize={100}
        renderItem={({item, index}) => (
          <VStack>
            <HStack
              as={
                index < 3 && (
                  <LinearGradient
                    start={{x: 1, y: 0}}
                    end={{x: 0, y: 1}}
                    colors={generateColors(index)}
                  />
                )
              }
              backgroundColor={pallate.neutral['01']}
              borderRadius={12}
              items="center"
              padding={spacing.standard}
              style={[
                {
                  shadowColor: index < 3 ? '#7DD3FC' : pallate.neutral['02'],
                  shadowOffset: {
                    width: 5,
                    height: 3,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 3.05,
                  elevation: 4,
                },
              ]}>
              <VStack spacing={spacing.tiny} fill>
                <Text
                  color={
                    index > 2 ? pallate.neutral['05'] : pallate.neutral['01']
                  }
                  type="title"
                  weight="05">
                  {item.name}
                </Text>
                <Text
                  color={
                    index > 2 ? pallate.neutral['04'] : pallate.neutral['01']
                  }>
                  {currency(item.oxygen, {symbol: 'mg'})}
                </Text>
              </VStack>
              <Text
                color={
                  index > 2 ? pallate.neutral['04'] : pallate.neutral['01']
                }
                type="title"
                weight="01">
                #{index + 1}
              </Text>
            </HStack>
            {index === 0 && (
              <Box
                style={{
                  zIndex: 50,
                }}
                backgroundColor={'transparent'}
                position={{
                  top: -10,
                  set: 'absolute',
                }}
                as={<SVGClown />}
              />
            )}
          </VStack>
        )}
      />
    </Container>
  );
};

export default Oxygen;
