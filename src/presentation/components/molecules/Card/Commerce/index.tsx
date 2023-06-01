import React from 'react';
import Pressable, {PressableProps} from '../../../atoms/Pressable';
import Image, {ImageProps} from '../../../atoms/Image';
import {useTheme} from '../../../../../services/context/Theme/Theme.context';
import Text from '../../../atoms/Text';
import {HStack, VStack} from '../../../atoms/Layout/Stack';
import Button from '../../../atoms/Button';
import Icon from '../../../atoms/Icon';
import currency from '../../../../../core/utils/currency';

export interface CommerceProps extends PressableProps {
  title: string;
  price: number;
  isWishlist: boolean;
  source: ImageProps['source'];
  onPressAddToCart: () => void;
  onPressAddToWishlist: () => void;
}
const Commerce = (props: CommerceProps) => {
  const {pallate, spacing} = useTheme();
  const {
    source,
    title,
    price,
    isWishlist,
    onPressAddToCart,
    onPressAddToWishlist,
    ...rest
  } = props;
  return (
    <Pressable width={156} direction="column" {...rest}>
      <VStack borderRadius={20} backgroundColor={pallate.neutral['01']}>
        <VStack>
          <Image
            backgroundColor={pallate.neutral['03']}
            source={source}
            width={'100%'}
            aspectRatio={3 / 4}
            borderRadius={20}
          />
          <HStack
            fill
            spacing={spacing.tiny}
            padding={spacing.standard}
            position={{
              bottom: 0,
            }}>
            <Button
              fill
              onPress={onPressAddToCart}
              items="center"
              borderRadius={10}
              padding={{paddingHorizontal: spacing.small}}
              spacing={spacing.tiny}
              height={30}
              backgroundColor={pallate.neutral['01']}
              icon={{
                name: 'IconShoppingBag',
                size: 14,
                color: pallate.neutral['05'],
              }}
              text={{
                text: 'add to cart',
                type: 'body',
                weight: '02',
              }}
            />
            <Pressable
              width={30}
              height={30}
              onPress={onPressAddToWishlist}
              items="center"
              justify="center"
              borderRadius={12}
              backgroundColor={pallate.neutral['05']}>
              <Icon
                fill={isWishlist ? pallate.neutral['01'] : 'none'}
                name={'IconHeart'}
                size={14}
                color={pallate.neutral['01']}
              />
            </Pressable>
          </HStack>
        </VStack>
        <VStack spacing={spacing.standard} padding={spacing.standard}>
          <Text type="title" weight="05" text={title} />
          <VStack>
            <Text type="body" weight="01" text={currency(price)} />
            <Text
              type="body"
              color={pallate.danger['03']}
              strikethrough
              weight="02"
              text="500.000 IDR"
            />
          </VStack>
        </VStack>
      </VStack>
    </Pressable>
  );
};

export default Commerce;
