import React, {useCallback, useMemo, useState} from 'react';
import Container from '../../../components/organisms/Container';
import Text from '../../../components/atoms/Text';
import {HStack, VStack} from '../../../components/atoms/Layout/Stack';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import Pressable from '../../../components/atoms/Pressable';
import Icon from '../../../components/atoms/Icon';
import {Flex} from '../../../components/atoms/Layout';
import {ImageBackground, useWindowDimensions} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Input from '../../../components/atoms/Input';
import Toast from 'react-native-toast-message';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SVGRoomTemp, SVGSun, SVGWater} from '../../../../assets';
import Image from '../../../components/atoms/Image';
import LinearGradient from 'react-native-linear-gradient';
import Divider from '../../../components/atoms/Layout/Divider';
import {Controller, useForm} from 'react-hook-form';
import randomStatus from '../../../../core/utils/randomStatus';
import {plantsKeys, useAddPlant} from '../../../../core/apis/plants';
import {useQueryClient} from '@tanstack/react-query';
import {gardenKeys} from '../../../../core/apis/garden';

const AddPlant = ({route, navigation}) => {
  const {gardenId} = route.params;
  const {spacing, pallate} = useTheme();
  const queryClient = useQueryClient();
  const [image, setImage] = useState<string>();
  const [previewImg, setPreviewImg] = useState<string>(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Flag_of_None.svg/2560px-Flag_of_None.svg.png',
  );
  const [images, setImages] = useState<string[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const {mutate} = useAddPlant(gardenId);
  const {top} = useSafeAreaInsets();

  const status = randomStatus();

  const {width} = useWindowDimensions();

  const {
    control,
    handleSubmit,
    formState: {isSubmitting, isValid},
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
        } else if (!image) {
          Toast.show({
            type: 'error',
            text1: 'Hmm, kami nemu error nih!',
            text2: 'Silahkan berikan banner kamu tanaman kamu',
          });
        }
        Toast.show({
          type: 'info',
          text1: 'Mohon ditunggu ya..!',
          autoHide: false,
          text2: 'Loading.. Sedang mengirim tanamanmu..',
        });
        mutate(
          {
            name: data.name,
            banner: image,
            photos: images,
          },
          {
            onSuccess() {
              Toast.show({
                type: 'success',
                text1: 'Yey, berhasil nih!',
                text2: 'Kamu berhasil menambahkan tanaman..',
              });
              queryClient.invalidateQueries({
                queryKey: gardenKeys._def,
              });
              navigation.goBack();
            },
            onError(e) {
              Toast.show({
                type: 'error',
                text1: 'Hmm, kami nemu error nih!',
                text2: e?.response?.data?.message || 'Server sedang sibuk...',
              });
            },
          },
        );
      },
      [image, images, mutate, navigation, queryClient],
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

  const onPressBannerLib = useCallback(async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: true,
      });
      if (result?.assets) {
        const {uri, base64} = result.assets[0];
        if (uri) {
          setImage(base64);
          setPreviewImg(uri);
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

  const onPressLibrary = useCallback(async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: true,
      });
      if (result?.assets) {
        const {uri, base64} = result.assets[0];
        if (uri) {
          setImages(prev => [...prev, base64]);
          setPreview(prev => [...prev, uri]);
          Toast.show({
            type: 'success',
            text1: 'Yey, berhasil nih!',
            text2: 'Kamu berhasil mengupload foto..',
          });
          queryClient.invalidateQueries({
            queryKey: plantsKeys._def,
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
  }, [queryClient]);

  const onPressGallery = useCallback(async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: true,
      });

      Toast.show({
        type: 'info',
        text1: 'Uploading...',
        autoHide: false,
        text2: 'Sedang mengupload gambar ke server',
      });
      if (result?.assets) {
        const {uri, base64, fileName} = result.assets[0];
        setImages(prev => [...prev, base64]);
        setPreview(prev => [...prev, uri]);
        Toast.show({
          type: 'success',
          text1: 'Yey, berhasil nih!',
          text2: 'Kamu berhasil mengupload foto..',
        });
      }
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Hmm, kami nemu error nih!',
        text2: (e as Error)?.message || 'Server sedang sibuk...',
      });
    }
  }, []);

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
          uri: previewImg,
        }}>
        <HStack
          padding={spacing.large}
          justify="flex-end"
          items="flex-end"
          fill>
          <Pressable onPress={onPressBannerLib} self="flex-end">
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
          spacing={preview?.length % 2 !== 0 ? spacing.standard : undefined}
          justify={preview?.length % 2 === 0 ? 'space-between' : 'flex-start'}
          wrap>
          {preview?.map((val, index) => (
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
