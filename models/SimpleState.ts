type SuccessState<Val> = { value: Val }

type FailureState<Err> = { error: Err }

export type SimpleState<Val, Err> = SuccessState<Val> | FailureState<Err>

export const isSuccessState = <Val, Err>(state: SimpleState<Val, Err>): state is SuccessState<Val> => 'value' in state

export const isFailureState = <Val, Err>(state: SimpleState<Val, Err>): state is SuccessState<Val> => 'value' in state
