import {Features} from './Features.js'
import { 
  equal,
  assert,
  assertEquals,
  assertNotEquals,
  assertStrictEquals,
  assertStringIncludes,
  assertMatch,
  assertNotMatch,
  assertArrayIncludes,
  assertObjectMatch,
  assertThrows,
  assertThrowsAsync } from "https://deno.land/std@0.95.0/testing/asserts.ts"


Deno.test("Features is an object", () => 
  assertEquals(typeof new Features, typeof {})
)

Deno.test("Get a feature", () => {
  let features = new Features()
  features.set('gender', 'common')
  assertEquals(features.get('gender'), 'common')
})

Deno.test("Set a feature", () => {
  let features = new Features()
  features.set('gender', 'masculine')

  assert(features.get('gender') === 'masculine')
})

Deno.test('Set a feature entry', () => {
  let features = new Features()
  features.set(['gender', 'masculine'])
  assert(features.get('gender') === 'masculine')
})

Deno.test("Delete a feature", () => {
  let features = new Features()
  features.delete('gender')

  assertEquals(features.gender, undefined)
})

Deno.test("Has a feature", () => {
  let features = new Features()
  features.set('gender', 'feminine')
  assertEquals(features.has("gender"), true)
})

Deno.test("Can initialize from feature object", () => {
  let featureObject = { gender: "masculine", number: "singular", "case": "nominative"}
  let features = new Features(featureObject)
  assert(features.has("case"))
})


Deno.test("Can initialize from feature entries", () => {
  let featureEntries = [ [ "gender", "masculine" ], [ "number", "singular" ], [ "case", "nominative" ] ]
  let features = new Features(featureEntries)
  assert(features.has("case"))
})

Deno.test("Can map features", () => {
  let featureObject = { gender: "masculine", number: "singular", case: "nominative"}
  let features = new Features(featureObject)

  const actualValues = Array.from(features.entries()).map(([name, value]) => value)
  const expectedValues = ["masculine", "singular", "nominative"]

  assertEquals(actualValues, expectedValues)
})
