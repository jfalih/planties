import React, {useCallback} from 'react';
import Container from '../../../components/organisms/Container';
import Text from '../../../components/atoms/Text';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import Input from '../../../components/atoms/Input';
import {HStack, VStack} from '../../../components/atoms/Layout/Stack';
import Button from '../../../components/atoms/Button';
import Pressable from '../../../components/atoms/Pressable';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../../navigation/routes';
import {Controller, useForm} from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;
const Register = ({navigation}: Props) => {
  const {spacing, pallate} = useTheme();
  const {
    control,
    handleSubmit,
    watch,
    formState: {isSubmitting},
    reset,
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
      fullname: '',
      password: '',
      confirm_password: '',
    },
  });

  const handleRegister = handleSubmit(async data => {
    try {
      await auth().createUserWithEmailAndPassword(data.email, data.password);
      const user = auth().currentUser;
      if (user) {
        await user.updateProfile({
          displayName: data.fullname,
        });
        await user?.sendEmailVerification();
        reset();
        Toast.show({
          type: 'success',
          text1: 'Yey, berhasil nih!',
          text2: 'Kamu berhasil mendaftarkan akun, silahkan login ya..!',
        });
      }
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Hmm, kami nemu error nih!',
        text2: e?.message || 'Server sedang sibuk...',
      });
    }
  });

  const handleLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  return (
    <Container
      fill
      spacing={spacing.large}
      justify="space-between"
      backgroundColor={pallate.neutral['01']}
      padding={{
        paddingTop: spacing.standard * 2,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
      }}>
      <VStack spacing={spacing.extraLarge}>
        <VStack spacing={spacing.standard}>
          <Text type="title" color={pallate.primary['03']} weight="01">
            Buat akun kamu!
          </Text>
          <Text type="body" color={pallate.neutral['03']} weight="01">
            Tanamanmu rindu denganmu nihh. Masuk sekarang dan rawat tanamanmu
            dengan mudah 🌼
          </Text>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Diisi dulu ya, nama lengkap kamu biar kenal.',
              },
            }}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <Input
                icon={{
                  name: 'IconUser',
                  color: pallate.neutral['05'],
                  size: 20,
                }}
                editable={!isSubmitting}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Nama Lengkap"
                error={error?.message}
              />
            )}
            name="fullname"
          />
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
                editable={!isSubmitting}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Alamat Email"
                error={error?.message}
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Diisi dulu ya, password kamu.',
              },
              minLength: {
                value: 6,
                message: 'Minimal panjangnya 6, biar aman..',
              },
            }}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <Input
                icon={{
                  name: 'IconLock',
                  color: pallate.neutral['05'],
                  size: 20,
                }}
                editable={!isSubmitting}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                textContentType="oneTimeCode"
                placeholder="Password"
                error={error?.message}
              />
            )}
            name="password"
          />
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Diisi dulu ya, konfirmasi password kamu.',
              },
              validate: (val: string) => {
                if (watch('password') !== val) {
                  return 'Konfirmasi password kamu gak cocok nih..';
                }
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
                editable={!isSubmitting}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                textContentType="oneTimeCode"
                placeholder="Konfirmasi Password"
                error={error?.message}
              />
            )}
            name="confirm_password"
          />
        </VStack>
      </VStack>
      <VStack spacing={spacing.small} items="center">
        <Button
          isLoading={isSubmitting}
          onPress={handleRegister}
          self="stretch"
          backgroundColor={pallate.primary['03']}
          borderRadius={12}
          height={50}
          items="center"
          justify="center"
          text={{
            type: 'button',
            weight: '02',
            text: 'Register',
            color: pallate.neutral['01'],
          }}
        />
        <HStack spacing={spacing.tiny}>
          <Text>Sudah memiliki akun?</Text>
          <Pressable onPress={handleLogin}>
            <Text underline>Masuk</Text>
          </Pressable>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Register;
