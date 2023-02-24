import { clone } from 'remeda'
import { Mutator } from '../generic/models/Mutator'

/**
 * Allows to mutate the value in-place
 */
export const asSafeMutator = <Val>(mutator: Mutator<Val>) => (value: Val) => mutator(clone(value))
