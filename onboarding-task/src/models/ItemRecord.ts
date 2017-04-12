import { Record } from 'immutable';

interface IItemRecord {
  readonly id: string;
  readonly text: string;
}

interface IItemDefaultValues {
  readonly id?: string;
  readonly text?: string;
}

const itemDefaultValues: IItemDefaultValues = {
  id: undefined,
  text: undefined,
};

class ItemRecord extends Record(itemDefaultValues) implements IItemRecord {
  readonly id: string;
  readonly text: string;
}

export { ItemRecord };
