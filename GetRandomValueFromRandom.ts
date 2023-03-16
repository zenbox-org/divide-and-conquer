import { Arbitrary, Random } from 'fast-check'
import { mersenne } from 'pure-rand'

export type GetRandomValue = <T>(arbitrary: Arbitrary<T>) => T

export const getRandomValueFromRandom = (random: Random) => <T>(arbitrary: Arbitrary<T>) => {
  return arbitrary.generate(random, undefined).value
}

export const getRandomValueFromArbitrary = (seed: number) => getRandomValueFromRandom(new Random(mersenne(seed)))
