import { Record } from 'immutable';

import { emptyUuid } from '../utils/constants';

export interface IItemData {
  id?: string;
  text: string;
}

const defaultItemData = {
  id: emptyUuid,
  text: '',
};

export class ItemData extends Record(defaultItemData, 'ItemData') implements IItemData {
  id: string;
  text: string;

  constructor(params?: IItemData) {
    params ? super(params) : super();
  }

  // Typed merge alias
  typedMerge(itemFlags: IItemData): ItemData {
    return this.merge(itemFlags) as this;
  }
}
