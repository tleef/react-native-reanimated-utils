import Animated from "react-native-reanimated";

const {
  Value,
  Clock,
  block,
  set,
  cond,
  eq,
  and,
  clockRunning,
  stopClock
} = Animated;

export abstract class Driver {
  private readonly _value: Animated.Value<number>;
  private readonly _direction: Animated.Value<-1 | 0 | 1>;
  private readonly _clock: Animated.Clock;
  protected abstract readonly _run: Animated.Adaptable<number>;
  protected abstract readonly _rev: Animated.Adaptable<number>;

  protected constructor() {
    this._value = new Value(0);
    this._direction = new Value(0);
    this._clock = new Clock();
  }

  get value() {
    return this._value;
  }

  get clock() {
    return this._clock;
  }

  get direction() {
    return this._direction;
  }

  run() {
    return block([
      cond(
        and(clockRunning(this._clock), eq(this._direction, -1)),
        stopClock(this._clock)
      ),
      set(this._direction, 1),
      set(this._value, this._run)
    ]);
  }

  rev() {
    return block([
      cond(
        and(clockRunning(this._clock), eq(this._direction, 1)),
        stopClock(this._clock)
      ),
      set(this._direction, -1),
      set(this._value, this._rev)
    ]);
  }

  reset() {
    return block([
      stopClock(this._clock),
      set(this._direction, 0),
      set(this._value, 0)
    ]);
  }
}
