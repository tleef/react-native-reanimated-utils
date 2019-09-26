import Animated from "react-native-reanimated";

const { multiply } = Animated;

export default function sq(x: Animated.Adaptable<number>) {
  return multiply(x, x);
}
