import React, {useCallback, useMemo, useState} from 'react';
import Container from '../../../components/organisms/Container';
import Text from '../../../components/atoms/Text';
import {HStack, VStack} from '../../../components/atoms/Layout/Stack';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import Pressable from '../../../components/atoms/Pressable';
import Icon from '../../../components/atoms/Icon';
import Button from '../../../components/atoms/Button';
import {Flex} from '../../../components/atoms/Layout';
import Card from '../../../components/molecules/Card';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import Input from '../../../components/atoms/Input';
import Toast from 'react-native-toast-message';
import Image from '../../../components/atoms/Image';
import {useWindowDimensions} from 'react-native';

const AddGarden = ({route, navigation}) => {
  const {spacing, pallate} = useTheme();
  const {plants} = route?.params || {};
  const [images, setImages] = useState<string[]>([]);
  const {width} = useWindowDimensions();
  const onPressLibrary = useCallback(async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
      });
      if (result?.assets) {
        const {uri, fileName} = result.assets[0];
        const ref = storage().ref(fileName);
        if (uri) {
          await ref.putFile(uri);
          const url = await ref.getDownloadURL();
          setImages([...images, url]);
          Toast.show({
            type: 'success',
            text1: 'Yey, berhasil nih!',
            text2: 'Kamu berhasil mengupload foto..',
          });
        }
      }
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Hmm, kami nemu error nih!',
        text2: e?.message || 'Server sedang sibuk...',
      });
    }
  }, [images]);

  const handlePressPlant = useCallback(() => {
    navigation.navigate('AddPlant', {
      plants,
    });
  }, [navigation, plants]);

  const handlePressSave = useCallback(() => {
    navigation.navigate('AddPlant');
  }, [navigation]);

  const Trailing = useMemo(() => {
    return (
      <Pressable
        onPress={handlePressSave}
        self="center"
        backgroundColor={pallate.primary['03']}
        borderRadius={8}
        padding={{
          paddingVertical: spacing.tiny,
          paddingHorizontal: spacing.standard,
        }}>
        <Text color={pallate.neutral['01']}>Save</Text>
      </Pressable>
    );
  }, [
    handlePressSave,
    pallate.neutral,
    pallate.primary,
    spacing.standard,
    spacing.tiny,
  ]);

  return (
    <Container
      navbar={{
        type: 'back',
        title: 'Tambah Kebun',
        trailing: Trailing,
      }}
      scrollable
      spacing={spacing.large}
      padding={spacing.large}>
      <Input
        icon={{
          name: 'IconBox',
          color: pallate.neutral['05'],
          size: 20,
        }}
        backgroundColor={pallate.neutral['01']}
        placeholder="Isi Nama Kebun"
      />
      <HStack items="center">
        <Text fill type="body" weight="01">
          Tipe taman
        </Text>
        <Button
          borderRadius={8}
          backgroundColor={pallate.neutral['01']}
          text={{
            text: 'Indoor',
            type: 'button',
            weight: '03',
          }}
          trailing={
            <Icon
              size={16}
              color={pallate.neutral['05']}
              name={'IconChevronDown'}
            />
          }
        />
      </HStack>
      <Text type="title" weight="03">
        Tanaman
      </Text>
      <Flex justify="space-between" wrap>
        {plants?.map(val => (
          <Card
            type="plant"
            width={width / 3 - spacing.large * 2 + spacing.small * 3}
            margin={{
              marginBottom: spacing.large,
            }}
            source={{
              uri: val.image,
            }}
            name={val.name}
          />
        ))}
        <Pressable
          onPress={handlePressPlant}
          backgroundColor={pallate.neutral['03']}
          borderRadius={12}
          width={width / 3 - spacing.large * 2 + spacing.small * 3}
          height={154}>
          <VStack
            padding={spacing.medium}
            spacing={spacing.small}
            fill
            items="center"
            justify="center">
            <Icon name="IconPlus" size={32} color={pallate.neutral['05']} />
            <Text
              align="center"
              color={pallate.neutral['05']}
              type="title"
              weight="06">
              Tambah Tanaman
            </Text>
          </VStack>
        </Pressable>
      </Flex>
      <Text type="title" weight="03">
        Gallery
      </Text>
      <Flex
        justify={images.length % 2 === 0 ? 'space-between' : 'flex-start'}
        wrap>
        {images?.map((val, index) => (
          <Image
            margin={{
              marginBottom: spacing.standard,
            }}
            key={val}
            source={{uri: val}}
            borderRadius={12}
            width={111}
            height={154}
          />
        ))}
        <Pressable
          onPress={onPressLibrary}
          backgroundColor={pallate.neutral['03']}
          borderRadius={12}
          width={width / 3 - spacing.large * 2 + spacing.small * 3}
          height={154}>
          <VStack spacing={spacing.small} fill items="center" justify="center">
            <Icon name="IconPlus" size={32} color={pallate.neutral['05']} />
            <Text
              align="center"
              color={pallate.neutral['05']}
              type="title"
              weight="06">
              Tambah Foto
            </Text>
          </VStack>
        </Pressable>
      </Flex>
    </Container>
  );
};

export default AddGarden;
