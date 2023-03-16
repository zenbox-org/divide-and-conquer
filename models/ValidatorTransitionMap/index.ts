import { AsserterTransitionNative } from '../ParserTransition'

export type ValidatorTransitionMap<ActionType extends string, Action extends { type: ActionType }, State> = Partial<Record<ActionType, AsserterTransitionNative<Action, State>>>
