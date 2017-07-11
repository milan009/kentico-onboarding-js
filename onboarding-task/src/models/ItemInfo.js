import { Record } from 'immutable';

const defaultItemInfo = {
  isEdited: false,
};

export const ItemInfo = Record(defaultItemInfo, 'ItemInfo');
