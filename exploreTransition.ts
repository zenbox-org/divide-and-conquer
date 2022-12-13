import { impl } from 'libs/utils/todo'
import { Step } from './Step'
import { Transition } from './Transition'

export type GetSteps<Params, State> = Promise<Step<Params, State>[]>

export const exploreTransition = async <Params, State>(transition: Transition<Params, State>, state: State) => {
  // const pivots = getPivots(state)
  throw impl()
}
