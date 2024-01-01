import React, {useCallback, useState} from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
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

import Divider from '../../../components/atoms/Layout/Divider';
import Icon from '../../../components/atoms/Icon';
import {Flex} from '../../../components/atoms/Layout';
import {useLogin} from '../../../../core/apis/auth';
import {useAuth} from '../../../../services/context/Auth/Auth.context';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({navigation}: Props) => {
  const {spacing, pallate} = useTheme();
  const [secure, setSecure] = useState(true);
  const [remember, setRemember] = useState(false);
  const {setToken, setRefreshToken} = useAuth();
  const {mutate} = useLogin();
  const {
    control,
    handleSubmit,
    formState: {isSubmitting},
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = handleSubmit(async data => {
    mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess(res) {
          const {accessToken, refreshToken} = res.data.data || {};
          if (accessToken && refreshToken) {
            setToken(accessToken);
            setRefreshToken(refreshToken);
            navigation.navigate('BottomNavigation');
            return;
          }
          Toast.show({
            type: 'error',
            text1: 'Hmm, kami nemu error nih!',
            text2: 'Login Failed, Server sedang sibuk...',
          });
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

  const handleRegister = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  return (
    <Container
      fill
      spacing={spacing.standard}
      backgroundColor={pallate.neutral['01']}
      padding={spacing.large}>
      <VStack spacing={spacing.extraLarge}>
        <VStack spacing={spacing.standard}>
          <Text type="title" color={pallate.primary['03']} weight="01">
            Selamat Datang!
          </Text>
          <Text type="body" color={pallate.neutral['04']} weight="01">
            Tanamanmu rindu denganmu nihh. Masuk sekarang dan rawat tanamanmu
            dengan mudah 🌼
          </Text>
        </VStack>
        <VStack spacing={spacing.standard}>
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
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Diisi dulu ya, alamat email kamu.',
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
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                secureTextEntry={secure}
                trailing={
                  <Pressable onPress={() => setSecure(!secure)}>
                    <Icon
                      name={secure ? 'IconEyeClosed' : 'IconEye'}
                      color="#000"
                      size={24}
                    />
                  </Pressable>
                }
                placeholder="Password"
                error={error?.message}
              />
            )}
            name="password"
          />
          <HStack items="center" justify="space-between">
            <Pressable
              onPress={() => setRemember(!remember)}
              self="stretch"
              items="center">
              <Flex
                backgroundColor={
                  remember ? pallate.neutral['05'] : pallate.neutral['01']
                }
                borderRadius={4}
                width={18}
                items="center"
                justify="center"
                height={18}
                borderWidth={1}>
                {remember && (
                  <Icon
                    name="IconCheck"
                    size={14}
                    stroke={3}
                    color={pallate.neutral['01']}
                  />
                )}
              </Flex>
              <Divider horizontal thickness={spacing.small} />
              <Text type="body" weight="02">
                Remember Me
              </Text>
            </Pressable>
          </HStack>
        </VStack>
        <VStack spacing={spacing.small} items="center">
          <Button
            isLoading={isSubmitting}
            disabled={isSubmitting}
            onPress={handleLogin}
            self="stretch"
            backgroundColor={pallate.primary['03']}
            borderRadius={12}
            height={50}
            items="center"
            justify="center"
            text={{
              type: 'button',
              weight: '02',
              text: 'Masuk',
              color: pallate.neutral['01'],
            }}
          />
          <HStack spacing={spacing.tiny}>
            <Text>Kamu belum memiliki akun?</Text>
            <Pressable onPress={handleRegister}>
              <Text underline>Daftar</Text>
            </Pressable>
          </HStack>
        </VStack>
      </VStack>
    </Container>
  );
};

export default Login;
