import React, {useMemo} from 'react';
import {ScrollContext} from './Scroll.context';
import {SharedValue, useSharedValue} from 'react-native-reanimated';

export interface ScrollProviderProps {
  contentOffset?: {
    y: SharedValue<number>;
    x: SharedValue<number>;
  };
  children?: React.ReactNode;
}

export const ScrollProvider: React.FC<ScrollProviderProps> = props => {
  const {contentOffset, children} = props;
  const translationY = useSharedValue(0);
  const translationX = useSharedValue(0);

  const offset = useMemo(() => {
    console.log(contentOffset);
    if (contentOffset) {
      return contentOffset;
    }

    return {
      y: translationY,
      x: translationX,
    };
  }, [contentOffset, translationX, translationY]);
  return (
    <ScrollContext.Provider
      value={{
        contentOffset: offset,
      }}>
      {children}
    </ScrollContext.Provider>
  );
};
