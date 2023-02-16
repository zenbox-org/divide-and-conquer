import { impl } from 'libs/utils/todo'
import { Step } from './Step'
import { TransitionP } from './TransitionP'

export type GetSteps<Params, State> = Promise<Step<Params, State>[]>

export const exploreTransition = async <Params, State>(transition: TransitionP<Params, State>, state: State) => {
  // const pivots = getPivots(state)
  throw impl()
}
