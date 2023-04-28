//TODO: Add Image Components
import React, {Ref} from 'react';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import Flex, {FlexProps} from '../Layout/Flex';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import {View} from 'react-native/types';

type ImageType = FastImageProps & FlexProps;
export interface ImageProps extends ImageType {
  src?: FastImageProps['source'];
  defaultSrc?: FastImageProps['defaultSource'];
  resize?: FastImageProps['resizeMode'];
}

const Image = React.memo(
  React.forwardRef((props: ImageProps, ref: Ref<View>) => {
    const {src, resize, defaultSrc, ...rest} = props;
    const {pallate} = useTheme();
    return (
      <Flex
        ref={ref}
        backgroundColor={pallate.neutral['02']}
        as={
          <FastImage
            defaultSource={defaultSrc}
            source={src}
            resizeMode={resize}
          />
        }
        {...rest}
      />
    );
  }),
);

export default Image;
