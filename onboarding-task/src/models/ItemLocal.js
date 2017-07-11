import { Record } from 'immutable';

const defaultItemLocal = {
  isEdited: false,
};

export const ItemLocal = Record(defaultItemLocal, 'ItemLocal');
