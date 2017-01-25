import * as Immutable from 'immutable';
import { isNotEmpty } from './text';

const getStorableEditedItems = editedItems => Immutable
  .Seq(editedItems)
  .filter(item => !item.isOriginal)
  .filter(item => isNotEmpty(item.description))
  .toMap();

export { getStorableEditedItems };
