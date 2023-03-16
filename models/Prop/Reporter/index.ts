import { Report } from '../Report'

export type Reporter<T> = (seed: number) => Report<T> | undefined
