import React, { useCallback } from 'react';
import Container from '../../../components/organisms/Container';
import Text from '../../../components/atoms/Text';
import {HStack, VStack} from '../../../components/atoms/Layout/Stack';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import useDiagnose from '../../../../core/apis/Plants/useDiagnose';
import Image from '../../../components/atoms/Image';
import {StyleSheet} from 'react-native';
import Icon from '../../../components/atoms/Icon';
import useAttention from '../../../../core/apis/Plants/useAttention';
import Accordion from 'react-native-collapsible/Accordion';

const Detail = ({route, navigation}) => {
  const {spacing, pallate} = useTheme();
  const {diagnoseId} = route.params;
  const {data: diagnose} = useDiagnose(diagnoseId);
  const {data: attention} = useAttention(diagnose?.status);

  const _renderContent = useCallback((section) => (

  ), []);

  const _renderHeader = useCallback((section) => (

  ), []);
  return (
    <Container
      scrollable
      navbar={{
        type: 'back',
        title: 'Diagnosis',
        zIndex: 10,
        position: {
          top: 0,
        },
        width: '100%',
      }}>
      <Image
        style={imageStyle.image}
        source={{
          uri: diagnose?.image,
        }}
      />
      <VStack spacing={spacing.large} padding={spacing.large}>
        <Text type="title" weight="01">
          Diagnosis
        </Text>
        <VStack
          items="center"
          padding={spacing.large}
          spacing={spacing.standard}
          backgroundColor={pallate.neutral['01']}
          borderRadius={39}>
          <Icon size={42} color={'#000'} name="IconMoodSmileBeam" />
          <VStack items="center" spacing={spacing.tiny}>
            <Text type="title" weight="06">
              {diagnose?.status}
            </Text>
            <Text type="body" weight="01">
              AI {diagnose?.prediction || '0%'} Confident
            </Text>
          </VStack>
        </VStack>
        <HStack justify="space-between">
          <VStack
            spacing={spacing.tiny}
            width={84}
            height={84}
            borderRadius={20}
            backgroundColor={pallate.neutral['01']}
            items="center"
            justify="center">
            <Icon name="IconDroplet" size={24} color={pallate.info['03']} />
            <VStack items="center" justify="center">
              <Text type="title" weight="06">
                Watering
              </Text>
              <Text>1 Week</Text>
            </VStack>
          </VStack>
          <VStack
            spacing={spacing.small}
            width={84}
            borderRadius={20}
            height={84}
            backgroundColor={pallate.neutral['01']}
            items="center"
            justify="center">
            <Icon
              name="IconTrendingUp"
              size={24}
              color={pallate.primary['03']}
            />
            <VStack items="center" justify="center">
              <Text type="title" weight="06">
                Scale
              </Text>
              <Text type="body" weight="02">
                3 cm
              </Text>
            </VStack>
          </VStack>
          <VStack
            spacing={spacing.small}
            width={84}
            borderRadius={20}
            height={84}
            backgroundColor={pallate.neutral['01']}
            items="center"
            justify="center">
            <Icon
              name="IconArrowsVertical"
              size={24}
              color={pallate.warning['03']}
            />
            <VStack items="center" justify="center">
              <Text type="title" weight="06">
                Height
              </Text>
              <Text type="body" weight="02">
                Up to 1ft
              </Text>
            </VStack>
          </VStack>
          <VStack
            spacing={spacing.small}
            width={84}
            height={84}
            borderRadius={20}
            backgroundColor={pallate.neutral['01']}
            items="center"
            justify="center">
            <Icon
              name="IconTemperature"
              size={24}
              color={pallate.danger['03']}
            />
            <VStack items="center" justify="center">
              <Text type="title" weight="06">
                Temp
              </Text>
              <Text>0-30 C</Text>
            </VStack>
          </VStack>
        </HStack>
        <Text type="title" weight="03">
          Need Attention
        </Text>
        <Accordion sections={attention} renderHeader={_renderHeader} renderContent={_renderContent}/>
      </VStack>
    </Container>
  );
};

const imageStyle = StyleSheet.create({
  image: {height: 'auto', width: '100%', aspectRatio: 3 / 2},
});

export default Detail;
