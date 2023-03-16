import { ZodError } from 'zod'
import { AsserterTwoSym } from '../../../decimaker/models/Asserter'

export type AsserterTransition<Action, State, Error> = (action: Action) => AsserterTwoSym<State>

export type AsserterTransitionNative<Action, State> = AsserterTransition<Action, State, Error>

export type AsserterTransitionZod<Action, State> = AsserterTransition<Action, State, ZodError>
