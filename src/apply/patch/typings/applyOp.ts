import type {
  AssignOp,
  DecOp,
  DiffMatchPatchOp,
  IncOp,
  InsertOp,
  Operation,
  ReplaceOp,
  SetIfMissingOp,
  SetOp,
  UnassignOp,
  UnsetOp,
} from '../../../mutations/operations/types'
import type {Apply, N} from 'hotscript'
import type {ArrayElement, MergeObject} from '../../../utils/typeUtils'

export type ApplyOp<O extends Operation, Current> = Current extends never
  ? never
  : O extends SetOp<infer Next>
  ? Next
  : O extends UnsetOp
  ? undefined
  : O extends SetIfMissingOp<infer Next>
  ? Current extends undefined
    ? Next
    : Current
  : O extends IncOp<infer Amount>
  ? Current extends number
    ? number extends Current
      ? number
      : Apply<N.Add, [Current, Amount]>
    : Current
  : O extends DecOp<infer Amount>
  ? Current extends number
    ? number extends Current
      ? number
      : Apply<N.Sub, [Current, Amount]>
    : Current
  : O extends InsertOp<infer Items, infer Pos, infer Ref>
  ? Current extends any[]
    ? (ArrayElement<Items> | ArrayElement<Current>)[]
    : never
  : O extends ReplaceOp<infer Items, infer Ref>
  ? Current extends any[]
    ? (ArrayElement<Items> | ArrayElement<Current>)[]
    : never
  : O extends AssignOp<infer K>
  ? MergeObject<Current & K>
  : O extends UnassignOp<infer K>
  ? Omit<Current, ArrayElement<K>>
  : O extends DiffMatchPatchOp
  ? string
  : never
