import { Arbitrary } from 'fast-check/lib/types/check/arbitrary/definition/Arbitrary'
import { Filter } from '../../../../generic/models/Filter'
import { getRandomValueFromArbitrary } from '../../../GetRandomValueFromRandom'
import { Reporter } from './index'

export const getReporter = <T>(filter: Filter<T>) => (arbitrary: Arbitrary<T>): Reporter<T> => {
  return (seed: number) => {
    const getRandomValue = getRandomValueFromArbitrary(seed)
    const value = getRandomValue(arbitrary)
    const result = filter(value)
    if (!result) return { value, result, seed }
  }
}

export const getChecker = <T>(filter: Filter<T>) => (arbitrary: Arbitrary<T>) => {
  return (seed: number) => {
    return getReporter(filter)(arbitrary)(seed) === undefined
  }
}
