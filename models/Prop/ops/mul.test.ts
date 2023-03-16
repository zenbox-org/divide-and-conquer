import { test } from '@jest/globals'
import { integer } from 'fast-check'
import { expectCheckTwoSymmetric } from '../expectCheck'

const mul = (a: number, b: number) => a * b
const mulIsCommutative = (a: number, b: number) => mul(a, b) === mul(b, a)

test(mulIsCommutative.name + ' one-line checker', () => {
  expectCheckTwoSymmetric(mulIsCommutative)(integer())(0, 100)
})
