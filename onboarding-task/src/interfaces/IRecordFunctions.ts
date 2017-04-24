export interface IRecordFunctions<TRecordData, TRecordFunctions> {
  toObject: () => TRecordData;
  with: (data: Partial<TRecordData>) => TRecordFunctions & TRecordData;
}
