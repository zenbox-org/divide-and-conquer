import { Filter } from '../../../generic/models/Filter'

export interface Prop<Val> {
  pre: Filter<Val> // premise
  post: Filter<Val> // conclusion
}

// type Input = { a: number, b: number }
// const addIsCommutative: Prop<Input> = {
//   pre: AlwaysTrue,
//   post: ({ a, b }: Input) => add(a, b) === add(b, a),
// }
