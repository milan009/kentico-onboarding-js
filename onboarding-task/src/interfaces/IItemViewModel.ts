import { IItem } from '../models/Item';

export interface IItemViewModel extends IItem {
  readonly index: number;
  readonly editing: boolean;
}
