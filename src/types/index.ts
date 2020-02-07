import Animated from "react-native-reanimated";

export * from "./physics";

export type Value = string | number | boolean;

export interface AnimatedAdaptableXY<T> {
  x: Animated.Adaptable<T>;
  y: Animated.Adaptable<T>;
}

export interface AnimatedNodeXY<T> {
  x: Animated.Node<T>;
  y: Animated.Node<T>;
}

export interface AnimatedValueXY<T extends Value> {
  x: Animated.Value<T>;
  y: Animated.Value<T>;
}

export type StartHandler = () => void;
export type EndHandler = (cancelled: boolean) => void;
export type StartListeners = StartHandler[];
export type EndListeners = EndHandler[];
