import React, {Ref, useMemo} from 'react';
import Image, {ImageProps} from '../Image';
import {View} from 'react-native/types';
import Animated from 'react-native-reanimated';
import {moderateScale} from '../../../../core/utils/scale';

type SizeType = 'small' | 'medium' | 'large';

interface AvatarProps extends ImageProps {
  size?: SizeType;
  rounded?: boolean;
}
const Avatar = React.memo(
  React.forwardRef((props: AvatarProps, ref: Ref<View>) => {
    const {size = 'medium', height, rounded, borderRadius, ...rest} = props;

    const sizeStyle = useMemo(() => {
      let sizeTranslator;
      switch (size) {
        case 'medium':
          sizeTranslator = {
            width: moderateScale(34),
            height: moderateScale(34),
          };
          break;
        case 'large':
          sizeTranslator = {
            width: moderateScale(50),
            height: moderateScale(50),
          };
          break;
        default:
          sizeTranslator = {
            width: moderateScale(22),
            height: moderateScale(2),
          };
          break;
      }
      return sizeTranslator;
    }, [size]);

    return (
      <Image
        ref={ref}
        width={sizeStyle.width}
        height={sizeStyle.height}
        borderRadius={rounded ? height || sizeStyle.height / 2 : borderRadius}
        {...rest}
      />
    );
  }),
);

export const AvatarAnimated = Animated.createAnimatedComponent(Avatar);
export default Avatar;
