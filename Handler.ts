import { Filter } from '../decimaker/models/Filter'
import { Step } from './Step'
import { Transition } from './Transition'

export interface Handler<Params, State> {
  filter: Filter<Step<Params, State>>
  transition: Transition<Params, State>
}

export function handler<Params, State>(filter: Filter<Step<Params, State>>, transition: Transition<Params, State>): Handler<Params, State> {
  return { filter, transition }
}
