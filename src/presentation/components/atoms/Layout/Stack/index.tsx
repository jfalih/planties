import React, {Ref, useMemo} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import Flex, {FlexProps} from '../Flex';
import Divider from '../Divider';
import {getValidChildren} from '../helper';
import Animated from 'react-native-reanimated';

export interface StackProps extends FlexProps {
  /**
   * The spacing between items in the stack.
   *
   * @default 0
   */
  spacing?: number;

  /**
   * If `true`, each stack item will show a divider.
   *
   * @default false
   */
  divider?: React.ReactElement | boolean;

  /**
   * A style object to apply to each divider.
   */
  dividerStyle?: StyleProp<ViewStyle>;

  /**
   * If `true`, the children will be wrapped in a `Box` and the `Box` will take the spacing properties.
   *
   * @default false
   */
  shouldWrapChildren?: boolean;
}

const Stack = React.forwardRef(
  (
    {divider = false, dividerStyle, spacing, ...rest}: StackProps,
    ref: Ref<View>,
  ) => {
    const direction = useMemo(() => {
      return rest.inline ? 'row' : rest.direction || 'column';
    }, [rest.inline, rest.direction]);

    const validChildren = getValidChildren(rest.children);

    const clones = validChildren.map(
      (child: React.ReactElement, index: number) => {
        const key = typeof child.key !== 'undefined' ? child.key : index;
        const isLast = index + 1 === validChildren.length;

        if (!divider && !spacing) {
          return child;
        }

        const dividerElement = React.isValidElement(divider) ? (
          divider
        ) : (
          <Divider
            thickness={spacing}
            horizontal={direction === 'row' || direction === 'row-reverse'}
          />
        );

        const clonedDivider = React.cloneElement(dividerElement, {
          key: `${key}-divider`,
          style: [dividerElement.props.style, dividerStyle],
        });

        const _divider = isLast ? null : clonedDivider;

        return [child, _divider];
      },
    );

    return (
      <Flex ref={ref} {...rest}>
        {clones}
      </Flex>
    );
  },
);

export default React.memo(Stack);

export interface HStackProps extends Omit<StackProps, 'inline' | 'direction'> {
  reverse?: boolean;
}

export const HStack = React.memo(
  React.forwardRef((props: HStackProps, ref: Ref<View>) => {
    const {reverse, ...rest} = props;
    return (
      <Stack ref={ref} {...rest} direction={reverse ? 'row-reverse' : 'row'} />
    );
  }),
);

export const HStackAnimated = Animated.createAnimatedComponent(HStack);

export interface VStackProps extends Omit<StackProps, 'inline' | 'direction'> {
  reverse?: boolean;
}

export const VStack = React.memo(
  React.forwardRef((props: VStackProps, ref: Ref<View>) => {
    const {reverse, ...rest} = props;
    return (
      <Stack
        ref={ref}
        {...rest}
        direction={reverse ? 'column-reverse' : 'column'}
      />
    );
  }),
);

export const VStackAnimated = Animated.createAnimatedComponent(VStack);
