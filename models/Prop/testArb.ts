import { test } from '@jest/globals'
import { Arbitrary } from 'fast-check/lib/types/check/arbitrary/definition/Arbitrary'
import { Filter, FilterTwo } from '../../../generic/models/Filter'
import { expectCheckStochDef, expectCheckTwoSymStochDef } from './expectCheck'
import { implyTwo } from './imply'

export const testArb = <T>(filter: Filter<T>, $filter = '') => (arbitrary: Arbitrary<T>) => {
  test(getName(filter, $filter), () => {
    expectCheckStochDef(filter)(arbitrary)
  })
}

export const testArbTwoSym = <T>(filter: FilterTwo<T>, $filter = '') => (arbitrary: Arbitrary<T>) => {
  test(getName(filter, $filter), () => {
    expectCheckTwoSymStochDef(filter)(arbitrary)
  })
}

export const testArbImplyTwoSym = <T>(premise: FilterTwo<T>, conclusion: FilterTwo<T>, $premise = '', $conclusion = '') => (arbitrary: Arbitrary<T>) => {
  const implication = implyTwo(premise, conclusion)
  const $implication = `if ${getName(premise, $premise)} then ${getName(conclusion, $conclusion)}`
  test($implication, () => {
    expectCheckTwoSymStochDef(implication)(arbitrary)
  })
}

// eslint-disable-next-line @typescript-eslint/ban-types
const getName = (func: Function, $func = '') => func.name || $func

// export const testArbPre = <T>(premise: Filter<T>, $preSuffix = '') => (conclusion: Filter<T>, $conclusionSuffix = '') => (arbitrary: Arbitrary<T>) => {
//   return testArb(conclusion, $conclusionSuffix)(arbitrary.filter(premise))
// }
//
// export const testArbPreTwoSym = <T>(premise: FilterTwo<T>, $preSuffix = '') => (conclusion: FilterTwo<T>, $conclusionSuffix = '') => (arbitrary: Arbitrary<T>) => {
//   return testArbTwoSym(conclusion, $conclusionSuffix)(arbitrary.filter(premise))
// }
