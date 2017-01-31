import { v4 as guid } from 'uuid';
import { Record } from 'immutable';

const defaultItem = {
  id: '00000000-0000-0000-0000-000000000000',
  description: '',
};

class Item extends Record(defaultItem) {
  constructor(description) {
    super({
      id: guid(),
      description,
    });
  }
}

export default Item;
