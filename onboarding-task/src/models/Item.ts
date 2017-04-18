import { Record } from 'immutable';
import { IItemData, IItem, IItemDataParameters } from '../interfaces/IItem';

const recordData: IItemData = {
  id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  text: '',
  isEdited: false,
};

class Item extends Record(recordData) implements IItem {
  readonly id: string;
  readonly text: string;
  readonly isEdited: boolean;

  toObject() {
    return super.toObject() as IItemData;
  }

  with(data: IItemDataParameters): IItem {
    return super.merge(data) as Item;
  }
}

export { Item };
