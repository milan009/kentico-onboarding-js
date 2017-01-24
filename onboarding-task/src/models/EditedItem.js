import { Record } from 'immutable';

const defaultNewItem = {
  description: '',
  isEdited: false,
  isOriginal: false,
};

class EditedItem extends Record(defaultNewItem) {
  constructor(description, isOriginal = false) {
    super({
      isEdited: true,
      isOriginal,
      description,
    });
  }
}

export default EditedItem;
