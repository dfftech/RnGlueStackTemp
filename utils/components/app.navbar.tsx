/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Dimensions, Platform, TouchableOpacity, Animated } from 'react-native';
import * as icons from 'lucide-react-native';
import { LucideIcon, Home, Search, Menu, User, Settings } from 'lucide-react-native';

// Define the type for icon names based on lucide-react-native exports
type IconName = keyof typeof icons;

const { height, width } = Dimensions.get('window');

const SLIDER_POSITIONS = [
  (2 * 1 - 1) * ((1 * (width / 5)) / 2) + 85,
  (2 * 5 - 1) * ((1 * (width / 5)) / 2) + 86,
];

// Default icons for fallback
const defaultIcons: LucideIcon[] = [Home, Search, Menu, User, Settings];

interface AppNavBarProps {
  selected?: number;
  iconColor?: string;
  navColor?: string;
  selectedIconColor?: string;
  mainOffSetAndroid?: number;
  cb?: (id: number) => void;
  icons?: IconName[];
}

interface NavBarState {
  iconColor: string;
  primColor: string;
  selectedIconColor: string;
  yoffset: number;
  iconSize: number;
  selected: number;
  sliderPosition: Animated.Value;
  animatedValues: {
    [key: number]: {
      id: Animated.Value; // Secondary opacity
      h: Animated.Value; // Secondary translateY
      i: Animated.Value; // Primary opacity
      hh: Animated.Value; // Primary translateY
    };
  };
  icons: LucideIcon[];
}

