import { IItem } from './IItem';

export interface IRecordFunctions<TRecordData> {
  toObject: () => TRecordData;
  with: (data: Partial<TRecordData>) => IItem;
}
