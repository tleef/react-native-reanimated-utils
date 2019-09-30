import Animated from "react-native-reanimated";
import { AnimatedAdaptableXY } from ".";

export type Behavior = Animated.Node<number> | Array<Animated.Node<number>>;

export interface BehaviorXY {
  x: Behavior;
  y: Behavior;
}

export type Movement = Animated.Node<number> | Array<Animated.Node<number>>;

export interface MovementXY {
  x: Movement;
  y: Movement;
}

export interface Boundary {
  min?: Animated.Adaptable<number>;
  max?: Animated.Adaptable<number>;
}

export interface BoundaryXY {
  max?: Partial<AnimatedAdaptableXY<number>>;
  min?: Partial<AnimatedAdaptableXY<number>>;
}

export interface AnimatedObject {
  x: Animated.Value<number>;
  y: Animated.Value<number>;
  vx: Animated.Value<number>;
  vy: Animated.Value<number>;
  mass: Animated.Adaptable<number>;
}
