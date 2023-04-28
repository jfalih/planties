import React from 'react';
import Flex, {FlexAnimated, FlexProps} from '../../atoms/Layout/Flex';
import {HStack, VStack} from '../../atoms/Layout/Stack';
import Text from '../../atoms/Text';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import AnimatedLottiePlant from '../../../../assets/lottie/plant.json';
import AnimatedLottieView from 'lottie-react-native';
import Divider from '../../atoms/Layout/Divider';
import {FlashList} from '@shopify/flash-list';
import Image from '../../atoms/Image';
import {Box} from '../../atoms/Layout';

interface WelcomeProps extends FlexProps {}
const Welcome: React.FC<WelcomeProps> = React.memo(
  React.forwardRef(() => {
    const {pallate, spacing} = useTheme();
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
          <VStack fill divider={<Divider thickness={spacing.small} />}>
            <Text
              type="title"
              weight="03"
              color={pallate.neutral['01']}
              text="Selamat pagi!"
            />
            <Text
              type="body"
              weight="01"
              color={pallate.neutral['01']}
              text="Lorem ipsum dolor sit amet consectetur. Lectus sit justo."
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
          backgroundColor={pallate.neutral['01']}
          padding={spacing.medium}>
          <HStack>
            <VStack>
              <Text
                type="title"
                weight="03"
                color={pallate.neutral['05']}
                text="Tanamanmu"
              />
              <Text
                type="body"
                weight="01"
                color={pallate.neutral['03']}
                text="Kamu memiliki 3 Taman"
              />
            </VStack>
            //Todo Add Buttons Here
          </HStack>
          <FlashList
            data={[1, 2, 3]}
            renderItem={({item}) => (
              <FlexAnimated
                height={150}
                width={130}
                backgroundColor={pallate.neutral['03']}>
                <Box as={<Image />} />
              </FlexAnimated>
            )}
          />
        </VStack>
      </VStack>
    );
  }),
);

export default Welcome;
