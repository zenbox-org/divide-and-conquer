import { ZodObject, ZodType } from 'zod'
import { ZodRawShape } from 'zod/lib/types'
import { Filter } from '../generic/models/Filter'
import { Mapper } from '../generic/models/Mapper'
import { todo } from '../utils/todo'

type Seed = number

type Generator<Value> = (s: Seed) => Value

const IsProp: unique symbol = Symbol()

interface Prop<Value> {
  [IsProp]: true
}

type GetFilter<Value> = (p: Prop<Value>) => Filter<Value>

type Render<Value> = (p: Prop<Value>) => string

interface Context<Value> {
  render: Render<Value>
  getFilter: GetFilter<Value>
  generate: Generator<Value>
}

const satisfies = <Value>(ctx: Context<Value>) => (prop: Prop<Value>) => (value: Value) => ctx.getFilter(prop)(value)

type Dyad<Input, Output> = { input: Input, output: Output }

const implies = <Input, Output>(ic: Context<Input>, ioc: Context<Dyad<Input, Output>>) => (ip: Prop<Input>, iop: Prop<Dyad<Input, Output>>) => (map: Mapper<Input, Output>) => (from: Seed, to: Seed) => {
  let invalidValuesCount = 0
  const ipf = ic.getFilter(ip)
  const iopf = ioc.getFilter(iop)
  for (let seed = from; seed < to; seed++) {
    const input = ic.generate(seed)
    if (!ipf(input)) {
      invalidValuesCount++
      break
    }
    const output = map(input)
    const dyad = { input, output }
    if (!iopf(dyad)) {
      return false
    }
  }
  return true
}

type GenValues = <Value>(filter: Filter<Value>) => (generator: Generator<Value>) => (from: Seed, to: Seed) => Value[]
type Theorem = undefined
// export const getTheorems = <In>(inputS: ZodObject<In>) => <Out>(outputS: ZodType<Out>) => Theorem[]

export const getTheorems = <In extends ZodRawShape>(schema: ZodObject<In>) => <Out>(outputS: ZodType<Out>) => todo<Theorem[]>()

const lteOutputsStrings = [
  'If a === b, then result === true',
  'If a < b, then result === true',
  'If a > b, then result === false',
  'If a > b, then result === false',
]
const lteOutputsStructure = [
  { premises: ['a < b'], conclusions: ['result is true'] },
  'If a === b, then a === b',
]

const lteOutputs = [
  { inputFilters: [], duoFilters: [] },
]
