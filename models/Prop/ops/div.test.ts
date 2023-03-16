import { test } from '@jest/globals'
import { integer } from 'fast-check'
import { expectCheckTwoSymStochDef } from '../expectCheck'

const div = (a: number, b: number) => a / b
const divIsCommutativeFailing = (a: number, b: number) => div(a, b) === div(b, a)

test.skip(divIsCommutativeFailing.name + ' one-line checker', () => {
  expectCheckTwoSymStochDef(divIsCommutativeFailing)(integer())
})
