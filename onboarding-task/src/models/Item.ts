import { Record } from 'immutable';

interface IItem {
  id: string;
  text: string;
}

const defaultValues: IItem = {
  id: '',
  text: '',
};

class Item extends Record(defaultValues) implements IItem {
  id: string;
  text: string;
}

export { Item, IItem };

