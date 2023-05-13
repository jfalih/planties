import React, {useRef} from 'react';
import {useCallback, useEffect, useState} from 'react';
import Container from '../../components/organisms/Container';
import {Flex} from '../../components/atoms/Layout';
import Pressable from '../../components/atoms/Pressable';
import {useTheme} from '../../../services/context/Theme/Theme.context';
import {launchImageLibrary} from 'react-native-image-picker';
import {Camera, CameraType} from 'react-native-camera-kit';
import useScan from '../../../core/apis/Scan/useScan';
import {ActivityIndicator, Platform} from 'react-native';
import {VStack} from '../../components/atoms/Layout/Stack';
import Text from '../../components/atoms/Text';
import Image from '../../components/atoms/Image';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '../../../services/context/Auth/Auth.context';

const Scan = ({navigation}) => {
  const [uri, setUri] = useState<string>();
  const [image, setImage] = useState<string>();
  const {pallate, spacing} = useTheme();
  const cameraRef = useRef<Camera>();
  const {user} = useAuth();

  const {mutate, isLoading} = useScan({
    async onSuccess(res: {data: {prediction: any; status: any}}) {
      const {
        data: {prediction, status},
      } = res;
      const reference = storage().ref(image);
      await reference.putFile(uri);

      const url = await reference.getDownloadURL();
      const postData = await firestore().collection('diagnosis').add({
        status,
        user_id: user?.uid,
        prediction: prediction.trim(),
        image: url,
      });

      navigation.navigate('ScanDetail', {
        isFromScan: true,
        diagnoseId: postData?.id,
      });
    },
  });

  const onPressScanned = useCallback(async () => {
    const file = await cameraRef.current?.capture();
    const data = new FormData();
    const url =
      Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri;
    data.append('file', {
      name: file.id,
      type: 'image/jpeg',
      uri: url,
    });
    setUri(url);
    setImage(file.name);
    mutate(data);
  }, [mutate]);

  return (
    <Container
      navbar={{
        type: 'back',
        title: 'Scan Plant',
      }}>
      {isLoading ? (
        <VStack padding={spacing.large} spacing={spacing.large} items="center">
          <Flex
            width={280}
            height={420}
            borderRadius={24}
            position={{set: 'relative'}}>
            <Image
              fill
              borderRadius={24}
              source={{
                uri,
              }}
            />
            <VStack
              borderRadius={24}
              width={280}
              spacing={spacing.small}
              height={420}
              items="center"
              justify="center"
              backgroundColor={'rgba(0,0,0,0.5)'}
              position={{
                top: 0,
              }}>
              <ActivityIndicator size="large" color={pallate.neutral['01']} />
              <Text color={pallate.neutral['01']} type="title" weight="04">
                Identifying...
              </Text>
            </VStack>
          </Flex>
          <Text
            style={{
              width: 280,
            }}
            align="center"
            type="title"
            weight="03">
            Mendiagnosis tanamanmu..
          </Text>
        </VStack>
      ) : (
        <Camera
          ref={cameraRef}
          style={{flex: 1}}
          cameraType={CameraType.Back} // optional
          flashMode="auto" // on/off/auto(default)
          focusMode="on" // off/on(default)
          zoomMode="on" // off/on(default)
          torchMode="off" // on/off(default)
          ratioOverlayColor="#00000077" // optional
          resetFocusTimeout={0}
          resetFocusWhenMotionDetected={false}
        />
      )}
      {!isLoading && (
        <Flex
          width="100%"
          justify="center"
          items="center"
          padding={{
            paddingHorizontal: spacing.large,
          }}
          position={{
            bottom: 40,
          }}>
          <Pressable
            onPress={onPressScanned}
            padding={spacing.small}
            borderRadius={80}
            backgroundColor={'rgba(255,255,255,0.5)'}>
            <Flex
              width={70}
              borderRadius={35}
              backgroundColor={pallate.neutral['01']}
              height={70}
            />
          </Pressable>
        </Flex>
      )}
    </Container>
  );
};

export default Scan;
