import { Record } from 'immutable';

import { emptyUuid } from '../utils/constants';

export interface IItemData {
  readonly id: string;
  readonly text: string;
}

const defaultItemData = {
  id: emptyUuid,
  text: '',
};

export class ItemData extends Record(defaultItemData, 'ItemData') implements IItemData {
  readonly id: string;
  readonly text: string;

  constructor(params?: Partial<IItemData>) {
    params ? super(params) : super();
  }

  // Typed merge alias
  typedMerge(itemFlags: Partial<IItemData>): ItemData {
    return this.merge(itemFlags) as this;
  }
}
