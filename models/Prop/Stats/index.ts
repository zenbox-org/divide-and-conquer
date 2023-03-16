import { Report } from '../Report'

export interface WithSuccessFailure<T> {
  success: T
  failure: T
}

export interface WithReports<T> {
  reports: Report<T>[]
}

export type StatsBasic = WithSuccessFailure<number>

export type StatsReports<T> = StatsBasic & WithReports<T>

export const isSuccess = (stats: StatsBasic) => stats.failure === 0

export const isFailure = (stats: StatsBasic) => stats.success === 0
