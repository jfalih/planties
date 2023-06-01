import React from 'react';
import {VStack} from '../../../atoms/Layout/Stack';
import Image from '../../../atoms/Image';
import {Box} from '../../../atoms/Layout';
import Text from '../../../atoms/Text';
import {useTheme} from '../../../../../services/context/Theme/Theme.context';
import Status from '../../../atoms/Status';
import Pressable, {PressableProps} from '../../../atoms/Pressable';
import {Source} from 'react-native-fast-image';

export interface PlantProps extends PressableProps {
  name: string;
  source: Source;
  status?: 'danger' | 'ok' | 'good';
}
const Plant = (props: PlantProps) => {
  const {name, status, source, ...rest} = props;
  const {spacing} = useTheme();
  return (
    <Pressable width={111} {...rest}>
      <VStack fill spacing={spacing.small}>
        <Image borderRadius={12} width={'100%'} height={154} source={source} />
        <Text type="caption" weight="01" text={name} />
        {status && (
          <Box
            position={{
              bottom: 44,
              right: -8,
            }}
            backgroundColor={'transparent'}
            as={<Status type={status} width={20} height={20} />}
          />
        )}
      </VStack>
    </Pressable>
  );
};

export default Plant;
