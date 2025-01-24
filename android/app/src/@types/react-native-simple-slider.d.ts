declare module 'react-native-simple-slider' {
    import React from 'react';
    import { ViewStyle } from 'react-native';
  
    export interface SliderProps {
      value?: number;
      minimumValue?: number;
      maximumValue?: number;
      step?: number;
      onSlidingStart?: () => void;
      onValueChange?: (value: number) => void;
      onSlidingComplete?: () => void;
      disabled?: boolean;
      disabledHoverEffect?: boolean;
      minimumTrackTintColor?: string;
      maximumTrackTintColor?: string;
      thumbTintColor?: string;
      thumbButtonSize?: number;
      sliderWidth?: number;
      sliderHeight?: number;
      sliderBorderRadius?: number;
      thumbImage?: string | number;
      thumbButton?: React.ReactElement;
    }
  
    const Slider: React.FC<SliderProps>;
  
    export default Slider;
  }
  