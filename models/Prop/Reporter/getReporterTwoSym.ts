import { tuple } from 'fast-check'
import { Arbitrary } from 'fast-check/lib/types/check/arbitrary/definition/Arbitrary'
import { FilterTwo } from '../../../../utils/Filter'
import { getMapperOneTupleFromMapperTwo } from '../../../../utils/Mapper/getMapperOneTupleFromMapperTwo'
import { getReporter } from './getReporterP'

export const getReporterTwoSym = <T>(filter: FilterTwo<T>) => (arbitrary: Arbitrary<T>) => {
  const $tuple = tuple(arbitrary, arbitrary)
  const $filter = getMapperOneTupleFromMapperTwo(filter)
  return getReporter($filter)($tuple)
}
