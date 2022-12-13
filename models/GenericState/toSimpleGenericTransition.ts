// eslint-disable-next-line @typescript-eslint/ban-types
import { clone, merge } from 'remeda'
import { GenericState } from '../GenericState'

export type SimpleGenericUpdate<Data, Out, Err> = (state: Readonly<Data>) => Promise<Partial<Data>>

// eslint-disable-next-line @typescript-eslint/ban-types
export const toSimpleGenericTransition = <Data, Out, Err>(isError: (e: unknown) => e is Err) => (getDataUpdate: SimpleGenericUpdate<Data, Out, Err>) => async (state: GenericState<Data, Out, Err>): Promise<GenericState<Data, Out, Err>> => {
  try {
    // clone is required because the update function may mutate the argument
    const update = await getDataUpdate(clone(state.data))
    return { ...state, data: { ...state.data, ...update } }
  } catch (error) {
    // error handling via try-catch is required because we don't want to check for error return values (and we don't have monads)
    if (isError(error)) {
      return merge(state, { error })
    } else {
      throw error
    }
  }
}
