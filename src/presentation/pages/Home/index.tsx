import React from 'react';
import {VStack} from '../../components/atoms/Layout/Stack';
import Navbar from '../../components/molecules/Navbar';
import {useTheme} from '../../../services/context/Theme/Theme.context';
import Welcome from '../../components/molecules/Welcome';

const Home = () => {
  const {pallate} = useTheme();
  return (
    <VStack backgroundColor={pallate.neutral['02']}>
      <Navbar />
      <Welcome />
    </VStack>
  );
};

export default Home;
