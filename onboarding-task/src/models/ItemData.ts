import { Record } from 'immutable';

export interface IItemData {
  id: string;
  text: string;
}

const defaultItemData = {
  id: '00000000-0000-0000-0000-000000000000',
  text: '',
};

export class ItemData extends Record(defaultItemData, 'ItemData') implements IItemData {
  id: string;
  text: string;

  constructor(params?: IItemData) {
    params ? super(params) : super();
  }
}

export interface IItemDataRecord extends ItemData {}
