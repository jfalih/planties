import React, {useMemo} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Flex, {FlexProps} from '../Flex';
import Divider from '../Divider';
import {getValidChildren} from '../helper';

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

const Stack: React.FC<StackProps> = ({
  divider = false,
  dividerStyle,
  ...rest
}) => {
  const direction = useMemo(() => {
    return rest.inline ? 'row' : rest.direction || 'column';
  }, [rest.inline, rest.direction]);

  const validChildren = getValidChildren(rest.children);

  const clones = !divider
    ? validChildren
    : validChildren.map((child: React.ReactElement, index: number) => {
        const key = typeof child.key !== 'undefined' ? child.key : index;
        const isLast = index + 1 === validChildren.length;

        if (!divider) {
          return child;
        }

        const dividerElement = React.isValidElement(divider) ? (
          divider
        ) : (
          <Divider
            orientation={
              direction === 'row' || direction === 'row-reverse'
                ? 'vertical'
                : 'horizontal'
            }
          />
        );

        const clonedDivider = React.cloneElement(dividerElement, {
          key: `${key}-divider`,
          style: [dividerElement.props.style, dividerStyle],
        });

        const _divider = isLast ? null : clonedDivider;

        return [child, _divider];
      });

  return <Flex {...rest}>{clones}</Flex>;
};

export default Stack;

export interface HStackProps extends Omit<StackProps, 'inline' | 'direction'> {
  reverse?: boolean;
}

export const HStack: React.FC<HStackProps> = ({reverse, ...rest}) => {
  return <Stack {...rest} direction={reverse ? 'row-reverse' : 'row'} />;
};

export interface VStackProps extends Omit<StackProps, 'inline' | 'direction'> {
  reverse?: boolean;
}

export const VStack: React.FC<VStackProps> = ({reverse, ...rest}) => {
  return <Stack {...rest} direction={reverse ? 'column-reverse' : 'column'} />;
};
