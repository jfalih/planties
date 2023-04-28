import React, {useCallback, useImperativeHandle, useState} from 'react';
import {TextInput, TextInputProps} from 'react-native';
import {Box, Flex} from '../Layout';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../core/utils/scale';
import Icon, {IconProps} from '../Icon';
import {FlexAnimated} from '../Layout/Flex';
import {FadeIn, FadeInDown, FadeInUp} from 'react-native-reanimated';

interface SearchBarProps extends TextInputProps {
  icon?: IconProps;
  leading?: JSX.Element;
  trailing?: JSX.Element;
}

const SearchBar = React.memo(
  React.forwardRef((props: SearchBarProps, ref) => {
    const {pallate, typography, spacing} = useTheme();
    const {
      leading,
      trailing,
      placeholder = 'Cari yang kamu mau disini..',
      value,
      onChangeText,
      icon,
      ...rest
    } = props;

    const [val, setVal] = useState(value);

    const onChangeTextCustomize = useCallback(
      (newVal: string) => {
        setVal(newVal);
        onChangeText?.(newVal);
      },
      [onChangeText],
    );

    const clearValue = useCallback(() => {
      setVal('');
      onChangeText?.('');
    }, [onChangeText]);

    useImperativeHandle(
      ref,
      () => ({
        value: () => val,
        onChangeText: (newVal: string) => onChangeTextCustomize(newVal),
        clearValue,
      }),
      [clearValue, onChangeTextCustomize, val],
    );

    return (
      <FlexAnimated
        entering={FadeInDown.duration(1500).delay(300)}
        position={{set: 'relative'}}>
        <Flex
          fill
          borderRadius={moderateScale(15)}
          padding={{
            paddingLeft:
              (leading || icon) && horizontalScale(spacing.large * 2),
            paddingRight: trailing && horizontalScale(spacing.large * 2),
          }}
          height={42}
          as={
            <TextInput
              style={{
                ...typography.subtitles['02'],
              }}
              onChangeText={onChangeTextCustomize}
              value={value}
              inputMode="search"
              numberOfLines={1}
              returnKeyLabel="search"
              returnKeyType="search"
              placeholderTextColor={pallate.neutral['03']}
              placeholder={placeholder}
            />
          }
          backgroundColor={pallate.neutral['01']}
          {...rest}
        />
        {(leading || icon) && (
          <Box
            backgroundColor={'transparent'}
            position={{
              left: horizontalScale(spacing.standard),
              top: icon && moderateScale(42) / 2 - moderateScale(icon.size / 2),
            }}>
            {icon ? (
              <Icon name={icon.name} size={icon.size} color={icon.color} />
            ) : (
              leading
            )}
          </Box>
        )}
        {trailing && (
          <Box
            as={trailing}
            position={{
              right: horizontalScale(spacing.standard),
              top: verticalScale(42 / 2 - 18 / 2),
            }}
          />
        )}
      </FlexAnimated>
    );
  }),
);

export default SearchBar;
