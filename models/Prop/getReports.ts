import { Report } from './Report'
import { Reporter } from './Reporter'

export const getReports = <T>(reporter: Reporter<T>) => (from: number, count: number): Report<T>[] => {
  const reports: Report<T>[] = []
  for (let seed = from; seed < from + count; seed++) {
    const report = reporter(seed)
    if (report) reports.push(report)
  }
  return reports
}
