import { Filter } from '../../../utils/Filter'
import { StatsBasic } from './Stats'

export const getStats = (checker: Filter<number>) => (from: number, count: number): StatsBasic => {
  let success = 0
  for (let seed = from; seed < from + count; seed++) {
    if (checker(seed)) success++
  }
  const failure = count - success
  return { success, failure }
}
