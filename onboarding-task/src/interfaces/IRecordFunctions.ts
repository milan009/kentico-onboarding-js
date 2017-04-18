import { IItem } from './IItem';

export interface IRecordFunctions<TRecordData, TItemDataParameters> {
  toObject: () => TRecordData;
  with: (data: TItemDataParameters) => IItem;
}
