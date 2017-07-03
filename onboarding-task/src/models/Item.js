import { Record } from 'immutable';

const defaultItem = {
  id: 0,
  text: '',
  isEdited: false,
};

export const Item = Record(defaultItem, 'Item');

