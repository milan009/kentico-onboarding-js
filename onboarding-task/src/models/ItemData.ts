import { Record } from 'immutable';

export interface IItemData {
  id: string;
  text: string;
}

const defaultItemData = {
  id: '00000000-0000-0000-0000-000000000000',
  text: '',
};

const ItemDataRecord = Record(defaultItemData, 'ItemData');

export class ItemData extends ItemDataRecord implements IItemData {
  id: string;
  text: string;
}
