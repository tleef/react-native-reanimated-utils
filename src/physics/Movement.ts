import Animated from "react-native-reanimated";
import {
  AnimatedAdaptableXY,
  AnimatedObject,
  AnimatedValueXY,
  Boundary,
  BoundaryXY,
  Movement,
  MovementXY
} from "../types";
import clamp from "../utils/clamp";

const { set, cond, lessThan, abs, add, multiply } = Animated;

export interface MoveXInput {
  velocity: Animated.Adaptable<number>;
  minVelocity?: Animated.Adaptable<number>;
  boundary?: Boundary;
  dt: Animated.Adaptable<number>;
}

export function moveX(
  point: Animated.Value<number>,
  args: MoveXInput
): Movement {
  let x: Animated.Adaptable<number> = add(
    point,
    multiply(args.velocity, args.dt)
  );

  if (args.minVelocity) {
    x = cond(lessThan(abs(args.velocity), args.minVelocity), point, x);
  }

  if (args.boundary) {
    x = clamp(x, args.boundary.min, args.boundary.max);
  }

  return set(point, x);
}

export interface MoveXYInput {
  velocity: AnimatedAdaptableXY<number>;
  minVelocity?: AnimatedAdaptableXY<number>;
  boundary?: BoundaryXY;
  dt: Animated.Adaptable<number>;
}

export function moveXY(
  point: AnimatedValueXY<number>,
  args: MoveXYInput
): MovementXY {
  const x = moveX(point.x, {
    velocity: args.velocity.x,
    minVelocity: args.minVelocity && args.minVelocity.x,
    boundary: args.boundary && {
      min: args.boundary.min && args.boundary.min.x,
      max: args.boundary.max && args.boundary.max.x
    },
    dt: args.dt
  });

  const y = moveX(point.y, {
    velocity: args.velocity.y,
    minVelocity: args.minVelocity && args.minVelocity.y,
    boundary: args.boundary && {
      min: args.boundary.min && args.boundary.min.y,
      max: args.boundary.max && args.boundary.max.y
    },
    dt: args.dt
  });

  return { x, y };
}

export interface MoveObjectInput {
  minVelocity?: AnimatedAdaptableXY<number>;
  boundary?: BoundaryXY;
  dt: Animated.Adaptable<number>;
}

export function moveObject(obj: AnimatedObject, args: MoveObjectInput) {
  const point = { x: obj.x, y: obj.y };
  const velocity = { x: obj.vx, y: obj.vy };
  return moveXY(point, {
    velocity,
    minVelocity: args.minVelocity,
    boundary: args.boundary,
    dt: args.dt
  });
}
