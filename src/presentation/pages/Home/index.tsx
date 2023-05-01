import React from 'react';
import Navbar from '../../components/molecules/Navbar/Default';
import {useTheme} from '../../../services/context/Theme/Theme.context';
import Welcome from '../../components/organisms/Welcome';
import Container from '../../components/organisms/Container';
import Section from '../../components/organisms/Section';

const Home = () => {
  const {pallate, spacing} = useTheme();
  return (
    <Container
      spacing={spacing.large}
      navbar={{
        title: 'Halo Jan Falih',
        avatarSource: {
          uri: 'https://images.unsplash.com/photo-1682616323196-8a4df1e30151?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        },
      }}>
      <Welcome
        title="Selamat Pagi!"
        description="Lorem Ipsum Dolor"
        onPressAddPlant={() => {}}
        onPressScan={() => {}}
        gardens={[]}
      />
      <Section />
      <Section />
    </Container>
  );
};

export default Home;
