import { Record } from 'immutable';

interface IItemRecord {
  id?: string;
  text?: string;
}

const defaultValues: IItemRecord = {
  id: undefined,
  text: undefined,
};

class ItemRecord extends Record(defaultValues) implements IItemRecord {
  id: string;
  text: string;
}

export { ItemRecord };
