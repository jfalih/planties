import React, {useCallback, useState} from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {Controller, useForm} from 'react-hook-form';
import Toast from 'react-native-toast-message';
import {StyleSheet} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

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
import {LogoApple, LogoFacebook, LogoGoogle} from '../../../../assets';
import Icon from '../../../components/atoms/Icon';
import {Flex} from '../../../components/atoms/Layout';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({navigation}: Props) => {
  const {spacing, pallate} = useTheme();
  const [secure, setSecure] = useState(true);
  const [remember, setRemember] = useState(false);
  const {handleUser} = useAuth();
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
    try {
      const res = await auth().signInWithEmailAndPassword(
        data.email,
        data.password,
      );
      if (res.user.emailVerified) {
        handleUser(res.user);
        navigation.navigate('BottomNavigation');
      } else {
        navigation.navigate('Auth', {screen: 'EmailVerification'});
      }
    } catch (e: any) {
      Toast.show({
        type: 'error',
        text1: 'Hmm, kami nemu error nih!',
        text2: e?.message || 'Server sedang sibuk...',
      });
    }
  });

  const handleRegister = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  const handleGoogleLogin = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Hmm, kami nemu error nih!',
        text2: (e as Error).message || 'Server sedang sibuk...',
      });
    }
  }, []);

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
            <Pressable
              onPress={() => navigation.navigate('Forgot')}
              self="stretch">
              <Text underline type="body" weight="02">
                Forgot Password?
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
      <HStack width={'100%'} spacing={spacing.standard} items="center">
        <Divider style={loginStyle.fill} color={pallate.neutral['03']} />
        <Text color={pallate.neutral['04']} type="title" weight="05">
          OR
        </Text>
        <Divider style={loginStyle.fill} color={pallate.neutral['03']} />
      </HStack>
      <VStack spacing={spacing.standard}>
        <Button
          disabled={isSubmitting}
          onPress={handleGoogleLogin}
          self="stretch"
          backgroundColor={pallate.neutral['02']}
          borderRadius={12}
          height={50}
          borderColor={pallate.neutral['04']}
          items="center"
          justify="center"
          leading={<LogoGoogle />}
          text={{
            type: 'button',
            weight: '02',
            text: 'Continue With Google',
            color: pallate.neutral['04'],
          }}
        />
        <Button
          disabled={isSubmitting}
          onPress={() => {}}
          self="stretch"
          backgroundColor={pallate.neutral['02']}
          borderRadius={12}
          height={50}
          borderColor={pallate.neutral['04']}
          items="center"
          justify="center"
          leading={<LogoFacebook />}
          text={{
            type: 'button',
            weight: '02',
            text: 'Continue With Facebook',
            color: pallate.neutral['04'],
          }}
        />
        <Button
          disabled={isSubmitting}
          onPress={() => {}}
          self="stretch"
          backgroundColor={pallate.neutral['02']}
          borderRadius={12}
          height={50}
          borderColor={pallate.neutral['04']}
          items="center"
          justify="center"
          leading={<LogoApple />}
          text={{
            type: 'button',
            weight: '02',
            text: 'Continue With Apple',
            color: pallate.neutral['04'],
          }}
        />
      </VStack>
    </Container>
  );
};

const loginStyle = StyleSheet.create({
  fill: {
    flex: 1,
  },
});

export default Login;
