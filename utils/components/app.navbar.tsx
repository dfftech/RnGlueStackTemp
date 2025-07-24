/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  useColorScheme,
} from 'react-native';
import * as icons from 'lucide-react-native';

type IconName = keyof typeof icons;


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
  cb,
  icons: iconNames = ['Home', 'Search', 'Menu', 'User', 'Settings'], // default fallback
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const resolvedIconColor = iconColor ?? (isDark ? '#cbd5e1' : '#1e293b');
  const resolvedPrimColor = navColor ?? (isDark ? '#2563eb' : '#4687FD');
  const resolvedSelectedIconColor = selectedIconColor ?? '#ffffff';
  const backgroundColor = isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(248, 250, 252, 0.75)';

  const iconComponents = iconNames.map(
    name =>
      (icons[name] || icons['Circle']) as React.FC<{
        size?: number;
        color?: string;
      }>,
  );

  const totalIcons = iconComponents.length;
  const initialSelected = Math.max(1, Math.min(selected, totalIcons));

  // Calculate menu width based on number of icons (60px per icon + padding)
  const menuWidth = totalIcons * 60 + 20;
  const iconWidth = 60;

  const [sliderPosition] = useState(new Animated.Value(initialSelected));
  const [animatedValues] = useState(() => {
    const values: any = {};
    for (let i = 1; i <= totalIcons; i++) {
      values[i] = {
        id: new Animated.Value(i === initialSelected ? 0 : 1),
        h: new Animated.Value(i === initialSelected ? 100 : 0),
        i: new Animated.Value(i === initialSelected ? 1 : 0),
        hh: new Animated.Value(i === initialSelected ? 0 : 0),
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
          toValue: 0,
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
              toValue: 0,
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

  // Fixed interpolation for proper centering
  const navrr = sliderPosition.interpolate({
    inputRange: Array.from({ length: totalIcons }, (_, i) => i + 1),
    outputRange: iconComponents.map(
      (_, i) => 10 + (i * iconWidth) + (iconWidth / 2) - 25, // Proper centering calculation
    ),
    extrapolate: 'clamp',
  });

  return (
    <View className="absolute bottom-1 w-full items-center justify-center">
      {/* Enhanced Glossy Rounded Menu Container */}
      <View
        className="relative"
        style={{
          width: menuWidth,
          height: 64,
          backgroundColor,
          borderRadius: 32,
          // Enhanced glossy effect with multiple shadows
          shadowColor: isDark ? '#000' : '#64748b',
          shadowOffset: { width: 0, height: isDark ? 8 : 6 },
          shadowOpacity: isDark ? 0.25 : 0.2,
          shadowRadius: isDark ? 16 : 12,
          elevation: 12,
          // Light theme specific styling
          ...(isDark ? {} : {
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.8)',
          }),
        }}>

        {/* Enhanced Glossy overlay for better glass effect */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '70%',
            backgroundColor: isDark
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(255, 255, 255, 0.9)',
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
          }}
        />

        {/* Additional strong glossy layer for light theme */}
        {!isDark && (
          <>
            <View
              style={{
                position: 'absolute',
                top: 1,
                left: 1,
                right: 1,
                height: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderTopLeftRadius: 31,
                borderTopRightRadius: 31,
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 3,
                left: 3,
                right: 3,
                height: '25%',
                backgroundColor: 'rgba(255, 255, 255, 1)',
                borderTopLeftRadius: 29,
                borderTopRightRadius: 29,
              }}
            />
          </>
        )}

        {/* Clean Selected Indicator - No border */}
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 9,
            left: navrr,
            zIndex: 10,
          }}>
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: 23,
              // Clean gradient effect without border
              backgroundColor: resolvedPrimColor,
              // Multiple shadows for depth
              shadowColor: resolvedPrimColor,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 8,
              elevation: 8,
              // Center the content
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* Inner glossy highlight */}
            <View
              style={{
                position: 'absolute',
                top: 3,
                left: 3,
                right: 3,
                height: '40%',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
            {/* Selected Icon - Centered in circle */}
            <View style={{ zIndex: 1 }}>
              {iconComponents.map((IconComponent, i) => (
                <Animated.View
                  key={i}
                  style={{
                    opacity: animatedValues[i + 1].i,
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 46,
                    height: 46,
                    left: -23,
                    top: -23,
                  }}>
                  <IconComponent size={22} color={resolvedSelectedIconColor} />
                </Animated.View>
              ))}
            </View>
          </View>
        </Animated.View>

        {/* Default Row Icons */}
        <View className="absolute inset-0 flex-row justify-around items-center px-2 z-10">
          {iconComponents.map((IconComponent, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => startAnimation(i + 1)}
              className="w-[46px] h-[46px] items-center justify-center">
              <Animated.View
                style={{
                  opacity: animatedValues[i + 1].id,
                  transform: [{ translateY: animatedValues[i + 1].h }],
                }}>
                <IconComponent size={20} color={resolvedIconColor} />
              </Animated.View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default AppNavBar;
