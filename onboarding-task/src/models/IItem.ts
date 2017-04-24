import { IRecordFunctions } from '../interfaces/IRecordFunctions';

export interface IItemData {
  readonly id: string;
  readonly text: string;
  readonly isEdited: boolean;
}

export interface IItem extends IItemData, IRecordFunctions<IItemData, IItem> {}


