import React from 'react';
import {
  Platform,
  Pressable as RNPressable,
  PressableProps as RNPressableProps,
  ViewStyle,
} from 'react-native';
import {Flex} from '../Layout';
import {FlexProps} from '../Layout/Flex';

type PressableContainer = Omit<FlexProps, 'as'> & RNPressableProps;
export interface PressableProps extends PressableContainer {
  androidRipple?: PressableProps['android_ripple'];
  androidDisableSound?: boolean;
  shrink?: boolean;
  containerStyle?: ViewStyle;
  style?: ViewStyle;
}

const Pressable: React.FC<PressableProps> = props => {
  const {
    androidRipple,
    androidDisableSound,
    shrink,
    containerStyle,
    style,
    ...rest
  } = props;
  return (
    <Flex
      style={containerStyle}
      self="flex-start"
      as={
        <RNPressable
          android_disableSound={androidDisableSound}
          android_ripple={androidRipple}
          style={({pressed}) => [
            {
              ...Platform.select({
                ios: {
                  opacity: pressed ? 0.2 : 1,
                },
              }),
              transform: [{scale: pressed && shrink ? 0.9 : 1}],
            },
            style as ViewStyle,
          ]}
        />
      }
      {...rest}
    />
  );
};

export default Pressable;
