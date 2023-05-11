import React, {useCallback} from 'react';
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
import {useWindowDimensions} from 'react-native';

const Home = ({navigation}) => {
  const {user} = useAuth();
  const {pallate, spacing} = useTheme();
  const {width} = useWindowDimensions();
  const plants = undefined;
  const gardens = undefined;
  const handleAddPlant = useCallback(() => {
    navigation.navigate('AddGarden');
  }, [navigation]);

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
        description="Lorem ipsum dolor sit amet consectetur. Lectus sit justo."
        onPressAddPlant={handleAddPlant}
        onPressScan={() => {}}
        gardens={[]}
      />
      <Section
        useFilter
        title="Perhatikan Tanamanmu"
        description="Berikan perhatian yang cukup. Ingatlah untuk selalu agar ia tetap tumbuh subur dan cantik.">
        {!!gardens && (
          <HStack
            padding={{
              paddingHorizontal: spacing.large,
            }}
            spacing={spacing.standard}>
            <Button
              text={{
                type: 'body',
                weight: '02',
                text: 'Selected',
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
                    text={{
                      type: 'body',
                      weight: '02',
                      text: 'Selected',
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
                )}
              />
            </Flex>
          </HStack>
        )}
        <Flex height={180}>
          <FlashList
            data={plants?.data?.data}
            extraData={plants?.data?.data}
            horizontal
            contentContainerStyle={{
              paddingHorizontal: spacing.large,
            }}
            ListEmptyComponent={ListEmptyComponentPlants}
            ItemSeparatorComponent={() => <Divider horizontal thickness={20} />}
            estimatedItemSize={180}
            renderItem={({item}) => (
              <Card
                type="plant"
                source={{
                  uri: item.image,
                }}
                name={item.name}
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
              text: 'Selected',
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
                  text={{
                    type: 'body',
                    weight: '02',
                    text: 'Selected',
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
              )}
            />
          </Flex>
        </HStack>
        <Flex height={180}>
          <FlashList
            data={plants?.data?.data}
            horizontal
            contentContainerStyle={{
              paddingHorizontal: spacing.large,
            }}
            ItemSeparatorComponent={() => <Divider horizontal thickness={20} />}
            estimatedItemSize={180}
            renderItem={({item}) => (
              <Card
                type="plant"
                source={{
                  uri: item.image,
                }}
                name={item.name}
              />
            )}
          />
        </Flex>
      </Section>
    </Container>
  );
};

export default Home;
