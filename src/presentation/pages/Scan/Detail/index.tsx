import React, {useCallback, useMemo, useState} from 'react';
import Container from '../../../components/organisms/Container';
import Text from '../../../components/atoms/Text';
import {
  HStack,
  HStackAnimated,
  VStack,
} from '../../../components/atoms/Layout/Stack';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import Image from '../../../components/atoms/Image';
import {StyleSheet} from 'react-native';
import Icon from '../../../components/atoms/Icon';
import Accordion from 'react-native-collapsible/Accordion';

const Detail = ({route, navigation}) => {
  const {spacing, pallate} = useTheme();
  const {diagnoseId} = route.params;
  const {data: diagnose} = undefined;
  const {data: attention} = undefined;
  const [active, setActive] = useState([]);

  const _renderContent = useCallback(
    (section, isActive) => {
      return (
        <VStack
          padding={{
            paddingTop: spacing.standard,
            paddingHorizontal: spacing.medium,
            paddingBottom: spacing.large,
          }}
          borderRadius={20}
          spacing={spacing.standard}
          backgroundColor={pallate.neutral['01']}>
          <HStack spacing={spacing.large}>
            <Text fill color={pallate.neutral['04']} numberOfLines={10}>
              {section.description}
            </Text>
            <Image
              source={{
                uri: section.exampleImgUrl,
              }}
              width={100}
              height={200}
              borderRadius={20}
            />
          </HStack>
          <HStack spacing={spacing.small}>
            <Image
              borderRadius={20}
              fill
              source={{
                uri: section?.thumbnailUrl,
              }}
            />
            <Image
              source={{
                uri: section.exampleImgUrl,
              }}
              width={140}
              height={100}
              borderRadius={20}
            />
          </HStack>
        </VStack>
      );
    },
    [
      pallate.neutral,
      spacing.large,
      spacing.medium,
      spacing.small,
      spacing.standard,
    ],
  );

  const _renderHeader = useCallback(
    section => {
      return (
        <HStackAnimated
          items="center"
          spacing={spacing.standard}
          padding={{
            paddingVertical: spacing.standard,
            paddingHorizontal: spacing.large,
          }}
          borderRadius={20}
          backgroundColor={pallate.neutral['01']}>
          <Icon size={24} color={pallate.neutral['05']} name="IconPlus" />
          <Text>{section.title}</Text>
        </HStackAnimated>
      );
    },
    [pallate.neutral, spacing.large, spacing.standard],
  );

  const dataIcon = useMemo(() => {
    const status = diagnose?.status?.trim().toLowerCase();
    if (status === 'healthy') {
      return {
        color: pallate.primary['03'],
        icon: 'IconMoodSmileBeam',
      };
    } else if (status === 'scab') {
      return {
        color: pallate.warning['03'],
        icon: 'IconMoodSmile',
      };
    } else if (status === 'rust') {
      return {
        color: pallate.warning['03'],
        icon: 'IconMoodSmile',
      };
    } else {
      return {
        color: pallate.danger['03'],
        icon: 'IconMoodSad',
      };
    }
  }, [diagnose?.status, pallate]);
  const _updateSections = activeSections => {
    setActive(activeSections);
  };

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
          <Icon size={42} color={dataIcon?.color} name={dataIcon?.icon} />
          <VStack items="center" spacing={spacing.tiny}>
            <Text type="title" weight="06">
              {diagnose?.status || 'Loading..'}
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
              <Text>0-30°C</Text>
            </VStack>
          </VStack>
        </HStack>
        <Text type="title" weight="03">
          Need Attention
        </Text>
        <Accordion
          underlayColor="#f2f2f2"
          sections={attention}
          activeSections={active}
          onChange={_updateSections}
          renderContent={_renderContent}
          renderHeader={_renderHeader}
        />
      </VStack>
    </Container>
  );
};

const imageStyle = StyleSheet.create({
  image: {height: 'auto', width: '100%', aspectRatio: 3 / 2},
});

export default Detail;
