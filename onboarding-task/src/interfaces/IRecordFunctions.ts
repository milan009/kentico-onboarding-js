// import { Map } from 'immutable';
import { IItem } from './IItem';

export interface IRecordFunctions<TRecordData, TOptionalRecordData> {
  toObject: () => TRecordData;
  // set: (key: string, value: string | boolean) => IItem;
  // merge: (data: TRecordData) => IItem;
  with: (data: TOptionalRecordData) => IItem;
}
