import { Step } from './Step'
import { TransitionP } from './Transition'

export interface Handler<Params, State> {
  filter: (step: Step<Params, State>) => boolean,
  transition: TransitionP<Params, State>
}

export function handler<Params, State>(filter: (step: Step<Params, State>) => boolean, transition: TransitionP<Params, State>): Handler<Params, State> {
  return { filter, transition }
}
