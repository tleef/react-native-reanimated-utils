import Animated from "react-native-reanimated";
import {
  AnimatedAdaptableXY,
  AnimatedObject,
  AnimatedValueXY,
  Behavior,
  BehaviorXY
} from "../types";

const { set, sub, divide } = Animated;

export interface AnchorXInput {
  point: Animated.Adaptable<number>;
  anchor: Animated.Adaptable<number>;
  dt: Animated.Adaptable<number>;
}

export function anchorX(
  velocity: Animated.Value<number>,
  args: AnchorXInput
): Behavior {
  const dx = sub(args.anchor, args.point);
  return set(velocity, divide(dx, args.dt));
}

export interface AnchorXYInput {
  point: AnimatedAdaptableXY<number>;
  anchor: AnimatedAdaptableXY<number>;
  dt: Animated.Adaptable<number>;
}

export function anchorXY(
  velocity: AnimatedValueXY<number>,
  args: AnchorXYInput
): BehaviorXY {
  const x = anchorX(velocity.x, {
    point: args.point.x,
    anchor: args.anchor.x,
    dt: args.dt
  });

  const y = anchorX(velocity.y, {
    point: args.point.y,
    anchor: args.anchor.y,
    dt: args.dt
  });

  return { x, y };
}

export interface AnchorObjectInput {
  anchor: AnimatedAdaptableXY<number>;
  dt: Animated.Adaptable<number>;
}

export function anchorObject(
  obj: AnimatedObject,
  args: AnchorObjectInput
): BehaviorXY {
  const velocity = { x: obj.vx, y: obj.vy };
  const point = { x: obj.x, y: obj.y };
  return anchorXY(velocity, {
    point,
    anchor: args.anchor,
    dt: args.dt
  });
}
