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
  type?: TypographyType;
  weight?: TypographyWeight;
  strikethrough?: boolean;
  underline?: boolean;
  color?: TextStyle['color'];
  underlineThrough?: boolean;
}

const Text: React.FC<TextProps> = props => {
  const {
    type = 'body',
    weight = '02',
    strikethrough,
    underline,
    underlineThrough,
    color,
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
      color,
      textDecorationLine,
    };
  }, [type, color, typography, textDecorationLine, weight]);

  return <RNText style={[textStyle, style]} {...rest} />;
};

export default React.memo(Text);
