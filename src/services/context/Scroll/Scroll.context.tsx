import {createContext, useContext} from 'react';
import {SharedValue} from 'react-native-reanimated';

export interface Scroll {
  contentOffset: {
    y: SharedValue<number>;
    x: SharedValue<number>;
  };
}

export const ScrollContext = createContext<Scroll>({
  contentOffset: {
    y: {
      value: 0,
    },
    x: {
      value: 0,
    },
  },
});

export const useScroll = () => useContext(ScrollContext);
