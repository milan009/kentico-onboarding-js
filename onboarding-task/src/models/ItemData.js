import { Record } from 'immutable';

const defaultItemData = {
  text: '',
};

export const ItemData = Record(defaultItemData, 'ItemData');
