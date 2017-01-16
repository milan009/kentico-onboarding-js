import Guid from 'guid';
import { Record } from "immutable";

var defaultNewItem = {
  id: Guid.EMPTY,
  description: '',
  isEdited: false
};

export default class Item extends Record(defaultNewItem) {
  static Create(description){
    return new Item({
      id: Guid.create(),
      description: description
    });
  }
}
