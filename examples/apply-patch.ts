import {applyNodePatch} from '@bjoerge/mutiny/_unstable_apply'
import {assign, at, insert, set, setIfMissing} from '@bjoerge/mutiny'

const res = applyNodePatch(at('foo', set('bar')), {other: 'ok'})

const res2 = applyNodePatch(at('arr', insert(['b'], 'before', -1)), {arr: []})
const doc3 = {
  arr: [],
  inner: {
    prop: 1,
  },
} as const

const res3 = applyNodePatch(at('arr', insert(['b'], 'before', -1)), doc3)

const res4 = applyNodePatch(at([], assign({assigned: true})), {foo: 'bar'})

const res5 = applyNodePatch(at([], setIfMissing({wasMissing: 'hello'})), {
  foo: 'bar',
  wasMissing: undefined,
})
