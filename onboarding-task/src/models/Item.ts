import { Record } from 'immutable';

interface IItem {
  readonly id: string;
  readonly text: string;
}

const defaultValues: IItem = {
  id: '',
  text: '',
};

class Item extends Record(defaultValues) implements IItem {
  readonly id: string;
  readonly text: string;
}

export { Item, IItem };

