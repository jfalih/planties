import React from 'react';
import {FlashList} from '@shopify/flash-list';
import AnimatedLottieView from 'lottie-react-native';
import {useWindowDimensions} from 'react-native';

import Flex, {FlexProps} from '../../atoms/Layout/Flex';
import {HStack, VStack} from '../../atoms/Layout/Stack';
import Text from '../../atoms/Text';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import AnimatedLottiePlant from '../../../../assets/lottie/plant.json';
import Divider from '../../atoms/Layout/Divider';
import {Box} from '../../atoms/Layout';
import {FarmerCouple, SVGNotFound, Wave} from '../../../../assets';
import Button from '../../atoms/Button';
import {Gardens} from '../../../../core/models';
import Card from '../../molecules/Card';

interface WelcomeProps extends FlexProps {
  title: string;
  description: string;
  gardens: Gardens[];
  onPressScan(): void;
  onPressAddPlant(): void;
}

const ListEmptyComponent = ({onPressAddPlant}) => {
  const {pallate, spacing} = useTheme();
  const {width} = useWindowDimensions();
  const widthFormula = width - (spacing.large * 2 + spacing.medium * 2);
  return (
    <HStack
      items="center"
      borderRadius={24}
      backgroundColor={pallate.neutral['02']}
      padding={spacing.medium}
      height={180}
      width={widthFormula}>
      <VStack spacing={spacing.standard}>
        <Text
          type="title"
          weight="05"
          color={pallate.neutral['05']}
          text={'Kemu belum\nmemiliki kebun'}
        />
        <Button
          onPress={onPressAddPlant}
          backgroundColor={pallate.neutral['05']}
          color={pallate.neutral['01']}
          text={{
            type: 'button',
            text: 'Tambah Kebun',
            weight: 'tabItem',
            color: pallate.neutral['01'],
          }}
          icon={{
            name: 'IconApps',
            size: 16,
            color: pallate.neutral['01'],
            stroke: 2.5,
          }}
        />
      </VStack>
      <Box
        as={<SVGNotFound />}
        borderRadius={24}
        position={{
          bottom: 0,
          right: 0,
        }}
        backgroundColor={'transparent'}
      />
      <Box
        width={220}
        position={{
          right: -15,
          bottom: -10,
        }}
        as={<AnimatedLottieView source={FarmerCouple} autoPlay />}
      />
    </HStack>
  );
};

const Welcome: React.FC<WelcomeProps> = React.memo(
  React.forwardRef((props, _) => {
    const {
      title,
      description,
      gardens,
      onPressScan,
      onPressGarden,
      onPressAddPlant,
    } = props;
    const {pallate, spacing} = useTheme();
    const dividerSeparator = () => (
      <Divider horizontal thickness={spacing.standard} />
    );
    return (
      <VStack margin={{marginHorizontal: spacing.large}}>
        <HStack
          borderRadius={{
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
          items="center"
          padding={spacing.medium}
          backgroundColor={pallate.primary['03']}>
          <Box
            backgroundColor={'transparent'}
            width={'100%'}
            position={{bottom: 0}}
            as={<Wave />}
          />
          <VStack fill divider={<Divider thickness={spacing.small} />}>
            <Text
              type="title"
              weight="03"
              color={pallate.neutral['01']}
              text={title}
            />
            <Text
              type="body"
              weight="01"
              color={pallate.neutral['01']}
              text={description}
            />
            <Button
              onPress={onPressScan}
              backgroundColor={pallate.primary['04']}
              color={pallate.neutral['01']}
              text={{
                type: 'button',
                text: 'Scan Tanaman',
                weight: 'tabItem',
                color: pallate.neutral['01'],
              }}
              icon={{
                name: 'IconScan',
                size: 16,
                color: pallate.neutral['01'],
                stroke: 2.5,
              }}
            />
          </VStack>
          <Flex
            width={110}
            height={110}
            padding={20}
            items="center"
            justify="center"
            as={<AnimatedLottieView source={AnimatedLottiePlant} autoPlay />}
          />
        </HStack>
        <VStack
          borderRadius={{
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          }}
          spacing={spacing.standard}
          backgroundColor={pallate.neutral['01']}
          padding={spacing.medium}>
          <HStack fill justify="space-between">
            <VStack>
              <Text
                type="title"
                weight="03"
                color={pallate.neutral['05']}
                text="Kebunmu"
              />
              <Text
                type="body"
                weight="01"
                color={pallate.neutral['04']}
                text={`Kamu memiliki ${gardens?.length || 0} Kebun`}
              />
            </VStack>
            <Button
              onPress={onPressAddPlant}
              backgroundColor={pallate.neutral['05']}
              color={pallate.neutral['01']}
              text={{
                type: 'button',
                text: 'Tambah Kebun',
                weight: 'tabItem',
                color: pallate.neutral['01'],
              }}
              icon={{
                name: 'IconApps',
                size: 16,
                color: pallate.neutral['01'],
                stroke: 2.5,
              }}
            />
          </HStack>
          <Flex height={180}>
            <FlashList
              data={gardens}
              extraData={gardens}
              horizontal
              ListEmptyComponent={
                <ListEmptyComponent onPressAddPlant={onPressAddPlant} />
              }
              ItemSeparatorComponent={dividerSeparator}
              estimatedItemSize={180}
              renderItem={({item}) => (
                <Card
                  type="garden"
                  plants={item.plantsBanner}
                  name={item.name}
                  onPress={() => onPressGarden(item.id)}
                />
              )}
            />
          </Flex>
        </VStack>
      </VStack>
    );
  }),
);

export default Welcome;
