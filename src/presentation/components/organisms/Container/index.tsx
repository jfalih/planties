import React from 'react';
import {ScrollViewProps, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaViewProps} from 'react-native-safe-area-context';
import Navbar from '../../molecules/Navbar';
import {StackProps, VStack} from '../../atoms/Layout/Stack';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import Divider from '../../atoms/Layout/Divider';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {ScrollProvider} from '../../../../services/context/Scroll/Scroll.provider';

type ContainerType = StackProps & ScrollViewProps;

interface ContainerProps extends ContainerType {
  navbar?: React.ComponentProps<typeof Navbar>;
  scrollable?: boolean;
  edges?: SafeAreaViewProps['edges'];
}

const Container = (props: ContainerProps) => {
  const {navbar, edges, scrollable, children, ...rest} = props;
  const {pallate, spacing} = useTheme();
  const translationY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translationY.value = event.contentOffset.y;
  });

  return (
    <VStack
      backgroundColor={pallate.neutral['02']}
      fill
      as={<SafeAreaView edges={edges} />}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={pallate.neutral['01']}
      />
      <ScrollProvider
        contentOffset={{
          y: translationY,
          x: {
            value: 0,
          },
        }}>
        {navbar && <Navbar {...navbar} />}
        <VStack
          fill
          as={
            scrollable ? (
              <Animated.ScrollView
                onScroll={scrollHandler}
                scrollEventThrottle={16}
              />
            ) : undefined
          }
          {...rest}>
          {children}
          {scrollable && <Divider thickness={spacing.large * 4} />}
        </VStack>
      </ScrollProvider>
    </VStack>
  );
};

export default Container;
