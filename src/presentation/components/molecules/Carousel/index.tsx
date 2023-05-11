import React, {useCallback, useEffect, useRef, useState} from 'react';
import PagerView, {PagerViewProps} from 'react-native-pager-view';
import Pressable from '../../atoms/Pressable';
import Image from '../../atoms/Image';
import {HStack} from '../../atoms/Layout/Stack';
import {Box, Flex} from '../../atoms/Layout';
import {useTheme} from '../../../../services/context/Theme/Theme.context';
import {StyleSheet, useWindowDimensions} from 'react-native';
import Text from '../../atoms/Text';

interface CarouselProps extends PagerViewProps {
  data: [];
  isDetail?: boolean;
  autoSlide: boolean;
}

const Carousel = (props: CarouselProps) => {
  const {data, height = 260, isDetail, autoSlide = true, style} = props;
  const {pallate, spacing} = useTheme();
  const [page, setPage] = useState(0);
  const pageViewRef = useRef();
  const {width} = useWindowDimensions();
  const timeout = useRef<number>();
  const stopAutoSlide = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }, []);

  const startAutoSlide = useCallback(() => {
    if (data.length > 1 && autoSlide) {
      timeout.current = setTimeout(() => {
        if (page < data.length - 1) {
          pageViewRef.current?.setPage(page + 1);
        } else {
          pageViewRef.current?.setPage(0);
        }
      }, 3000);
    }
  }, [autoSlide, data.length, page]);

  useEffect(() => {
    startAutoSlide();
    return () => {
      stopAutoSlide();
    };
  }, [startAutoSlide, stopAutoSlide]);
  return (
    <Box>
      <PagerView
        ref={pageViewRef}
        style={carouselStyle.image}
        onPageSelected={e => setPage(e.nativeEvent.position)}
        scrollEnabled>
        {data.map((val, index) => (
          <Flex key={index}>
            <Pressable shrink={false}>
              <Image
                source={{uri: val.image}}
                resize="cover"
                style={[carouselStyle.image, style]}
              />
            </Pressable>
          </Flex>
        ))}
      </PagerView>
      {isDetail ? (
        <HStack
          spacing={spacing.small}
          padding={{
            paddingVertical: spacing.small,
            paddingHorizontal: spacing.standard,
          }}
          borderRadius={20}
          backgroundColor={pallate.neutral['01']}
          position={{
            bottom: 20,
            left: spacing.large,
          }}>
          <Text type="body" weight="02">
            {page + 1}/{data.length}
          </Text>
        </HStack>
      ) : (
        <HStack
          spacing={spacing.small}
          position={{
            bottom: 40,
            left: spacing.large,
          }}>
          {data.map((val, index) => (
            <Box
              backgroundColor={
                page === index ? pallate.neutral['05'] : pallate.neutral['03']
              }
              height={3}
              borderRadius={1}
              width={page === index ? 32 : 14}
            />
          ))}
        </HStack>
      )}
    </Box>
  );
};

const carouselStyle = StyleSheet.create({
  image: {height: 'auto', width: '100%', aspectRatio: 3 / 2},
});
export default Carousel;
