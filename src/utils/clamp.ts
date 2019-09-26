import Animated from "react-native-reanimated";
const { cond, lessThan } = Animated;

export default function clamp(
  x: Animated.Adaptable<number>,
  min?: Animated.Adaptable<number>,
  max?: Animated.Adaptable<number>
): Animated.Adaptable<number> {
  let clamped: Animated.Adaptable<number> = x;
  if (min !== undefined) {
    clamped = cond(lessThan(x, min), min, clamped);
  }
  if (max !== undefined) {
    clamped = cond(lessThan(max, x), max, clamped);
  }
  return clamped;
}
