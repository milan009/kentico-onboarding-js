import { Record } from 'immutable';

export interface IItemFlags {
  isBeingEdited: boolean;
}

const defaultItemFlags = {
  isBeingEdited: false,
};

const ItemFlagsRecord = Record(defaultItemFlags, 'ItemFlags');

export class ItemFlags extends ItemFlagsRecord implements IItemFlags {
  isBeingEdited: boolean;
}
