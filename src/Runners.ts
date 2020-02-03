import Animated from "react-native-reanimated";

const {
  Value,
  block,
  cond,
  set,
  clockRunning,
  startClock,
  stopClock,
  timing,
  spring
} = Animated;

export type TimingConfig = Omit<Animated.TimingConfig, "toValue">;

export interface ValuedTimingConfig extends TimingConfig {
  toValue: Animated.Value<number>;
}

export function runTiming(
  clock: Animated.Clock,
  value: Animated.Adaptable<number>,
  dest: Animated.Adaptable<number>,
  options: TimingConfig
) {
  const state: Animated.TimingState = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config: ValuedTimingConfig = {
    duration: options.duration,
    easing: options.easing,
    toValue: new Value(0)
  };

  return block([
    cond(
      clockRunning(clock),
      [
        // if the clock is already running we update the toValue, in case a new dest has been passed in
        set(config.toValue, dest)
      ],
      [
        // if the clock isn't running we reset all the animation params and start the clock
        set(state.finished, 0),
        set(state.position, value),
        set(state.time, 0),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock)
      ]
    ),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, stopClock(clock)),
    // we made the block return the updated position
    state.position
  ]);
}

export type SpringConfig = Omit<Animated.SpringConfig, "toValue">;

export interface ValuedSpringConfig extends SpringConfig {
  toValue: Animated.Value<number>;
}

export function runSpring(
  clock: Animated.Clock,
  value: Animated.Adaptable<number>,
  dest: Animated.Adaptable<number>,
  options: SpringConfig
) {
  const state: Animated.SpringState = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0)
  };

  const config: ValuedSpringConfig = {
    damping: options.damping,
    mass: options.mass,
    stiffness: options.stiffness,
    overshootClamping: options.overshootClamping,
    restSpeedThreshold: options.restDisplacementThreshold,
    restDisplacementThreshold: options.restDisplacementThreshold,
    toValue: new Value(0)
  };

  return block([
    cond(
      clockRunning(clock),
      [
        // if the clock is already running we update the toValue, in case a new dest has been passed in
        set(config.toValue, dest)
      ],
      [
        // if the clock isn't running we reset all the animation params and start the clock
        set(state.finished, 0),
        set(state.velocity, 0),
        set(state.position, value),
        set(state.time, 0),
        set(config.toValue, dest),
        startClock(clock)
      ]
    ),
    // we run the step here that is going to update position
    spring(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, stopClock(clock)),
    // we made the block return the updated position
    state.position
  ]);
}
