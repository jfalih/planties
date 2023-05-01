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

interface TextProps extends RNTextProps {
  fill?: boolean;
  type?: TypographyType;
  weight?: TypographyWeight;
  strikethrough?: boolean;
  underline?: boolean;
  text?: string;
  color?: TextStyle['color'];
  underlineThrough?: boolean;
}

const Text: React.FC<TextProps> = props => {
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
    ...rest
  } = props;
  const {typography} = useTheme();

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
      color,
      textDecorationLine,
    };
  }, [typography, type, weight, fill, color, textDecorationLine]);

  return (
    <RNText style={[textStyle, style]} {...rest}>
      {text || rest.children}
    </RNText>
  );
};

export default React.memo(Text);
