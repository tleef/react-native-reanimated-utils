import Animated from "react-native-reanimated";
import { Driver } from "./Driver";
import { runTiming, TimingConfig } from "../Runners";

const { Value } = Animated;

export class TimeDriver extends Driver {
  protected readonly _run: Animated.Adaptable<number>;
  protected readonly _rev: Animated.Adaptable<number>;

  constructor(config: TimingConfig) {
    super();

    this._run = runTiming(this.clock, this.value, new Value(1), config);
    this._rev = runTiming(this.clock, this.value, new Value(0), config);
  }
}
