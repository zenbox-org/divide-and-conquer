import { clone } from 'remeda'
import { Modifier } from '../utils/Modifier'

/**
 * Allows to mutate the value in-place
 */
export const asSafeMutator = <Val>(mutator: Modifier<Val>) => (value: Val) => mutator(clone(value))
