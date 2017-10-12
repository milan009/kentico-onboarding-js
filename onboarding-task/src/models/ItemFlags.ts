import { TypedRecord } from './TypedRecord';

export interface IItemFlags {
  readonly isBeingEdited: boolean;
  readonly isStored: boolean;
  readonly error?: any;
}

const defaultItemFlags: IItemFlags = {
  isBeingEdited: false,
  isStored: false,
  error: null,
};

export class ItemFlags extends TypedRecord<IItemFlags, ItemFlags>(defaultItemFlags, 'ItemFlags') implements IItemFlags {
  readonly isBeingEdited: boolean;
  readonly isStored: boolean;
  readonly error: any;
}

