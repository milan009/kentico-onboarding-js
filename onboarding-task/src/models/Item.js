import { v4 as guid } from 'uuid';
import { Record } from 'immutable';

const defaultNewItem = {
  id: '00000000-0000-0000-0000-000000000000',
  description: '',
  isEdited: false
};

export default class Item extends Record(defaultNewItem) {
  static Create(description){
    return new Item({
      id: guid(),
      description: description
    });
  }
}
