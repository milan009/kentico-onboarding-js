import { Record } from 'immutable';

const defaultItem = {
  id: '00000000-0000-0000-0000-000000000000',
  text: '',
  isEdited: false,
};

export const Item = Record(defaultItem, 'Item');
