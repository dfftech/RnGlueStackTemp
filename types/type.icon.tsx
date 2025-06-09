import React from 'react';
import { CircleOff, icons } from 'lucide-react-native';

type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  color?: string;
  size?: number;
}

export const TypeIcon: React.FC<IconProps> = ({
  name,
  color = 'lightslategray',
  size = 24,
}) => {
  const LucideIcon = icons[name];
  if (!LucideIcon) {
    return <CircleOff color={color} size={size} />;
  }
  return <LucideIcon color={color} size={size} />;
};

