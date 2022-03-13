import {expect} from 'chai'
import {describe, it} from 'mocha'
import { Tlsh } from '../src'
/** Normal distribution random sample which return number between 0-1 with mean at 0.5 */
function randn_bm(): number {
  let u = 0, v = 0;
  while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while(v === 0) v = Math.random();
  let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) return randn_bm() // resample between 0 and 1
  return num
}
describe("Test TLSH", () => {
  let tlsh = new Tlsh()
  beforeEach(() => {
    tlsh.reset()
  })
  it("Test create one simple hash from byte array", () => {
    const input = new Uint8Array(512)
    for (let i = 0; i < input.length; i++) {
      input.set([i % 256], i)
    }
    tlsh.finale(input)
    let hash = tlsh.hash()
    expect(hash).to.be.a.string
  })
  it("Test create one simple hash from string", () => {
    const input = "This is a test text which will be subsequently auto convert into bytes array in TLSH class."
    tlsh.finale(input)
    let hash = tlsh.hash()
    expect(hash).to.be.a.string
  })
  it("Test compare a bit different number array", () => {
    let input = []
    let comparison = []
    for (let i = 0; i < 512; i++) {
      input.push(i)
      comparison.push(i)
    }
    for (let i = 128; i < 144; i++) {
      comparison[i] = i - 100
    }
    tlsh.finale(Uint8Array.from(input))
    let other = new Tlsh()
    other.finale(Uint8Array.from(comparison))
    let diff = tlsh.totalDiff(other)
    expect(diff).to.not.eq(0)
  })
  it("Test compare two strings using tlsh", () => {
    const input = "This is a test text which will be subsequently auto convert into bytes array in TLSH class."
    tlsh.finale(input)
    let other = "This is a test text with subtle change which will be subsequently auto convert into bytes array in TLSH class."
    let otherHasher = new Tlsh()
    otherHasher.finale(other)
    const diff = tlsh.totalDiff(otherHasher)
    expect(diff).to.not.eq(0)
  })
  it("Test compare few chars different", () => {
    const input = "This is a test text which will be subsequently auto convert into bytes array in TLSH class."
    tlsh.finale(input)
    let other = "This is a test txt which will be subsequently auto convert into bytes array in TLSH class."
    let otherHasher = new Tlsh()
    otherHasher.finale(other)
    const diff = tlsh.totalDiff(otherHasher)
    expect(diff).to.not.eq(0)
  })
  it("Test compare exactly the same string", () => {
    const input = "This is a test text which will be subsequently auto convert into bytes array in TLSH class."
    tlsh.finale(input)
    let otherHasher = new Tlsh()
    otherHasher.finale(input)
    const diff = tlsh.totalDiff(otherHasher)
    expect(diff).to.eq(0)
  })
  it("Test compare a bit different from large number array with normal distribution", () => {
    let input = []
    let comparison = []
    for (let i = 0; i < 65535; i++) {
      let rand = Math.floor(randn_bm() * 100)
      input.push(rand)
      comparison.push(rand)
    }
    for (let i = 0; i < 3; i++) {
      // Randomly insert another normal distribution with mean shift by 50
      let rand = 50 + Math.floor(randn_bm() * 100)
      comparison[i] = rand
    }
    tlsh.finale(Uint8Array.from(input))
    let other = new Tlsh()
    other.finale(Uint8Array.from(comparison))
    let diff = tlsh.totalDiff(other)
    expect(diff).to.eq(0)
  })
  it("Test compare a large different from large number array with normal distribution", () => {
    let input = []
    let comparison = []
    for (let i = 0; i < 65536; i++) {
      let rand = Math.floor(randn_bm() * 100)
      input.push(rand)
      comparison.push(rand)
    }
    for (let i = 0; i < 1024; i++) {
      let rand = 50 + Math.floor(randn_bm() * 1024)
      comparison[i] = rand
    }
    tlsh.finale(Uint8Array.from(input))
    let other = new Tlsh()
    other.finale(Uint8Array.from(comparison))
    let diff = tlsh.totalDiff(other)
    expect(diff).to.not.eq(0)
  })
})