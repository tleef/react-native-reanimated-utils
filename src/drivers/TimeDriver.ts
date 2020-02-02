import Animated from "react-native-reanimated";
import { Driver } from "./Driver";
import { runTiming } from "../Runners";

const { Value } = Animated;

export interface TimeDriverConfig {
  duration: number;
  easing: Animated.EasingFunction;
}

export class TimeDriver extends Driver {
  protected readonly _run: Animated.Adaptable<number>;
  protected readonly _rev: Animated.Adaptable<number>;

  constructor(config: TimeDriverConfig) {
    super();

    this._run = runTiming(this.clock, this.value, new Value(1), config);
    this._rev = runTiming(this.clock, this.value, new Value(0), config);
  }
}
