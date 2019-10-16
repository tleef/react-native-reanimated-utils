import Animated from "react-native-reanimated";
import { Transition } from "./Transition";
import { runSpring } from "../Runners";

const { Value } = Animated;

export interface SpringTransitionConfig {
  stiffness: number;
  mass: number;
  damping: number;
  overshootClamping: boolean;
  restSpeedThreshold: number;
  restDisplacementThreshold: number;
}

export class SpringTransition extends Transition {
  protected readonly _run: Animated.Adaptable<number>;
  protected readonly _rev: Animated.Adaptable<number>;

  constructor(config: SpringTransitionConfig) {
    super();

    this._run = runSpring(this.clock, this.value, new Value(1), config);
    this._rev = runSpring(this.clock, this.value, new Value(0), config);
  }
}
