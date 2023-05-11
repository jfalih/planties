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
import auth from '@react-native-firebase/auth';
import {Controller, useForm} from 'react-hook-form';
import {useAuth} from '../../../../services/context/Auth/Auth.context';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({navigation}: Props) => {
  const {spacing, pallate} = useTheme();
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
          <Text type="title" color={pallate.primary['04']} weight="01">
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
                secureTextEntry
                placeholder="Password"
                error={error?.message}
              />
            )}
            name="password"
          />
        </VStack>
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
    </Container>
  );
};

export default Login;
