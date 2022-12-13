import { GenericState } from './models/GenericState'

export function err<Data, Output, Error>(state: GenericState<Data, Output, Error>, error: Error): GenericState<Data, Output, Error> {
  return {
    data: state.data,
    output: undefined,
    error,
  }
}
