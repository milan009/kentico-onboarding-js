/**
 * Created by MilanJ on 3.7.2017.
 */

import { Record } from 'immutable';

class Item extends Record({
  id: undefined,
  text: undefined,
  isEdited: undefined,
}) {
  constructor(id, text, isEdited = false) {
    super({
      id,
      text,
      isEdited,
    }, 'Item');
  }
}
