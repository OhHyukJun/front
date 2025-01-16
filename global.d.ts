declare module 'react-native-snap-carousel' {
    import { Component } from 'react';
    import { FlatListProps, StyleProp, ViewStyle } from 'react-native';

    export interface CarouselProps<T> extends FlatListProps<T> {
        data: T[];
        renderItem: (info: { item: T; index: number }) => React.ReactNode;
        sliderWidth: number;
        itemWidth: number;
        itemHeight?: number;
        vertical?: boolean;
        inactiveSlideOpacity?: number;
        inactiveSlideScale?: number;
        loop?: boolean;
        loopClonesPerSide?: number;
        autoplay?: boolean;
        autoplayDelay?: number;
        autoplayInterval?: number;
        onSnapToItem?: (index: number) => void;
        contentContainerCustomStyle?: StyleProp<ViewStyle>;
    }

    export default class Carousel<T> extends Component<CarouselProps<T>> {}
}
