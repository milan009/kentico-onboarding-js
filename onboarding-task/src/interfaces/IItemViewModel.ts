import { IItem } from '../models/Item';

export interface IItemViewModel extends IItem {
  index: number;
  editing: boolean;
}
