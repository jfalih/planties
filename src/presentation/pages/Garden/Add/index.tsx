import React, {useCallback, useMemo, useState} from 'react';
import Container from '../../../components/organisms/Container';
import Text from '../../../components/atoms/Text';
import {HStack, VStack} from '../../../components/atoms/Layout/Stack';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import Pressable from '../../../components/atoms/Pressable';
import Icon from '../../../components/atoms/Icon';
import Button from '../../../components/atoms/Button';
import {launchImageLibrary} from 'react-native-image-picker';
import Input from '../../../components/atoms/Input';
import Toast from 'react-native-toast-message';
import Image from '../../../components/atoms/Image';
import {useWindowDimensions} from 'react-native';
import {gardenKeys, useGarden} from '../../../../core/apis/garden';
import {Controller, useForm} from 'react-hook-form';
import {useQueryClient} from '@tanstack/react-query';

const AddGarden = ({route, navigation}) => {
  const {spacing, pallate} = useTheme();
  const [images, setImages] = useState<string[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const {width} = useWindowDimensions();
  const queryClient = useQueryClient();
  const {mutate, isLoading} = useGarden();
  const {
    control,
    handleSubmit,
    formState: {isSubmitting},
  } = useForm({
    mode: 'all',
    defaultValues: {
      name: '',
      type: 'indoor',
    },
  });

  const onPressLibrary = useCallback(async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: true,
      });
      if (result?.assets) {
        setImages(prev => [...prev, result.assets[0]?.base64]);
        setPreview(prev => [...prev, result.assets[0]?.uri]);
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
        text2: e?.message || 'Server sedang sibuk...',
      });
    }
  }, []);

  const handlePressSave = handleSubmit(async data => {
    mutate(
      {
        name: data.name,
        type: 'indoor',
        photos: images,
      },
      {
        onSuccess() {
          Toast.show({
            type: 'success',
            text1: 'Yey, berhasil nih!',
            text2: 'Kamu berhasil menambahkan garden..!',
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
  });

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
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Diisi dulu ya, nama kebun kamu.',
          },
        }}
        name="name"
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <Input
            icon={{
              name: 'IconBox',
              color: pallate.neutral['05'],
              size: 20,
            }}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={error?.message}
            backgroundColor={pallate.neutral['01']}
            placeholder="Isi Nama Kebun"
          />
        )}
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
        />
      </HStack>
      <Text type="title" weight="03">
        Gallery
      </Text>
      <HStack
        spacing={preview?.length % 2 === 0 ? undefined : spacing.medium}
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
            width={width / 3 - spacing.standard * 3}
            height={140}
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
      </HStack>
    </Container>
  );
};

export default AddGarden;
