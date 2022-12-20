import { TransitionBase } from './Transition'

export const runTransitions = <State>(parseState: (s: State) => State) => (transitions: TransitionBase<State>[]) => async (state: State) => {
  return transitions.reduce<Promise<State>>(async (state, transition) => {
    /**
     * `parseState` serves two purposes:
     * - validate the state
     * - clone the state
     *
     * Notes:
     * - clone is necessary because state can be mutated in the transition (less code)
     */
    const $state = parseState(await state)
    return transition($state)
  }, Promise.resolve(state))
}
