import { Mutator, MutatorP } from '../generic/models/Mutator'

export type Transition<Params, State> = (params: Params) => Mutator<State>

export type TransitionP<Params, State> = (params: Params) => MutatorP<State>

export const emptyTransitionP = <Params, State>(params: Params) => async (state: State) => state

// // If the partial transition returns undefined, then it couldn't handle this step
// export type PartialTransition<Params, State> = (params: Params) => (state: State) => Promise<State | undefined>
