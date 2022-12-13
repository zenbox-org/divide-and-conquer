export interface GenericState<Data, Out, Err> {
  data: Data
  output?: Out
  error?: Err
}
