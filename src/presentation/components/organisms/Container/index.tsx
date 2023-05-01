import React from 'react';
import {
  ScrollView,
  ScrollViewProps,
  StatusBar,
  StatusBarProps,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Navbar from '../../molecules/Navbar';
import {NavbarProps} from '../../molecules/Navbar';
import {StackProps, VStack} from '../../atoms/Layout/Stack';
import {useTheme} from '../../../../services/context/Theme/Theme.context';

type ContainerType = StackProps & ScrollViewProps;

interface ContainerProps extends ContainerType {
  statusBar?: StatusBarProps;
  navbar?: NavbarProps;
  scrollable?: boolean;
}

const Container = (props: ContainerProps) => {
  const {statusBar, navbar, scrollable, ...rest} = props;
  const {pallate} = useTheme();
  return (
    <VStack backgroundColor={pallate.neutral['02']} fill as={<SafeAreaView />}>
      {statusBar && <StatusBar {...statusBar} />}
      {navbar && <Navbar {...navbar} />}
      <VStack fill as={<ScrollView scrollEnabled={scrollable} />} {...rest} />
    </VStack>
  );
};

export default Container;
