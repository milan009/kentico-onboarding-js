import { Record } from 'immutable';

const defaultNewItem = {
  description: '',
  isEdited: true,
  isOriginal: true,
};

class EditedItem extends Record(defaultNewItem) {
}

export default EditedItem;
