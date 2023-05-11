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
import {Plants} from '../../../../../core/models';
import {HStack} from '../../../atoms/Layout/Stack';

export interface GardenProps extends PressableProps {
  plants: Plants[];
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
        {plants?.map((item, i) => (
          <BoxAnimated
            entering={BounceIn.duration(1500).delay(200 * i)}
            key={`banner-${i}`}
            position={item.position}>
            <Image
              width={68}
              height={68}
              borderRadius={12}
              source={{
                uri: item.imageUrl,
              }}
              resize="cover"
            />
            {item.status && plants.length - 1 === i && (
              <Box
                position={{
                  bottom: 5,
                  right: -5,
                }}
                backgroundColor={'transparent'}
                as={<Status type={item.status} width={20} height={20} />}
              />
            )}
          </BoxAnimated>
        ))}
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