const AppNavBar: React.FC<AppNavBarProps> = ({
  selected = 1,
  iconColor = 'black',
  navColor = '#4687FD',
  selectedIconColor = 'white',
  mainOffSetAndroid = 0,
  cb,
  icons: iconNames,
}) => {
  console.log('AppNavBar loaded, version: f0a1b2c3-d4e5-6f78-9012-3456789abcde (June 11, 2025, 11:06 AM IST)');

  const [state, setState] = useState<NavBarState>(() => {
    console.log('Initializing state with selected:', selected);
    // Map icon names to lucide-react-native icons, falling back to defaultIcons if not provided
    const resolvedIcons = iconNames
      ? iconNames.map((name, index) => {
        const IconComponent = icons[name] as LucideIcon;
        if (!IconComponent) {
          console.warn(`Icon "${name}" not found. Falling back to default icon at index ${index}.`);
          return defaultIcons[index] || Home;
        }
        return IconComponent;
      })
      : defaultIcons;

    const initialState: NavBarState = {
      iconColor,
      primColor: navColor,
      selectedIconColor,
      yoffset: -30,
      iconSize: 25,
      selected: Math.max(1, Math.min(selected, 5)),
      sliderPosition: new Animated.Value(Math.max(1, Math.min(selected, 5))),
      animatedValues: {},
      icons: resolvedIcons,
    };
    for (let i = 1; i <= 5; i++) {
      initialState.animatedValues[i] = {
        id: new Animated.Value(i === selected ? 0 : 1),
        h: new Animated.Value(i === selected ? 100 : 0),
        i: new Animated.Value(i === selected ? 1 : 0),
        hh: new Animated.Value(i === selected ? 5 : 10),
      };
    }
    return initialState;
  });

  const startAnimation = useCallback(
    (selected: number) => {
      if (selected < 1 || selected > 5) {
        console.warn(`Invalid selected index: ${selected}`);
        return;
      }
      console.log(`Starting animation for selected: ${selected}`);
      const animations = [];
      const selectedValues = state.animatedValues[selected];
      if (selectedValues) {
        animations.push(
          Animated.timing(selectedValues.id, { toValue: 0, duration: 100, useNativeDriver: false }),
          Animated.timing(selectedValues.h, { toValue: 100, duration: 100, useNativeDriver: false }),
          Animated.timing(selectedValues.i, { toValue: 1, duration: 200, useNativeDriver: false }),
          Animated.timing(selectedValues.hh, { toValue: 5, duration: 300, useNativeDriver: false })
        );
      } else {
        console.error(`Animated values missing for selected: ${selected}`);
      }
      for (let i = 1; i <= 5; i++) {
        if (i !== selected) {
          const values = state.animatedValues[i];
          if (values) {
            animations.push(
              Animated.timing(values.id, { toValue: 1, duration: 200, useNativeDriver: false }),
              Animated.timing(values.h, { toValue: 0, duration: 200, useNativeDriver: false }),
              Animated.timing(values.i, { toValue: 0, duration: 200, useNativeDriver: false }),
              Animated.timing(values.hh, { toValue: 10, duration: 200, useNativeDriver: false })
            );
          } else {
            console.error(`Animated values missing for icon: ${i}`);
          }
        }
      }
      animations.push(
        Animated.timing(state.sliderPosition, {
          toValue: selected,
          duration: 200,
          useNativeDriver: false,
        })
      );
      Animated.parallel(animations).start(() => {
        console.log(`Animation completed for selected: ${selected}`);
        if (cb) {
          cb(selected);
        }
      });
      setState((prev) => ({ ...prev, selected }));
    },
    [state.animatedValues, state.sliderPosition, cb]
  );

  useEffect(() => {
    console.log(`useEffect triggered with selected: ${selected}`);
    startAnimation(selected);
  }, [selected, startAnimation]);

  const navrr = state.sliderPosition.interpolate({
    inputRange: [1, 5],
    outputRange: SLIDER_POSITIONS,
    extrapolate: 'clamp',
  });

  const off = Platform.OS === 'ios' ? height : height + 20 - mainOffSetAndroid;

  return (
    <View style={{ position: 'absolute', top: off }}>
      <View
        style={{
          backgroundColor: state.primColor,
          position: 'absolute',
          width,
          height: 83,
          bottom: 30 + state.yoffset,
          shadowColor: '#000',
          shadowOffset: { width: 1, height: 4 },
          shadowOpacity: 0.5,
          shadowRadius: 10,
        }}
      />
      <View
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          bottom: -20 + state.yoffset,
          width,
          height: 100,
        }}
      />
      <Animated.View style={{ position: 'absolute', bottom: 0, left: navrr }}>
        <View
          style={{
            backgroundColor: state.primColor,
            position: 'absolute',
            bottom: 65.5 + state.yoffset,
            width: 45,
            height: 45,
            borderRadius: 40,
            right: 61.8,
          }}
        />
        <View
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 0 + state.yoffset,
            right: 100,
            width,
            height: 100,
            borderRadius: 40,
          }}
        />
        <View
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 0 + state.yoffset,
            right: Platform.OS === 'ios' ? -345 : -343,
            width,
            height: 100,
            borderRadius: 40,
          }}
        />
      </Animated.View>
      <View style={styles.navRow}>
        {state.icons.map((IconComponent, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              console.log(`Primary icon ${i + 1} pressed`);
              startAnimation(i + 1);
            }}
          >
            <Animated.View
              style={{
                opacity: state.animatedValues[i + 1].i,
                transform: [{ translateY: state.animatedValues[i + 1].hh }],
              }}
            >
              <IconComponent size={state.iconSize} color={state.selectedIconColor} />
            </Animated.View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.iconRow}>
        {state.icons.map((IconComponent, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              console.log(`Secondary icon ${i + 1} pressed`);
              startAnimation(i + 1);
            }}
            style={styles.wicon}
          >
            <Animated.View
              style={{
                opacity: state.animatedValues[i + 1].id,
                transform: [{ translateY: state.animatedValues[i + 1].h }],
              }}
            >
              <IconComponent size={30} color={state.iconColor} />
            </Animated.View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wicon: {
    alignItems: 'center',
    width: width / 6,
    paddingTop: 10,
    top: -10,
  },
  navRow: {
    position: 'absolute',
    bottom: 0,
    width,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  iconRow: {
    position: 'absolute',
    bottom: -20,
    width,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
});

export default AppNavBar;
