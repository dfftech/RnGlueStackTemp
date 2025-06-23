/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
  useColorScheme,
} from 'react-native';
import * as icons from 'lucide-react-native';

type IconName = keyof typeof icons;
const {width} = Dimensions.get('window');

interface AppNavBarProps {
  selected?: number;
  iconColor?: string;
  navColor?: string;
  selectedIconColor?: string;
  mainOffSetAndroid?: number;
  cb?: (id: number) => void;
  icons?: IconName[]; // Required to make it truly dynamic
}

const AppNavBar: React.FC<AppNavBarProps> = ({
  selected = 1,
  iconColor,
  navColor,
  selectedIconColor,
  mainOffSetAndroid = 0,
  cb,
  icons: iconNames = ['Home', 'Search', 'Menu', 'User', 'Settings'], // default fallback
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const resolvedIconColor = iconColor ?? (isDark ? '#cbd5e1' : '#1e293b');
  const resolvedPrimColor = navColor ?? (isDark ? '#2563eb' : '#4687FD');
  const resolvedSelectedIconColor = selectedIconColor ?? '#ffffff';
  const backgroundColor = isDark ? '#1e293b' : 'white';

  const iconComponents = iconNames.map(
    name =>
      (icons[name] || icons['Circle']) as React.FC<{
        size?: number;
        color?: string;
      }>,
  );

  const totalIcons = iconComponents.length;
  const initialSelected = Math.max(1, Math.min(selected, totalIcons));

  const [sliderPosition] = useState(new Animated.Value(initialSelected));
  const [animatedValues] = useState(() => {
    const values: any = {};
    for (let i = 1; i <= totalIcons; i++) {
      values[i] = {
        id: new Animated.Value(i === initialSelected ? 0 : 1),
        h: new Animated.Value(i === initialSelected ? 100 : 0),
        i: new Animated.Value(i === initialSelected ? 1 : 0),
        hh: new Animated.Value(i === initialSelected ? 5 : 10),
      };
    }
    return values;
  });
  const [selectedState, setSelectedState] = useState(initialSelected);

  const startAnimation = useCallback(
    (selected: number) => {
      if (selected < 1 || selected > totalIcons) return;
      const animations: Animated.CompositeAnimation[] = [];

      const selectedValues = animatedValues[selected];
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

      for (let i = 1; i <= totalIcons; i++) {
        if (i !== selected) {
          const values = animatedValues[i];
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
        Animated.timing(sliderPosition, {
          toValue: selected,
          duration: 200,
          useNativeDriver: false,
        }),
      );

      Animated.parallel(animations).start(() => cb?.(selected));
      setSelectedState(selected);
    },
    [animatedValues, sliderPosition, totalIcons, cb],
  );

  useEffect(() => {
    startAnimation(initialSelected);
  }, [initialSelected, startAnimation]);

  const navrr = sliderPosition.interpolate({
    inputRange: Array.from({length: totalIcons}, (_, i) => i + 1),
    outputRange: iconComponents.map(
      (_, i) => (width / totalIcons) * i + width / (2 * totalIcons) - 30,
    ),
    extrapolate: 'clamp',
  });

  return (
    <View className="absolute bottom-[-30] w-full items-center justify-center">
      {/* Background */}
      <View
        className="absolute bottom-0 w-full h-[80px] shadow-md z-0"
        style={{
          backgroundColor,
          shadowColor: '#000',
          shadowOffset: {width: 1, height: 4},
          shadowOpacity: 0.5,
          shadowRadius: 10,
        }}
      />

      {/* Slider Bubble */}
      <Animated.View
        style={{position: 'absolute', bottom: 0, left: navrr}}
        className="z-10">
        <View
          className="absolute justify-center items-center"
          style={{
            backgroundColor: resolvedPrimColor,
            width: 60,
            height: 60,
            borderRadius: 30,
            bottom: 60 - 30,
            left: 0,
          }}
        />
      </Animated.View>

      {/* Selected Icons */}
      <View className="absolute bottom-0 w-full h-[100px] flex-row justify-around py-5 z-20">
        {iconComponents.map((IconComponent, i) => (
          <TouchableOpacity key={i} onPress={() => startAnimation(i + 1)}>
            <Animated.View
              style={{
                opacity: animatedValues[i + 1].i,
                transform: [{translateY: animatedValues[i + 1].hh}],
              }}>
              <IconComponent size={32} color={resolvedSelectedIconColor} />
            </Animated.View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Default Row Icons */}
      <View className="absolute -bottom-5 w-full h-[100px] flex-row justify-around py-5 z-10">
        {iconComponents.map((IconComponent, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => startAnimation(i + 1)}
            className="items-center"
            style={{width: `${100 / totalIcons}%`, paddingTop: 8}}>
            <Animated.View
              style={{
                opacity: animatedValues[i + 1].id,
                transform: [{translateY: animatedValues[i + 1].h}],
              }}>
              <IconComponent size={25} color={resolvedIconColor} />
            </Animated.View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default AppNavBar;
