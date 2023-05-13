import React from 'react';
import Image from '../../../atoms/Image';
import {VStack} from '../../../atoms/Layout/Stack';
import Text from '../../../atoms/Text';
import {useTheme} from '../../../../../services/context/Theme/Theme.context';
import Pressable from '../../../atoms/Pressable';
import Icon from '../../../atoms/Icon';
import Box from '../../../atoms/Layout/Box';
import {Flex} from '../../../atoms/Layout';

const Video = props => {
  const {title, source, minutes = '00', seconds = '00', ...rest} = props;
  const {spacing, pallate} = useTheme();
  return (
    <Pressable>
      <VStack spacing={spacing.small} width={160}>
        <VStack>
          <Image borderRadius={20} width={160} height={100} source={source} />
          <Flex
            width={40}
            height={40}
            borderRadius={20}
            items="center"
            justify="center"
            backgroundColor={pallate.neutral['01']}
            position={{
              top: 100 / 2 - 40 / 2,
              left: 160 / 2 - 40 / 2,
            }}>
            <Icon
              size={18}
              color={pallate.neutral['05']}
              name="IconPlayerPlay"
            />
          </Flex>
          <Flex
            width={35}
            height={20}
            borderRadius={5}
            items="center"
            justify="center"
            backgroundColor={'rgba(255,255,255,0.5)'}
            position={{
              bottom: 10,
              left: 10,
            }}>
            <Text type="caption" weight="01">
              {minutes}:{seconds}
            </Text>
          </Flex>
        </VStack>
        <Text type="title" weight="05" numberOfLines={2}>
          {title}
        </Text>
      </VStack>
    </Pressable>
  );
};

export default Video;
