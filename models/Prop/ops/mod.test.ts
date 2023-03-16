import { integer } from 'fast-check'
import { testArb, testArbImplyTwoSym, testArbTwoSym } from '../testArb'

const abs = Math.abs
const mod = (a: number, b: number) => a % b
const modZeroIsZero = (b: number) => 0 % b === 0
const modAbsIsLessThanB = (a: number, b: number) => abs(a % b) < abs(b)

testArb(modZeroIsZero)(integer())

testArbTwoSym(modAbsIsLessThanB)(integer())

const modIsZero = (a: number, b: number) => a % b === 0 // not really, but...
const aIsZero = (a: number, b: number) => a === 0 // ... we can pre-filter `a` to make sure `modIsZero` works

testArbImplyTwoSym(aIsZero, modIsZero)(integer()) // the only issue is that integer() generates 0 very rarely, so our test skips too many values...

// const f = (a: number, b: number) => false
//
// testArbImplyTwoSym(aIsZero, f)(integer()) // I'm feeling lucky
