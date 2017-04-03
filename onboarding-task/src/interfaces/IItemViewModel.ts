import { IItem } from '../interfaces/IItem';

export interface IItemViewModel extends IItem {
  index: number;
  editFormVisible: boolean;
}
