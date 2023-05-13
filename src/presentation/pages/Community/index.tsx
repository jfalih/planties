import React from 'react';
import Container from '../../components/organisms/Container';
import {HStack, VStack} from '../../components/atoms/Layout/Stack';
import Image from '../../components/atoms/Image';
import {useTheme} from '../../../services/context/Theme/Theme.context';
import Text from '../../components/atoms/Text';
import Pressable from '../../components/atoms/Pressable';
import Icon from '../../components/atoms/Icon';
import Divider from '../../components/atoms/Layout/Divider';
import {Box} from '../../components/atoms/Layout';
import usePost from '../../../core/apis/Community/usePost';
import {FlashList} from '@shopify/flash-list';
import currency from '../../../core/utils/currency';

// TODO: Change this to another component
const Post = props => {
  const {
    content,
    comments,
    likes,
    image,
    name,
    communityImg,
    profileImg,
    communityName,
    username,
    watchers,
  } = props;
  const {pallate, spacing} = useTheme();
  return (
    <VStack
      padding={{
        paddingVertical: spacing.large,
      }}
      spacing={spacing.small}>
      <HStack
        padding={{
          paddingLeft: spacing.extraLarge,
        }}
        items="center"
        spacing={spacing.small}>
        <Box
          margin={{
            marginBottom: -8,
          }}>
          <Icon
            name="IconCornerLeftDown"
            size={18}
            color={pallate.neutral['04']}
          />
        </Box>
        <Text>from</Text>
        <Image
          width={22}
          height={22}
          borderRadius={28}
          source={{
            uri: communityImg,
          }}
        />
        <Text type="title" weight="06">
          {communityName}
        </Text>
      </HStack>
      <HStack spacing={spacing.standard}>
        <Image
          width={56}
          height={56}
          borderWidth={1}
          borderColor={pallate.neutral['03']}
          borderRadius={28}
          source={{
            uri: profileImg,
          }}
        />
        <VStack fill spacing={spacing.standard}>
          <VStack>
            <HStack spacing={spacing.tiny} items="center">
              <Text type="button" weight="02">
                {name}
              </Text>
              <Text>@{username}</Text>
            </HStack>
            <Text>{content}</Text>
          </VStack>
          {image && (
            <Image
              width="100%"
              height={378}
              borderRadius={16}
              resizeMode="cover"
              source={{
                uri: image,
              }}
              backgroundColor={pallate.neutral['03']}
            />
          )}
          <HStack spacing={spacing.extraLarge * 2} fill>
            <Pressable self="center" items="center">
              <Icon
                name="IconMessageCircle2"
                size={18}
                color={pallate.neutral['05']}
              />
              <Divider horizontal thickness={spacing.tiny} />
              <Text>{currency(comments, {symbol: ''})}</Text>
            </Pressable>
            <Pressable self="center" items="center">
              <Icon name="IconHeart" size={18} color={pallate.neutral['05']} />
              <Divider horizontal thickness={spacing.tiny} />
              <Text>{currency(likes, {symbol: ''})}</Text>
            </Pressable>
            <Pressable self="center" items="center">
              <Icon
                name="IconChartBar"
                size={18}
                color={pallate.neutral['05']}
              />
              <Divider horizontal thickness={spacing.tiny} />
              <Text>{currency(watchers, {symbol: ''})}</Text>
            </Pressable>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
};
const Community = () => {
  const {spacing, pallate} = useTheme();
  const {data: posts} = usePost();
  return (
    <Container
      navbar={{
        type: 'sidebar',
        title: 'Community',
      }}
      divider={<Divider color={pallate.neutral['03']} thickness={2} />}
      padding={spacing.large}
      scrollable>
      <FlashList
        scrollEnabled={false}
        estimatedItemSize={300}
        data={posts}
        extraData={posts}
        renderItem={({item}) => <Post {...item} />}
      />
    </Container>
  );
};

export default Community;
