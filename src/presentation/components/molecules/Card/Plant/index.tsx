import React from 'react';
import {VStack} from '../../../atoms/Layout/Stack';
import Image from '../../../atoms/Image';
import {Box} from '../../../atoms/Layout';
import Text from '../../../atoms/Text';
import {useTheme} from '../../../../../services/context/Theme/Theme.context';
import Status from '../../../atoms/Status';
import Pressable, {PressableProps} from '../../../atoms/Pressable';

interface PlantProps extends PressableProps {
  name: string;
  status?: 'danger' | 'ok' | 'good';
}
const Plant = (props: PlantProps) => {
  const {name, status, ...rest} = props;
  const {spacing} = useTheme();
  return (
    <Pressable {...rest}>
      <VStack spacing={spacing.small}>
        <Image
          borderRadius={12}
          width={111}
          height={154}
          source={{
            uri: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
          }}
        />
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
