import React from 'react';
import {BounceIn} from 'react-native-reanimated';
import Box, {BoxAnimated} from '../../../atoms/Layout/Box';
import Flex, {FlexProps} from '../../../atoms/Layout/Flex';
import Image, {ImageProps} from '../../../atoms/Image';
import Text from '../../../atoms/Text';
import {useTheme} from '../../../../../services/context/Theme/Theme.context';
import Pressable, {PressableProps} from '../../../atoms/Pressable';
import Divider from '../../../atoms/Layout/Divider';
import Status from '../../../atoms/Status';
import {HStack} from '../../../atoms/Layout/Stack';

export interface GardenProps extends PressableProps {
    pakar: any[];
  name: string;
  source: ImageProps['source'];
  cardProps: FlexProps;
}

const Pakar = (props: GardenProps) => {
  const {pakar = [], name, source, cardProps, ...rest} = props;
  const {pallate, spacing} = useTheme();

  return (
    <Pressable direction="column" {...rest}>
      <Flex
        width={130}
        height={150}
        borderRadius={12}
        backgroundColor={pallate.neutral['01']}
        {...cardProps}>
        {pakar.map((item, i) => {
          let position;
          switch (i) {
            case 1:
              position = {
                top: 40,
                right: 10,
              };
              break;
            case 2:
              position = {
                bottom: 10,
                left: 20,
              };
              break;
            default:
              position = {
                top: 10,
                left: 10,
              };
          }
          return (
            <BoxAnimated
              entering={BounceIn.duration(1500).delay(200 * i)}
              key={`banner-${i}`}
              position={position}>
              <Image
                width={68}
                height={68}
                borderRadius={12}
                source={{
                  uri: item.image,
                }}
                resize="cover"
              />
              {item?.attention && plants.length - 1 === i && (
                <Box
                  position={{
                    bottom: 5,
                    right: -5,
                  }}
                  backgroundColor={'transparent'}
                  as={<Status type={item?.attention} width={20} height={20} />}
                />
              )}
            </BoxAnimated>
          );
        })}
      </Flex>
      <Divider thickness={spacing.small} />
      <HStack spacing={spacing.small} items="center">
        {source && (
          <Box
            width={20}
            height={20}
            borderWidth={1}
            borderColor={pallate.neutral['01']}
            borderRadius={10}
            as={<Image source={source} />}
            backgroundColor={pallate.neutral['02']}
          />
        )}
        <Text type="caption" weight="01" text={name} />
      </HStack>
    </Pressable>
  );
};

export default Pakar;
