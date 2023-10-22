import { Modifier, ModifierP } from '../utils/Modifier'

export type Transition<Params, State> = (params: Params) => Modifier<State>

export type TransitionP<Params, State> = (params: Params) => ModifierP<State>

export const emptyTransitionP = <Params, State>(params: Params) => async (state: State) => state

// // If the partial transition returns undefined, then it couldn't handle this step
// export type PartialTransition<Params, State> = (params: Params) => (state: State) => Promise<State | undefined>
