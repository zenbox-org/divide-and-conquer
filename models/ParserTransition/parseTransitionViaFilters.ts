import { FilterTwo } from '../../../generic/models/Filter'
import { TransitionGen } from '../../../generic/models/Transition'
import { assertEq } from '../../../utils/assert'
import { GetLens, UnsetLens } from '../../../utils/Lens'
import { AsserterTransitionNative } from './index'

export const parseTransitionViaFilters = <Value, Action>(filters: FilterTwo<Value>[]) => (prev: Value, next: Value, action: Action) => {
  const match = filters.find(f => f(prev, next))
  return match ? [] : [new Error('No matching filter')]
}

// type Validate<Action, Target, Err> = (action: Action) => BiSymValidatorWithThrow<Target, Err>

interface GetUnsetParseLens<Action, Source, Target> extends GetLens<Source, Target>, UnsetLens<Source, Target> {
  assert: AsserterTransitionNative<Action, Target>
}

type GULens<Source, Target, Action> = GetUnsetParseLens<Source, Target, Action>

export const validateTransitionViaGetUnsetLenses = <Action, State, Error>(lenses: GULens<Action, State, unknown>[]) => (transition: TransitionGen<Action, State>) => {
  const { action, prev, next } = transition
  lenses.forEach(({ get, assert, unset }) => {
    const prevValue = get(prev)
    const nextValue = get(next)
    assert(action)(prevValue, nextValue)
    unset(prev)
    unset(next)
  })
  assertEq(prev, next, 'prev', 'next', { action, prev, next })
}

export const validateTransition = validateTransitionViaGetUnsetLenses([])
