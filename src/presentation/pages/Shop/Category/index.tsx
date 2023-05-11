import React, {useCallback, useState} from 'react';
import Container from '../../../components/organisms/Container';
import {MasonryFlashList} from '@shopify/flash-list';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import Divider from '../../../components/atoms/Layout/Divider';
import {Box, Flex} from '../../../components/atoms/Layout';
import Card from '../../../components/molecules/Card';
import {useRecommendationPlants} from '../../../../core/apis/Plants/usePlants';
import {VStack} from '../../../components/atoms/Layout/Stack';
import {useWindowDimensions} from 'react-native';
import Icon from '../../../components/atoms/Icon';
import Text from '../../../components/atoms/Text';

const Category = ({route, navigation}) => {
  const {spacing, pallate} = useTheme();
  const {category, category_id} = route.params;
  const [catId, setCatId] = useState<string>(category_id);
  const {data, loading} = useRecommendationPlants(catId);
  const {width, height} = useWindowDimensions();
  const onSelectCategory = (item: string) => setCatId(item);

  const ListEmptyComponentPlants = useCallback(() => {
    return (
      <VStack
        height={height - 300}
        width={width - spacing.large * 2}
        items="center"
        justify="center">
        <Flex
          margin={{
            marginBottom: spacing.standard,
          }}
          items="center"
          justify="center"
          borderWidth={2}
          borderColor={pallate.primary['04']}
          backgroundColor={pallate.primary['03']}
          width={50}
          height={50}
          borderRadius={25}>
          <Icon name="IconPlantOff" size={32} color={pallate.neutral['01']} />
        </Flex>
        <Text type="title" weight="04">
          Hmm, Tanaman kamu gak ada nih..
        </Text>
        <Text type="body" align="center" weight="01">
          Kami tidak menemukan rekomendasi untukmu, coba pilih temukan tanaman
          yang lain yuk..
        </Text>
      </VStack>
    );
  }, [
    pallate.neutral,
    pallate.primary,
    spacing.large,
    spacing.standard,
    width,
  ]);

  return (
    <Container
      navbar={{
        type: 'commerce',
        title: category,
        categoryId: catId,
        onSelectCategory,
      }}
      backgroundColor={pallate.neutral['02']}
      scrollable
      spacing={spacing.large}
      padding={{
        paddingTop: spacing.large,
        paddingHorizontal: spacing.large,
      }}>
      <MasonryFlashList
        numColumns={2}
        data={data}
        ListEmptyComponent={ListEmptyComponentPlants}
        extraData={{data, catId}}
        estimatedItemSize={350}
        ItemSeparatorComponent={() => <Divider thickness={spacing.large} />}
        renderItem={({item, columnIndex}) => (
          <Box
            padding={{
              paddingLeft: columnIndex === 1 ? spacing.standard : 0,
              paddingRight: columnIndex === 0 ? spacing.standard : 0,
            }}>
            <Card
              source={{uri: item.imageUrl}}
              type="commerce"
              title={item.name}
              price={item.price}
              width={'100%'}
            />
          </Box>
        )}
      />
    </Container>
  );
};

export default Category;
