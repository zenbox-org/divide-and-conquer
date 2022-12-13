export type TransitionBase<State> = (state: State) => Promise<State>

export type Transition<Params, State> = (params: Params) => TransitionBase<State>

export const emptyTransition = <Params, State>(params: Params) => async (state: State) => state

// // If the partial transition returns undefined, then it couldn't handle this step
// export type PartialTransition<Params, State> = (params: Params) => (state: State) => Promise<State | undefined>
