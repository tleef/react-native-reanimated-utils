import Animated from "react-native-reanimated";
import { Transition } from "./Transition";
import { runTiming } from "../Runners";

const { Value } = Animated;

export interface TimeTransitionConfig {
  duration: number;
  easing: Animated.EasingFunction;
}

export class TimeTransition extends Transition {
  protected readonly _run: Animated.Adaptable<number>;
  protected readonly _rev: Animated.Adaptable<number>;

  constructor(config: TimeTransitionConfig) {
    super();

    this._run = runTiming(this.clock, this.value, new Value(1), config);
    this._rev = runTiming(this.clock, this.value, new Value(0), config);
  }
}
