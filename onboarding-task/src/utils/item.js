import * as Immutable from 'immutable';
import { isStorable } from './text';

const getStorableEditedItems = editedItems => Immutable
  .Seq(editedItems)
  .filter(item => item.isEdited)
  .filter(item => isStorable(item.description));

export { getStorableEditedItems };
