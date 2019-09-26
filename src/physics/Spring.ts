import Animated from "react-native-reanimated";
import {
  AnimatedAdaptableXY,
  AnimatedObject,
  AnimatedValueXY,
  Behavior,
  BehaviorXY
} from "../types";

const { set, add, sub, multiply, divide } = Animated;

export interface SpringXInput {
  point: Animated.Adaptable<number>;
  anchor: Animated.Adaptable<number>;
  tension: Animated.Adaptable<number>;
  mass: Animated.Adaptable<number>;
  dt: Animated.Adaptable<number>;
}

export function springX(
  velocity: Animated.Value<number>,
  args: SpringXInput
): Behavior {
  const dx = sub(args.point, args.anchor);
  const ax = divide(multiply(-1, args.tension, dx), args.mass);
  return set(velocity, add(velocity, multiply(args.dt, ax)));
}

export interface SpringXYInput {
  point: AnimatedAdaptableXY<number>;
  anchor: AnimatedAdaptableXY<number>;
  tension: Animated.Adaptable<number>;
  mass: Animated.Adaptable<number>;
  dt: Animated.Adaptable<number>;
}

export function springXY(
  velocity: AnimatedValueXY<number>,
  args: SpringXYInput
): BehaviorXY {
  const x = springX(velocity.x, {
    point: args.point.x,
    anchor: args.anchor.x,
    tension: args.tension,
    mass: args.mass,
    dt: args.dt
  });

  const y = springX(velocity.y, {
    point: args.point.y,
    anchor: args.anchor.y,
    tension: args.tension,
    mass: args.mass,
    dt: args.dt
  });

  return { x, y };
}

export interface SpringObjectInput {
  anchor: AnimatedAdaptableXY<number>;
  tension: Animated.Adaptable<number>;
  dt: Animated.Adaptable<number>;
}

export function springObject(
  obj: AnimatedObject,
  args: SpringObjectInput
): BehaviorXY {
  const velocity = { x: obj.vx, y: obj.vy };
  const point = { x: obj.x, y: obj.y };
  return springXY(velocity, {
    point,
    anchor: args.anchor,
    tension: args.tension,
    mass: obj.mass,
    dt: args.dt
  });
}
