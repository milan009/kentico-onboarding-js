import { Record } from 'immutable';

interface IItem {
  readonly id: string;
  readonly value: string;
}

const defaultValues: IItem = {
  id: '',
  value: '',
};

class Item extends Record(defaultValues) implements IItem {
  readonly id: string;
  readonly value: string;
}

export { Item };
