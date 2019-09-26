import Animated from "react-native-reanimated";
import {
  AnimatedAdaptableXY,
  Behavior,
  BehaviorXY,
  Boundary,
  BoundaryXY
} from "../types";

const { cond, and, lessOrEq } = Animated;

export function influenceX(
  behavior: Behavior,
  point: Animated.Adaptable<number>,
  boundary?: Boundary
) {
  if (!boundary) {
    return behavior;
  }

  const tests: Array<Animated.Node<0 | 1>> = [];

  boundary.min !== undefined && tests.push(lessOrEq(boundary.min, point));
  boundary.max !== undefined && tests.push(lessOrEq(point, boundary.max));

  // @ts-ignore
  const test = and(...tests);

  return cond(test, behavior);
}

export function influenceXY(
  behavior: BehaviorXY,
  point: AnimatedAdaptableXY<number>,
  boundary?: BoundaryXY
): BehaviorXY {
  if (!boundary) {
    return behavior;
  }

  const tests: Array<Animated.Node<0 | 1>> = [];

  boundary.min &&
    boundary.min.x !== undefined &&
    tests.push(lessOrEq(boundary.min.x, point.x));
  boundary.max &&
    boundary.max.x !== undefined &&
    tests.push(lessOrEq(point.x, boundary.max.x));
  boundary.min &&
    boundary.min.y !== undefined &&
    tests.push(lessOrEq(boundary.min.y, point.y));
  boundary.max &&
    boundary.max.y !== undefined &&
    tests.push(lessOrEq(point.y, boundary.max.y));

  // @ts-ignore
  const test = and(...tests);

  return {
    x: cond(test, behavior.x),
    y: cond(test, behavior.y)
  };
}
