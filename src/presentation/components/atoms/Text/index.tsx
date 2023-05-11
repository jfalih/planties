import React, {useMemo} from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native';
import {
  TypographyType,
  TypographyWeight,
} from '../../../../services/context/Theme/Theme.types';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import Animated from 'react-native-reanimated';

export interface TextProps extends RNTextProps {
  fill?: boolean;
  type?: TypographyType;
  weight?: TypographyWeight;
  strikethrough?: boolean;
  underline?: boolean;
  text?: string;
  color?: TextStyle['color'];
  align?: TextStyle['textAlign'];
  underlineThrough?: boolean;
}

const Text: React.FC<TextProps> = React.memo(
  React.forwardRef((props, ref) => {
    const {
      fill,
      type = 'body',
      weight = '01',
      strikethrough,
      underline,
      underlineThrough,
      color,
      text,
      style,
      align,
      ...rest
    } = props;
    const {typography, pallate} = useTheme();

    const textDecorationLine: TextStyle['textDecorationLine'] = useMemo(() => {
      if (strikethrough) {
        return 'line-through';
      } else if (underline) {
        return 'underline';
      } else if (underlineThrough) {
        return 'underline line-through';
      }
      return 'none';
    }, [strikethrough, underline, underlineThrough]);

    const textStyle: TextStyle = useMemo(() => {
      return {
        ...typography[type][weight],
        flex: fill ? 1 : undefined,
        color: color || pallate.neutral['05'],
        textDecorationLine,
        textAlign: align,
      };
    }, [
      typography,
      pallate,
      align,
      type,
      weight,
      fill,
      color,
      textDecorationLine,
    ]);

    return (
      <RNText ref={ref} style={[textStyle, style]} {...rest}>
        {text || rest.children}
      </RNText>
    );
  }),
);

export default Text;

export const TextAnimated = Animated.createAnimatedComponent(Text);
