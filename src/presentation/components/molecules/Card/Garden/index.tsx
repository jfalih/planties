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
  plants: any[];
  name: string;
  source: ImageProps['source'];
  cardProps: FlexProps;
}

const Garden = (props: GardenProps) => {
  const {plants = [], name, source, cardProps, ...rest} = props;
  const {pallate, spacing} = useTheme();

  return (
    <Pressable direction="column" {...rest}>
      <Flex
        width={130}
        height={150}
        borderRadius={12}
        backgroundColor={pallate.neutral['02']}
        {...cardProps}>
        {plants.map((item, i) => {
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

          if (i > 2) {
            return null;
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
                  uri: item,
                }}
                resize="cover"
              />
            </BoxAnimated>
          );
        })}
      </Flex>
      <Divider thickness={spacing.small} />
      <HStack>
        {source && (
          <Box
            width={30}
            height={30}
            borderRadius={15}
            as={<Image source={source} />}
            backgroundColor={pallate.neutral['02']}
          />
        )}
        <Text type="caption" weight="01" text={name} />
      </HStack>
    </Pressable>
  );
};

export default Garden;
