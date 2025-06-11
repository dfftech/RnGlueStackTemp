/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
  Animated,
  useColorScheme,
} from 'react-native';
import * as icons from 'lucide-react-native';
import {
  LucideIcon,
  Home,
  Search,
  Menu,
  User,
  Settings,
} from 'lucide-react-native';

type IconName = keyof typeof icons;
const {height, width} = Dimensions.get('window');

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
  yoffset: number;
  iconSize: number;
  selectedIconSize: number;
  selected: number;
  sliderPosition: Animated.Value;
  animatedValues: {
    [key: number]: {
      id: Animated.Value;
      h: Animated.Value;
      i: Animated.Value;
      hh: Animated.Value;
    };
  };
  icons: LucideIcon[];
}

const AppNavBar: React.FC<AppNavBarProps> = ({
  selected = 1,
  iconColor,
  navColor,
  selectedIconColor,
  mainOffSetAndroid = 0,
  cb,
  icons: iconNames,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const resolvedIconColor = iconColor ?? (isDark ? '#cbd5e1' : '#1e293b'); // slate-300 or slate-800
  const resolvedPrimColor = navColor ?? (isDark ? '#2563eb' : '#4687FD'); // blue-600
  const resolvedSelectedIconColor = selectedIconColor ?? '#ffffff';
  const backgroundColor = isDark ? '#1e293b' : 'white';

  const [state, setState] = useState<NavBarState>(() => {
    const resolvedIcons = iconNames
      ? iconNames.map((name, index) => {
          const IconComponent = icons[name] as LucideIcon;
          return IconComponent || defaultIcons[index] || Home;
        })
      : defaultIcons;

    const initialSelected = Math.max(1, Math.min(selected, 5));
    const initialState: NavBarState = {
      yoffset: -30,
      iconSize: 25,
      selectedIconSize: 32,
      selected: initialSelected,
      sliderPosition: new Animated.Value(initialSelected),
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
      if (selected < 1 || selected > 5) return;
      const animations = [];
      const selectedValues = state.animatedValues[selected];

      animations.push(
        Animated.timing(selectedValues.id, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(selectedValues.h, {
          toValue: 100,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(selectedValues.i, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(selectedValues.hh, {
          toValue: 5,
          duration: 300,
          useNativeDriver: false,
        }),
      );

      for (let i = 1; i <= 5; i++) {
        if (i !== selected) {
          const values = state.animatedValues[i];
          animations.push(
            Animated.timing(values.id, {
              toValue: 1,
              duration: 200,
              useNativeDriver: false,
            }),
            Animated.timing(values.h, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false,
            }),
            Animated.timing(values.i, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false,
            }),
            Animated.timing(values.hh, {
              toValue: 10,
              duration: 200,
              useNativeDriver: false,
            }),
          );
        }
      }

      animations.push(
        Animated.timing(state.sliderPosition, {
          toValue: selected,
          duration: 200,
          useNativeDriver: false,
        }),
      );

      Animated.parallel(animations).start(() => {
        if (cb) cb(selected);
      });

      setState(prev => ({...prev, selected}));
    },
    [state.animatedValues, state.sliderPosition, cb],
  );

  useEffect(() => {
    startAnimation(selected);
  }, [selected, startAnimation]);

  const navrr = state.sliderPosition.interpolate({
    inputRange: [1, 5],
    outputRange: [width / 10 - 30, (width * 9) / 10 - 30],
    extrapolate: 'clamp',
  });

  const off = Platform.OS === 'ios' ? height : height + 20 - mainOffSetAndroid;

  return (
    <View style={{position: 'absolute', top: off}}>
      <View
        style={{
          backgroundColor,
          position: 'absolute',
          width,
          height: 90,
          bottom: state.yoffset + 10,
          shadowColor: '#000',
          shadowOffset: {width: 1, height: 4},
          shadowOpacity: 0.5,
          shadowRadius: 10,
        }}
      />
      <View
        style={{
          backgroundColor,
          position: 'absolute',
          bottom: -20 + state.yoffset,
          width,
          height: 100,
        }}
      />

      <Animated.View style={{position: 'absolute', bottom: 0, left: navrr}}>
        <View
          style={{
            backgroundColor: resolvedPrimColor,
            width: 60,
            height: 60,
            borderRadius: 30,
            bottom: 60 + state.yoffset,
            position: 'absolute',
            left: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </Animated.View>

      <View style={styles.navRow}>
        {state.icons.map((IconComponent, i) => (
          <TouchableOpacity key={i} onPress={() => startAnimation(i + 1)}>
            <Animated.View
              style={{
                opacity: state.animatedValues[i + 1].i,
                transform: [{translateY: state.animatedValues[i + 1].hh}],
              }}>
              <IconComponent
                size={state.selectedIconSize}
                color={resolvedSelectedIconColor}
              />
            </Animated.View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.iconRow}>
        {state.icons.map((IconComponent, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => startAnimation(i + 1)}
            style={styles.wicon}>
            <Animated.View
              style={{
                opacity: state.animatedValues[i + 1].id,
                transform: [{translateY: state.animatedValues[i + 1].h}],
              }}>
              <IconComponent size={30} color={resolvedIconColor} />
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
