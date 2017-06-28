/**
 * Created by MilanJ on 28.6.2017.
 */
import { Record } from 'immutable';

class ItemRecord extends Record({
  id: undefined,
  text: undefined,
  isEdited: undefined,
}) {
  constructor(id, text, isEdited = false) {
    super({
      id,
      text,
      isEdited,
    }, 'ItemRecord');
  }
}

export { ItemRecord };
