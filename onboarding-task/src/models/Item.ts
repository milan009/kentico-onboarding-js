import { Record } from 'immutable';

interface IItem {
  id?: string;
  text: string;
}

const defaultValues: IItem = {
  id: undefined,
  text: '',
};

class Item extends Record(defaultValues) implements IItem {
  id: string;
  text: string;
}

export { Item, IItem };

