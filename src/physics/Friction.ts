import Animated from "react-native-reanimated";
import {
  AnimatedObject,
  AnimatedValueXY,
  Behavior,
  BehaviorXY
} from "../types";

const { set, multiply, pow } = Animated;

export interface FrictionXInput {
  damping: Animated.Adaptable<number>;
  dt: Animated.Adaptable<number>;
}

export function frictionX(
  velocity: Animated.Value<number>,
  args: FrictionXInput
): Behavior {
  const friction = pow(args.damping, multiply(60, args.dt));
  return set(velocity, multiply(velocity, friction));
}

export interface FrictionXYInput {
  damping: Animated.Adaptable<number>;
  dt: Animated.Adaptable<number>;
}

export function frictionXY(
  velocity: AnimatedValueXY<number>,
  args: FrictionXYInput
): BehaviorXY {
  const x = frictionX(velocity.x, args);
  const y = frictionX(velocity.y, args);
  return { x, y };
}

export interface FrictionObjectInput {
  damping: Animated.Adaptable<number>;
  dt: Animated.Adaptable<number>;
}

export function frictionObject(
  obj: AnimatedObject,
  args: FrictionObjectInput
): BehaviorXY {
  const velocity = { x: obj.vx, y: obj.vy };
  return frictionXY(velocity, args);
}
