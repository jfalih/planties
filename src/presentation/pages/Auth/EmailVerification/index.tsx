import React, {useCallback, useEffect} from 'react';
import Button from '../../../components/atoms/Button';
import Container from '../../../components/organisms/Container';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import AnimatedLottieView from 'lottie-react-native';
import EmailLottie from '../../../../assets/lottie/mail.json';
import {Box} from '../../../components/atoms/Layout';
import {VStack} from '../../../components/atoms/Layout/Stack';
import Text from '../../../components/atoms/Text';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {useAuth} from '../../../../services/context/Auth/Auth.context';
import Toast from 'react-native-toast-message';
const EmailVerification = ({navigation}) => {
  const {pallate, spacing} = useTheme();
  const {handleUser} = useAuth();

  const handleCheckVerification = useCallback(() => {
    const user = auth().currentUser;
    user?.reload();
    if (user?.emailVerified) {
      handleUser(user);
      Toast.show({
        type: 'success',
        text1: 'Yey, berhasil nih!',
        text2: 'Kamu berhasil memverifikasi akunmu, enjoy it!',
      });
      navigation.navigate('BottomNavigation');
      return;
    }
    Toast.show({
      type: 'error',
      text1: 'Hmm, kami nemu error nih!',
      text2: 'Kamu belum memverifikasi akun kamuu :(',
    });
  }, [handleUser, navigation]);

  return (
    <Container
      backgroundColor={pallate.neutral['01']}
      padding={spacing.large}
      spacing={spacing.standard}
      justify="center"
      items="center">
      <VStack items="center">
        <Box
          as={<AnimatedLottieView source={EmailLottie} loop autoPlay />}
          height={300}
          width={300}
        />
        <Text type="title" weight="03">
          Verifikasi Alamat Email!
        </Text>
        <Text align="center" type="body" weight="01">
          Kami telah mengirimkan verifikasi alamat email, untuk mengaktifkan
          akun kamu..
        </Text>
      </VStack>
      <Button
        onPress={handleCheckVerification}
        self="stretch"
        backgroundColor={pallate.primary['03']}
        borderRadius={12}
        height={50}
        items="center"
        justify="center"
        text={{
          type: 'button',
          weight: '02',
          text: 'Check Verification',
          color: pallate.neutral['01'],
        }}
      />
    </Container>
  );
};

export default EmailVerification;
