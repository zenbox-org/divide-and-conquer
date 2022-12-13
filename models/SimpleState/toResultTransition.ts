// eslint-disable-next-line @typescript-eslint/ban-types
import { clone, merge } from 'remeda'
import { todo } from '../../../utils/todo'
import { isSuccessState, SimpleState } from '../SimpleState'

export type ResultUpdate<Val> = (value: Val) => Promise<Partial<Val>>

export const toResultTransition = <Val, Err>(isError: (e: unknown) => e is Err) => (update: ResultUpdate<Val>) => async (state: SimpleState<Val, Err>) => {
  try {
    // clone is required because the update function may mutate the argument
    if (isSuccessState(state)) {
      const value = merge(state.value, await update(clone(state.value)))
      return { ...state, value }
    } else {
      return todo(todo(), 'Cannot call the update if the state is FailureState (does not have the .value)')
    }
  } catch (error) {
    // error handling via try-catch is required because we don't want to check for error return values (and we don't have monads)
    if (isError(error)) {
      return merge(state, { error })
    } else {
      throw error
    }
  }
}
