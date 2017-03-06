import { Record } from 'immutable';

interface IItemRecord {
  id: string;
  text: string;
}

interface IItemDefaultValues {
  id?: string;
  text?: string;
}

const itemDefaultValues: IItemDefaultValues = {
  id: undefined,
  text: undefined,
};

class ItemRecord extends Record(itemDefaultValues) implements IItemRecord {
  id: string;
  text: string;
}

export { ItemRecord };
