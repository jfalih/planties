import React, {useCallback, useState} from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {Controller, useForm} from 'react-hook-form';
import Toast from 'react-native-toast-message';

import {useTheme} from '../../../../services/context/Theme/Theme.context';
import Container from '../../../components/organisms/Container';
import Text from '../../../components/atoms/Text';
import Input from '../../../components/atoms/Input';
import Button from '../../../components/atoms/Button';
import Pressable from '../../../components/atoms/Pressable';
import {HStack, VStack} from '../../../components/atoms/Layout/Stack';
import {RootStackParamList} from '../../../../navigation/routes';
import {useAuth} from '../../../../services/context/Auth/Auth.context';

import Divider from '../../../components/atoms/Layout/Divider';
import Icon from '../../../components/atoms/Icon';
import {Flex} from '../../../components/atoms/Layout';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Forgot = ({navigation}: Props) => {
  const {spacing, pallate} = useTheme();
  const {
    control,
    handleSubmit,
    formState: {isSubmitting},
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
    },
  });

  const handleVerif = handleSubmit(async data => {
    try {
      await auth().sendPasswordResetEmail(data.email);
      Toast.show({
        type: 'success',
        text1: 'Yey, berhasil nih!',
        text2: 'Kamu berhasil mengirimkan reset password!',
      });
    } catch (e: any) {
      Toast.show({
        type: 'error',
        text1: 'Hmm, kami nemu error nih!',
        text2: e?.message || 'Server sedang sibuk...',
      });
    }
  });

  return (
    <Container
      fill
      spacing={spacing.large}
      backgroundColor={pallate.neutral['01']}
      padding={spacing.large}>
      <Pressable onPress={() => navigation.goBack()}>
        <Icon
          color={pallate.neutral['05']}
          name="IconArrowNarrowLeft"
          size={32}
        />
      </Pressable>
      <VStack spacing={spacing.large}>
        <VStack spacing={spacing.standard}>
          <Text type="title" color={pallate.primary['04']} weight="01">
            Lupa password kamu?
          </Text>
          <Text type="body" color={pallate.neutral['04']} weight="01">
            Jangan khawatir, kami di sini untuk membantumu mendapatkan akses
            kembali ke akunmu.
          </Text>
        </VStack>
        <VStack spacing={spacing.large}>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Diisi dulu ya, alamat email kamu.',
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Hmm, sepertinya ini bukan alamat email',
              },
            }}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <Input
                icon={{
                  name: 'IconAt',
                  color: pallate.neutral['05'],
                  size: 20,
                }}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                editable={!isSubmitting}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Alamat Email"
                error={error?.message}
              />
            )}
            name="email"
          />
          <Button
            isLoading={isSubmitting}
            disabled={isSubmitting}
            onPress={handleVerif}
            self="stretch"
            backgroundColor={pallate.primary['03']}
            borderRadius={12}
            height={50}
            items="center"
            justify="center"
            text={{
              type: 'button',
              weight: '02',
              text: 'Kirim Verifikasi',
              color: pallate.neutral['01'],
            }}
          />
        </VStack>
      </VStack>
    </Container>
  );
};

export default Forgot;
