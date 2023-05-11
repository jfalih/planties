import React from 'react';
import {FlashList} from '@shopify/flash-list';
import {HStack, StackProps, VStack} from '../../atoms/Layout/Stack';
import Text from '../../atoms/Text';
import {Flex} from '../../atoms/Layout';
import Divider from '../../atoms/Layout/Divider';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';

interface SectionProps extends StackProps {
  title: string;
  description: string;
  useFilter?: boolean;
}

const Section = (props: SectionProps) => {
  const {title, description, useFilter, children} = props;
  const {spacing, pallate} = useTheme();
  return (
    <VStack spacing={spacing.medium}>
      <HStack padding={{paddingHorizontal: spacing.large}}>
        <VStack>
          <Text type="title" weight="02">
            {title}
          </Text>
          <Text color={pallate.neutral['04']}>{description}</Text>
        </VStack>
        {/* TODO Add Button Here */}
      </HStack>
      {children}
    </VStack>
  );
};

export default Section;
