import { assertIncludes } from '../../../utils/assert'
import { ValidatorTransitionMap } from './index'

export const getValidatorTransitionFromMap = <ActionType extends string, Action extends { type: ActionType }, State>(map: ValidatorTransitionMap<ActionType, Action, State>) => (action: Action) => (prev: State, next: State) => {
  const actionsAllowed = Object.keys(map)
  assertIncludes(actionsAllowed, action.type, 'actionsAllowed', 'action.type')
  const validator = map[action.type]
  if (!validator) throw new Error() // type assertion, must not be reached
  return validator(action)(prev, next)
}
