import React from 'react';
import {HStack, VStack} from '../../atoms/Layout/Stack';
import Pressable from '../../atoms/Pressable';
import Text from '../../atoms/Text';
import {Dimensions} from 'react-native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const BottomTabBar = props => {
  const {state, descriptors, cart, theme, navigation} = props;
  const {pallate, spacing} = theme;
  const {width} = Dimensions.get('window');
  return (
    <VStack
      position={{
        bottom: 10,
        left: spacing.standard,
      }}>
      {cart?.length && (
        <Pressable
          fill
          backgroundColor={pallate.primary['04']}
          self="stretch"
          items="center"
          margin={{
            marginBottom: -30,
          }}
          borderRadius={{
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
          padding={{
            paddingHorizontal: spacing.large,
            paddingBottom: spacing.medium * 2,
            paddingTop: spacing.standard,
          }}>
          <VStack fill>
            <Text type="title" weight="06" color={pallate.neutral['01']}>
              20 Item
            </Text>
            <Text
              color={pallate.neutral['01']}
              numberOfLines={1}
              type="body"
              weight="02">
              Lorem, ipsum, dolor, sit, amet
            </Text>
          </VStack>
          <Text type="title" weight="04" color={pallate.neutral['01']}>
            Rp100.000
          </Text>
        </Pressable>
      )}
      <HStack
        style={{
          display:
            getFocusedRouteNameFromRoute(props) == 'Scan' ? 'none' : 'flex',
          shadowColor: pallate.neutral['03'],
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.16,
          shadowRadius: 1.51,
          elevation: 2,
        }}
        padding={spacing.standard}
        borderRadius={50}
        items="center"
        width={width - spacing.standard * 2}
        backgroundColor={pallate.neutral['01']}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const {
            tabBarIcon,
            tabBarTestID,
            tabBarAccessibilityLabel,
            tabBarLabel,
            title,
          } = options || {};

          const label =
            tabBarLabel !== undefined
              ? tabBarLabel
              : title !== undefined
              ? title
              : route.name;
          const isFocused = state.index === index;

          const iconComp = () => {
            if (typeof tabBarIcon === 'undefined') {
              return null;
            }

            return tabBarIcon({
              focused: isFocused,
              color: isFocused ? pallate.primary['03'] : pallate.neutral['04'],
              size: 26,
            });
          };

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          if (tabBarLabel === 'QR') {
            return (
              <Pressable
                key={route.key}
                margin={{
                  marginHorizontal: spacing.small,
                }}
                height={44}
                width={44}
                items="center"
                justify="center"
                borderRadius={22}
                onPress={onPress}
                onLongPress={onLongPress}
                backgroundColor={pallate.primary['03']}>
                {tabBarIcon({
                  focused: isFocused,
                  color: pallate.neutral['01'],
                  size: 26,
                })}
              </Pressable>
            );
          }

          return (
            <Pressable
              key={route.key}
              fill
              direction="column"
              items="center"
              justify="center"
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={tabBarAccessibilityLabel}
              testID={tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}>
              {iconComp()}
              <Text
                color={
                  isFocused ? pallate.primary['03'] : pallate.neutral['04']
                }
                type="caption"
                weight={isFocused ? 'tabItem' : '01'}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </HStack>
    </VStack>
  );
};
export default BottomTabBar;
