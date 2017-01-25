import { Record } from 'immutable';

const defaultNewItem = {
  description: '',
  isOriginal: true,
};

class EditedItem extends Record(defaultNewItem) {
}

export default EditedItem;
