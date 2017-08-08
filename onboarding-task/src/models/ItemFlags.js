import { Record } from 'immutable';

const defaultItemFlags = {
  isBeingEdited: false,
};

export const ItemFlags = Record(defaultItemFlags, 'ItemFlags');
