import { Record } from 'immutable';

interface IItemFlags {
  readonly editMode: boolean;
}

const defaultValues: IItemFlags = {
  editMode: false,
};

class ItemFlags extends Record(defaultValues) implements IItemFlags {
  readonly editMode: boolean;
}

export { ItemFlags };
