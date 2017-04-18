import { IRecordFunctions } from './IRecordFunctions';

export interface IItemDataParameters {
  readonly id?: string;
  readonly text?: string;
  readonly isEdited?: boolean;
}

export interface IItemData extends IItemDataParameters {
  readonly id: string;
  readonly text: string;
  readonly isEdited: boolean;
}

export interface IItem extends IItemData, IRecordFunctions<IItemData, IItemDataParameters> {}


