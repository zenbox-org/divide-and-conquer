import { Arbitrary } from 'fast-check/lib/types/check/arbitrary/definition/Arbitrary'
import { Filter, FilterTwo } from '../../../utils/Filter'
import { getReports } from './getReports'
import { getReporter } from './Reporter/getReporterP'
import { getReporterTwoSym } from './Reporter/getReporterTwoSym'

export const expectCheck = <T>(filter: Filter<T>) => (arbitrary: Arbitrary<T>) => (from: number, count: number) => {
  const checker = getReporter(filter)(arbitrary)
  const reports = getReports(checker)(from, count)
  expect(reports).toHaveLength(0)
}

export const expectCheckStochastic = <T>(filter: Filter<T>) => (arbitrary: Arbitrary<T>) => (count: number) => expectCheck(filter)(arbitrary)(Date.now(), count)

export const expectCheckStochastic100 = <T>(filter: Filter<T>) => (arbitrary: Arbitrary<T>) => expectCheckStochastic(filter)(arbitrary)(100)

export const expectCheckStochDef = expectCheckStochastic100

export const expectCheckTwoSymmetric = <T>(filter: FilterTwo<T>) => (arbitrary: Arbitrary<T>) => (from: number, count: number) => {
  const checker = getReporterTwoSym(filter)(arbitrary)
  const reports = getReports(checker)(from, count)
  expect(reports).toHaveLength(0)
}

export const expectCheckTwoSymmetricStochastic = <T>(filter: FilterTwo<T>) => (arbitrary: Arbitrary<T>) => (count: number) => expectCheckTwoSymmetric(filter)(arbitrary)(Date.now(), count)

export const expectCheckTwoSymmetricStochastic100 = <T>(filter: FilterTwo<T>) => (arbitrary: Arbitrary<T>) => expectCheckTwoSymmetricStochastic(filter)(arbitrary)(100)

export const expectCheckTwoSymStochDef = expectCheckTwoSymmetricStochastic100
