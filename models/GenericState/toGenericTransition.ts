// eslint-disable-next-line @typescript-eslint/ban-types
import { clone, merge } from 'remeda'
import { GenericState } from '../GenericState'

export type GenericUpdateP<Data, Out, Err extends Error> = (state: Readonly<GenericState<Data, Out, Err>>) => Promise<Partial<GenericState<Data, Out, Err>>>

// eslint-disable-next-line @typescript-eslint/ban-types
export function toGenericTransition<Data, Out, Err extends Error>(update: GenericUpdateP<Data, Out, Err>) {
  return async (state: GenericState<Data, Out, Err>) => {
    try {
      // clone is required because the update function may mutate the argument
      const $state = await update(clone(state))
      return merge(state, $state)
    } catch (error) {
      // error handling via try-catch is required because we don't want to check for error return values (and we don't have monads)
      if (error instanceof Error) {
        return merge(state, { error })
      } else {
        throw error
      }
    }
  }
}
