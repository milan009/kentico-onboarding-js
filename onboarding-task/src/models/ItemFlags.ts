import { Record } from 'immutable';

export interface IItemFlags {
  isBeingEdited: boolean;
}

const defaultItemFlags = {
  isBeingEdited: false,
};

export class ItemFlags extends Record(defaultItemFlags, 'ItemFlags') implements IItemFlags {
  isBeingEdited: boolean;

  constructor(params?: IItemFlags) {
    params ? super(params) : super();
  }

  // Typed merge alias
  typedMerge(itemFlags: IItemFlags): IItemFlags {
    return this.merge(itemFlags) as this;
  }
}

export interface IItemFlagsRecord extends ItemFlags {}

