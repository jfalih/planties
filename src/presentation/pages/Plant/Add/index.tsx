import React, {useCallback, useMemo, useRef, useState} from 'react';
import Container from '../../../components/organisms/Container';
import Text from '../../../components/atoms/Text';
import {HStack, VStack} from '../../../components/atoms/Layout/Stack';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import Pressable from '../../../components/atoms/Pressable';
import Icon from '../../../components/atoms/Icon';
import {Box, Flex} from '../../../components/atoms/Layout';
import {ImageBackground, TextInput, useWindowDimensions} from 'react-native';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import Input from '../../../components/atoms/Input';
import Toast from 'react-native-toast-message';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SVGRoomTemp, SVGSun, SVGWater} from '../../../../assets';
import Image from '../../../components/atoms/Image';
import LinearGradient from 'react-native-linear-gradient';
import Divider from '../../../components/atoms/Layout/Divider';
import firestore from '@react-native-firebase/firestore';
import {Controller, useForm} from 'react-hook-form';
import {useAuth} from '../../../../services/context/Auth/Auth.context';
import randomStatus from '../../../../core/utils/randomStatus';

const AddPlant = ({route, navigation}) => {
  const {spacing, pallate} = useTheme();
  const {plants: plantsParams = []} = route?.params || {};
  const textInputRef = useRef<TextInput>();
  const {user} = useAuth();
  const [image, setImage] = useState<string>(
    'https://firebasestorage.googleapis.com/v0/b/planties-60e81.appspot.com/o/ed-vazquez-GEc9KDwZuxY-unsplash.jpg?alt=media&token=07882a98-7d6c-4c1b-be23-f79961b3ada7',
  );
  const [images, setImages] = useState<string[]>([]);
  const {top} = useSafeAreaInsets();

  const status = randomStatus();

  const {width} = useWindowDimensions();

  const {
    control,
    handleSubmit,
    formState: {isSubmitting, isValid},
    reset,
  } = useForm({
    mode: 'all',
    defaultValues: {
      name: '',
    },
  });
  const handlePressSave = handleSubmit(
    useCallback(
      async data => {
        if (!images.length) {
          Toast.show({
            type: 'error',
            text1: 'Hmm, kami nemu error nih!',
            text2: 'Silahkan berikan gambarmu pada gallery..',
          });
          return;
        }
        try {
          const addPlants = {
            name: data.name,
            temp: status?.temp,
            status: status?.status,
            sunlight: status?.sunlight,
            watering: status?.watering,
            image,
            gallery: images,
            user_id: user?.uid,
          };

          console.log(addPlants);
          await firestore().collection('userPlants').add(addPlants);

          navigation.replace('AddGarden', {
            plants: [...plantsParams, addPlants],
          });
          setImages([]);
          reset();
          return;
        } catch (e) {
          Toast.show({
            type: 'error',
            text1: 'Hmm, kami nemu error nih!',
            text2: (e as Error)?.message || 'Server Sedang Sibuk!',
          });
        }
      },
      [
        images,
        image,
        navigation,
        plantsParams,
        reset,
        status?.status,
        status?.sunlight,
        status?.temp,
        status?.watering,
        user?.uid,
      ],
    ),
  );

  const Trailing = useMemo(() => {
    const disabled = isSubmitting || !isValid;
    return (
      <Pressable
        onPress={handlePressSave}
        disabled={disabled}
        self="center"
        backgroundColor={
          disabled ? pallate.neutral['04'] : pallate.primary['03']
        }
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
    isSubmitting,
    isValid,
    pallate.neutral,
    pallate.primary,
    spacing.standard,
    spacing.tiny,
  ]);

  const onPressLibrary = useCallback(async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
      });
      if (result?.assets) {
        const {uri, fileName} = result.assets[0];
        const ref = storage().ref(fileName);
        if (uri) {
          Toast.show({
            type: 'info',
            text1: 'Uploading...',
            autoHide: false,
            text2: 'Sedang mengupload gambar ke server',
          });
          await ref.putFile(uri);
          const url = await ref.getDownloadURL();
          setImage(url);
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
        text1: 'Hmm, gagal upload nih!',
        text2: (e as Error)?.message || 'Server sedang sibuk...',
      });
    }
  }, []);

  const onPressGallery = useCallback(async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
      });
      if (result?.assets) {
        const {uri, fileName} = result.assets[0];
        const ref = storage().ref(fileName);
        if (uri) {
          Toast.show({
            type: 'info',
            text1: 'Uploading...',
            autoHide: false,
            text2: 'Sedang mengupload gambar ke server',
          });
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
        text2: (e as Error)?.message || 'Server sedang sibuk...',
      });
    }
  }, [images]);

  return (
    <Container
      navbar={{
        type: 'back',
        title: 'Tambah Tanaman',
        zIndex: 10,
        trailing: Trailing,
        position: {
          top,
        },
        width: '100%',
      }}
      scrollable
      spacing={spacing.large}>
      <ImageBackground
        style={{
          width: '100%',
          height: 200,
        }}
        source={{
          uri: image,
        }}>
        <HStack
          padding={spacing.large}
          justify="flex-end"
          items="flex-end"
          fill>
          <Pressable onPress={onPressLibrary} self="flex-end">
            <Icon
              name="IconPhotoEdit"
              size={24}
              color={pallate.neutral['01']}
            />
          </Pressable>
        </HStack>
      </ImageBackground>
      <VStack
        spacing={spacing.large}
        padding={{
          paddingHorizontal: spacing.large,
        }}>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Diisi dulu ya, nama tanaman kamu.',
            },
          }}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
            <Input
              icon={{
                name: 'IconPlant',
                color: pallate.neutral['05'],
                size: 20,
              }}
              backgroundColor={pallate.neutral['01']}
              editable={!isSubmitting}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Nama Tanaman"
              error={error?.message}
            />
          )}
          name="name"
        />
        <Text type="title" weight="03">
          Status
        </Text>
        <VStack>
          <HStack spacing={spacing.standard}>
            <VStack
              fill
              borderRadius={5}
              padding={spacing.standard}
              spacing={spacing.standard}
              backgroundColor={pallate.neutral['01']}>
              <HStack spacing={spacing.tiny}>
                <Flex items="center">
                  <SVGRoomTemp />
                </Flex>
                <VStack>
                  <Text type="body" weight="02">
                    Room Temp
                  </Text>
                  <Text type="title" weight="05">
                    {status?.temp?.text}
                  </Text>
                </VStack>
              </HStack>
              <HStack borderRadius={20} backgroundColor={pallate.neutral['02']}>
                <LinearGradient
                  start={{x: 1, y: 1}}
                  end={{x: 0, y: 0}}
                  style={{
                    marginLeft: 50,
                    width: '40%',
                    height: 8,
                    borderRadius: 20,
                  }}
                  colors={['#85E0A3', '#079C7C']}
                />
                <Flex
                  self="center"
                  position={{
                    left: 40 + (status?.temp?.value || 0),
                  }}
                  borderWidth={2}
                  borderColor={pallate.neutral['04']}
                  backgroundColor={pallate.neutral['02']}
                  width={14}
                  height={14}
                  borderRadius={8}
                />
              </HStack>
            </VStack>
            <VStack
              fill
              borderRadius={5}
              padding={spacing.standard}
              spacing={spacing.standard}
              backgroundColor={pallate.neutral['01']}>
              <HStack spacing={spacing.tiny}>
                <Flex items="center">
                  <SVGSun />
                </Flex>
                <VStack>
                  <Text type="body" weight="02">
                    Sunlight
                  </Text>
                  <Text type="title" weight="05">
                    {status?.sunlight?.text || 'Loading..'}
                  </Text>
                </VStack>
              </HStack>
              <HStack borderRadius={20} backgroundColor={pallate.neutral['02']}>
                <LinearGradient
                  start={{x: 1, y: 1}}
                  end={{x: 0, y: 0}}
                  style={{
                    marginLeft: 60,
                    width: '40%',
                    height: 8,
                    borderRadius: 20,
                  }}
                  colors={['#FFD233', '#FFB865']}
                />
                <Flex
                  self="center"
                  position={{
                    left: 50 + (status?.sunlight?.value || 0),
                  }}
                  borderWidth={2}
                  borderColor={pallate.neutral['04']}
                  backgroundColor={pallate.neutral['02']}
                  width={14}
                  height={14}
                  borderRadius={8}
                />
              </HStack>
            </VStack>
          </HStack>
          <Divider thickness={spacing.standard} />
          <VStack
            fill
            borderRadius={5}
            spacing={spacing.standard}
            padding={spacing.standard}
            backgroundColor={pallate.neutral['01']}>
            <HStack spacing={spacing.tiny}>
              <Flex items="center">
                <SVGWater />
              </Flex>
              <VStack>
                <Text type="body" weight="02">
                  Water
                </Text>
                <Text type="title" weight="05">
                  {status?.watering} Hours
                </Text>
              </VStack>
            </HStack>
            <HStack borderRadius={20} backgroundColor={pallate.neutral['02']}>
              <LinearGradient
                start={{x: 1, y: 1}}
                end={{x: 0, y: 0}}
                style={{
                  width: `${((24 - status?.watering) / 24) * 100}%`,
                  height: 8,
                  borderRadius: 20,
                }}
                colors={['#7DD3FC', '#2563EB']}
              />
            </HStack>
          </VStack>
        </VStack>
        <Text type="title" weight="03">
          Gallery
        </Text>
        <HStack
          spacing={images.length % 2 !== 0 ? spacing.standard : undefined}
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
              width={width / 3 - spacing.large * 2 + spacing.small * 3}
              height={154}
            />
          ))}
          <Pressable
            onPress={onPressGallery}
            backgroundColor={pallate.neutral['03']}
            borderRadius={12}
            width={width / 3 - spacing.large * 2 + spacing.small * 3}
            height={154}>
            <VStack
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
                Tambah Foto
              </Text>
            </VStack>
          </Pressable>
        </HStack>
      </VStack>
    </Container>
  );
};

export default AddPlant;
