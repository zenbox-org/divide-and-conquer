import { Filter } from '../../../utils/Filter'

export const getErrorSeed = (checker: Filter<number>) => (from: number, count: number): number | undefined => {
  for (let i = from; i < from + count; i++) {
    if (!checker(i)) return i
  }
}
