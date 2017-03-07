import { Record } from 'immutable';

interface IItem {
  id: string;
  value: string;
}

const defaultValues: IItem = {
  id: '',
  value: '',
};

class Item extends Record(defaultValues) implements IItem {
  id: string;
  value: string;
}

export { Item, IItem };
