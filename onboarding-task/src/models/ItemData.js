import { Record } from 'immutable';

const defaultItemData = {
  id: '00000000-0000-0000-0000-000000000000',
  text: '',
};

export const ItemData = Record(defaultItemData, 'ItemData');
