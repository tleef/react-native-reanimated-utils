import Animated from "react-native-reanimated";
import { Driver } from "./Driver";
import { runSpring, SpringConfig } from "../Runners";

const { Value } = Animated;

export class SpringDriver extends Driver {
  protected readonly _run: Animated.Adaptable<number>;
  protected readonly _rev: Animated.Adaptable<number>;

  constructor(config: SpringConfig) {
    super();

    this._run = runSpring(this.clock, this.value, new Value(1), config);
    this._rev = runSpring(this.clock, this.value, new Value(0), config);
  }
}
