import { IItem } from './IItem';

export interface IItemViewModel extends IItem {
  index: number;
  editFormVisible: boolean;
}
