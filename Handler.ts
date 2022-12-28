import { Step } from './Step'
import { Transition } from './Transition'

export interface Handler<Params, State> {
  filter: (step: Step<Params, State>) => boolean,
  transition: Transition<Params, State>
}

export function handler<Params, State>(filter: (step: Step<Params, State>) => boolean, transition: Transition<Params, State>): Handler<Params, State> {
  return { filter, transition }
}
