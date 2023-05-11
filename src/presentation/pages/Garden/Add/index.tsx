import React, {useCallback, useRef, useState} from 'react';
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

const AddGarden = () => {
  const {spacing, pallate, typography} = useTheme();
  const textInputRef = useRef<TextInput>();
  const [image, setImage] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState('Halaman Depan');
  const {user} = useAuth();
  const plants = undefined;
  const onPressLibrary = useCallback(async () => {
    launchImageLibrary({
      mediaType: 'photo',
    })
      .then(res => {})
      .catch(e => {});
  }, []);

  const onClickEdit = useCallback(() => {
    setIsEdit(true);
    textInputRef.current?.focus();
  }, []);

  return (
    <Container
      navbar={{
        type: 'back',
        title: 'Tambah Kebun',
      }}
      scrollable
      spacing={spacing.large}
      padding={spacing.large}>
      <HStack>
        <Flex
          fill
          as={
            isEdit ? (
              <TextInput
                style={{
                  ...typography.title['03'],
                }}
                ref={textInputRef}
                onChangeText={val => setValue(val)}
                value={value}
                autoFocus
              />
            ) : (
              <Text type="title" weight="03">
                {value}
              </Text>
            )
          }
        />
        <Pressable onPress={onClickEdit} self="center">
          <Icon size={24} color={pallate.neutral['05']} name={'IconPencil'} />
        </Pressable>
      </HStack>
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
          trailing={
            <Icon
              size={16}
              color={pallate.neutral['05']}
              name={'IconChevronDown'}
            />
          }
        />
      </HStack>
      <Text type="title" weight="03">
        Tanaman
      </Text>
      <Flex justify="space-between" wrap>
        {plants?.data?.data.map(val => (
          <Card
            type="plant"
            margin={{
              marginBottom: spacing.large,
            }}
            source={{
              uri: val.image,
            }}
            name={val.name}
          />
        ))}
        <Pressable
          backgroundColor={pallate.neutral['03']}
          borderRadius={12}
          width={111}
          height={154}>
          <VStack spacing={spacing.small} fill items="center" justify="center">
            <Icon name="IconPlus" size={32} color={pallate.neutral['05']} />
            <Text
              align="center"
              color={pallate.neutral['05']}
              type="title"
              weight="06">
              Tambah Tanaman
            </Text>
          </VStack>
        </Pressable>
      </Flex>
      <Text type="title" weight="03">
        Gallery
      </Text>
      <Flex justify="space-between" wrap>
        {plants?.data?.data.map(val => (
          <Card
            type="plant"
            margin={{
              marginBottom: spacing.large,
            }}
            source={{
              uri: val.image,
            }}
            name={val.name}
          />
        ))}
        <Pressable
          onPress={onPressLibrary}
          backgroundColor={pallate.neutral['03']}
          borderRadius={12}
          width={111}
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
      </Flex>
    </Container>
  );
};

export default AddGarden;
