import Animated from "react-native-reanimated";
import {
  AnimatedAdaptableXY,
  AnimatedObject,
  AnimatedValueXY,
  BehaviorXY
} from "../types";
import sq from "../utils/sq";

const { set, cond, add, sub, multiply, divide, exp, sqrt } = Animated;

export interface GravityXYInput {
  point: AnimatedAdaptableXY<number>;
  anchor: AnimatedAdaptableXY<number>;
  strength: Animated.Adaptable<number>;
  falloff: Animated.Adaptable<number>;
  mass: Animated.Adaptable<number>;
  dt: Animated.Adaptable<number>;
}

export function gravityXY(
  velocity: AnimatedValueXY<number>,
  args: GravityXYInput
): BehaviorXY {
  const dx = sub(args.point.x, args.anchor.x);
  const dy = sub(args.point.y, args.anchor.y);
  const drsq = add(sq(dx), sq(dy));
  const dr = sqrt(drsq);
  const a = divide(
    multiply(
      -1,
      args.strength,
      dr,
      exp(divide(multiply(-0.5, drsq), sq(args.falloff)))
    ),
    args.mass
  );
  const div = divide(a, dr);
  return {
    x: cond(dr, set(velocity.x, add(velocity.x, multiply(args.dt, dx, div)))),
    y: cond(dr, set(velocity.y, add(velocity.y, multiply(args.dt, dy, div))))
  };
}

export interface GravityObjectInput {
  anchor: AnimatedAdaptableXY<number>;
  strength: Animated.Adaptable<number>;
  falloff: Animated.Adaptable<number>;
  dt: Animated.Adaptable<number>;
}

export function gravityObject(
  obj: AnimatedObject,
  args: GravityObjectInput
): BehaviorXY {
  const velocity = { x: obj.vx, y: obj.vy };
  const point = { x: obj.x, y: obj.y };
  return gravityXY(velocity, {
    point,
    anchor: args.anchor,
    strength: args.strength,
    falloff: args.falloff,
    mass: obj.mass,
    dt: args.dt
  });
}
