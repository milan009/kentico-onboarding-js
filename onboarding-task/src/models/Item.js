/**
 * Created by MilanJ on 3.7.2017.
 */

import { Record } from 'immutable';

export const Item = Record({
  id: 0,
  text: '',
  isEdited: false,
}, 'Item');

