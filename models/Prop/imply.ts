import { Filter, FilterTwo } from '../../../generic/models/Filter'

export const imply = <T>(premise: Filter<T>, conclusion: Filter<T>): Filter<T> => (a) => premise(a) ? conclusion(a) : true

export const implyTwo = <T>(premise: FilterTwo<T>, conclusion: FilterTwo<T>): FilterTwo<T> => (a, b) => premise(a, b) ? conclusion(a, b) : true
