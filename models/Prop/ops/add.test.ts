import { expect, test } from '@jest/globals'
import { strict as assert } from 'assert'
import { integer, tuple } from 'fast-check'
import { identity } from 'remeda'
import { exhaust } from '../../../../decimaker/models/Generator/exhaust'
import { Mapper } from '../../../../utils/Mapper'
import { getMapperOneTupleFromMapperTwo } from '../../../../utils/Mapper/getMapperOneTupleFromMapperTwo'
import { withSuffixF } from '../../../../utils/string/withSuffix'
import { getRandomValueFromArbitrary } from '../../../GetRandomValueFromRandom'
import { expectCheckTwoSymmetric, expectCheckTwoSymmetricStochastic100 } from '../expectCheck'
import { getReports } from '../getReports'
import { getStats } from '../getStats'
import { getReporter } from '../Reporter/getReporterP'
import { getReporterTwoSym } from '../Reporter/getReporterTwoSym'
import { isSuccess } from '../Stats'
import { testArbTwoSym } from '../testArb'

const add = (a: number, b: number) => a + b
const addIsCommutative = (a: number, b: number) => add(a, b) === add(b, a)
const addZeroIsIdentity = (a: number) => add(a, 0) === a
// const addCurried = (a: number) => (b: number) => a + b
// const addCurriedIsEqualToAdd = (a: number, b: number) => add(a, b) === addCurried(a)(b)
// const isCommutative = <T>(func: (a: T, b: T) => T) => (a: T, b: T) => func(a, b) === func(b, a)
// const addIsCommutativeCool = isCommutative(add)

test(addIsCommutative.name + ' static values', () => {
  const result = addIsCommutative(7, 8)
  expect(result).toBeTruthy()
})

test(addIsCommutative.name + ' one-line checker', () => {
  expectCheckTwoSymmetric(addIsCommutative)(integer())(0, 100)
})

test(addIsCommutative.name + ' stochastic one-line checker', () => {
  expectCheckTwoSymmetric(addIsCommutative)(integer())(Date.now(), 100)
})

test(addIsCommutative.name + ' stochastic one-line checker', () => {
  expectCheckTwoSymmetricStochastic100(addIsCommutative)(integer())
})

testArbTwoSym(addIsCommutative)(integer())

test(addIsCommutative.name + ' static checker', () => {
  const addIsCommutativeChecker = (seed: number) => {
    const integerArb = integer()
    const getRandomValue = getRandomValueFromArbitrary(seed)
    const a = getRandomValue(integerArb)
    const b = getRandomValue(integerArb)
    return addIsCommutative(a, b)
  }
  const results = getStats(addIsCommutativeChecker)(0, 100)
  expect(isSuccess(results)).toBeTruthy()
})

test(addIsCommutative.name + ' dynamic checker', () => {
  const filter = getMapperOneTupleFromMapperTwo(addIsCommutative)
  const tupleArb = tuple(integer(), integer())
  const addIsCommutativeChecker = getReporter(filter)(tupleArb)
  const reports = getReports(addIsCommutativeChecker)(0, 100)
  expect(reports).toHaveLength(0)
})

test(addIsCommutative.name + ' concise checker', () => {
  const addIsCommutativeChecker = getReporterTwoSym(addIsCommutative)(integer())
  const reports = getReports(addIsCommutativeChecker)(0, 100)
  expect(reports).toHaveLength(0)
})

type Maker<V> = Mapper<bigint, V>

test(withSuffixF(addIsCommutative, 'exhaustive'), () => {
  const getGenerator = <In, Out>(continuation: Mapper<In, Out>) => (maker: Maker<In>) => function * (from: bigint, count: bigint) {
    for (let seed = from; seed < from + count; seed++) {
      const value = maker(seed)
      yield continuation(value)
    }
  }
  const generatorOfNumbers = getGenerator(identity)(identity)(1000n, 10n)
  const numbers = exhaust(generatorOfNumbers)
})

test.skip(withSuffixF(addIsCommutative, 'exhaustiveV2'), () => {
  for (let a = 0; a < Number.MAX_SAFE_INTEGER; a++) {
    for (let b = 0; b < Number.MAX_SAFE_INTEGER; b++) {
      assert(addIsCommutative(a, b))
    }
  }
})
