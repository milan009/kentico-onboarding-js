import { IItemData } from './IItem';

export interface IItemViewModel extends IItemData {
  readonly index: number;
}
