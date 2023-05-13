import React, {useCallback, useMemo, useRef, useState} from 'react';
import Container from '../../../components/organisms/Container';
import Text from '../../../components/atoms/Text';
import {HStack, VStack} from '../../../components/atoms/Layout/Stack';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import Pressable from '../../../components/atoms/Pressable';
import Icon from '../../../components/atoms/Icon';
import Button from '../../../components/atoms/Button';
import {Flex} from '../../../components/atoms/Layout';
import Card from '../../../components/molecules/Card';
import {Platform, TextInput} from 'react-native';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import {useAuth} from '../../../../services/context/Auth/Auth.context';
import Input from '../../../components/atoms/Input';
import {Toast} from 'react-native-toast-message';

const AddPlant = () => {
  const {spacing, pallate, typography} = useTheme();
  const textInputRef = useRef<TextInput>();
  const [isEdit, setIsEdit] = useState(false);
  const {user} = useAuth();
  const [images, setImages] = useState<string[]>([]);

  const onPressLibrary = useCallback(async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
      });
      if (result?.assets) {
        const {uri, fileName} = result.assets[0];
        const ref = storage().ref(fileName);
        if (uri) {
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
        text2: e?.message || 'Server sedang sibuk...',
      });
    }
  }, [images]);
  const plants = undefined;

  const onClickEdit = useCallback(() => {
    setIsEdit(true);
    textInputRef.current?.focus();
  }, []);

  const Trailing = useMemo(() => {
    return (
      <Pressable
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
  }, [pallate.neutral, pallate.primary, spacing.standard, spacing.tiny]);
  return (
    <Container
      navbar={{
        type: 'back',
        title: 'Tambah Tanaman',
        trailing: Trailing,
      }}
      scrollable
      spacing={spacing.large}
      padding={spacing.large}>
      <Input
        icon={{
          name: 'IconPlant',
          color: pallate.neutral['05'],
          size: 20,
        }}
        backgroundColor={pallate.neutral['01']}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Nama Tanaman"
      />
      <Text type="title" weight="03">
        Status
      </Text>
      <Flex wrap></Flex>
    </Container>
  );
};

export default AddPlant;
