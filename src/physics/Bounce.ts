import Animated from "react-native-reanimated";
import {
  AnimatedAdaptableXY,
  AnimatedObject,
  AnimatedValueXY,
  Behavior,
  BehaviorXY,
  Boundary,
  BoundaryXY
} from "../types";
import clamp from "../utils/clamp";

const { set, cond, and, eq, lessThan, greaterThan, multiply } = Animated;

export interface BounceXInput {
  point: Animated.Adaptable<number>;
  boundary: Boundary;
  bounce: Animated.Adaptable<number>;
}

export function bounceX(
  velocity: Animated.Value<number>,
  args: BounceXInput
): Behavior {
  const nodes: Array<Animated.Node<number>> = [];
  const x = clamp(args.point, args.boundary.min, args.boundary.max);
  const flipVelocity = set(velocity, multiply(-1, velocity, args.bounce));

  if (args.boundary.min !== undefined) {
    nodes.push(
      cond(and(eq(x, args.boundary.min), lessThan(velocity, 0)), flipVelocity)
    );
  }

  if (args.boundary.max !== undefined) {
    nodes.push(
      cond(
        and(eq(x, args.boundary.max), greaterThan(velocity, 0)),
        flipVelocity
      )
    );
  }

  return nodes;
}

export interface BounceXYInput {
  point: AnimatedAdaptableXY<number>;
  boundary: BoundaryXY;
  bounce: Animated.Adaptable<number>;
}

export function bounceXY(
  velocity: AnimatedValueXY<number>,
  args: BounceXYInput
): BehaviorXY {
  const x = bounceX(velocity.x, {
    point: args.point.x,
    boundary: {
      min: args.boundary.min && args.boundary.min.x,
      max: args.boundary.max && args.boundary.max.x
    },
    bounce: args.bounce
  });

  const y = bounceX(velocity.y, {
    point: args.point.y,
    boundary: {
      min: args.boundary.min && args.boundary.min.y,
      max: args.boundary.max && args.boundary.max.y
    },
    bounce: args.bounce
  });

  return { x, y };
}

export interface BounceObjectInput {
  boundary: BoundaryXY;
  bounce: Animated.Adaptable<number>;
}

export function bounceObject(
  obj: AnimatedObject,
  args: BounceObjectInput
): BehaviorXY {
  const velocity = { x: obj.vx, y: obj.vy };
  const point = { x: obj.x, y: obj.y };
  return bounceXY(velocity, {
    point,
    boundary: args.boundary,
    bounce: args.bounce
  });
}
