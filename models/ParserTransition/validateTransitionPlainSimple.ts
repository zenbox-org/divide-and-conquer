import { equals } from 'remeda'
import { parseTransitionViaFilters } from './parseTransitionViaFilters'

const parseTransitionPlainZero1 = <T, A>(prev: T, next: T, action: A) => equals(prev, next) ? [] : [new Error('assert.by(equals)(prev, next)')]

const parseTransitionPlainZero2 = parseTransitionViaFilters([equals])

const parseTransitionPlainZero1_eq_parseTransitionPlainZero2 = <T, A>(prev: T, next: T, action: A) => equals(parseTransitionPlainZero1(prev, next, action), parseTransitionPlainZero2(prev, next, action))
