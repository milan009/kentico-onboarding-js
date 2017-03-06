import memoize from 'memoizee';
import { ViewItemRecord } from '../utils/itemRecord';

const selectViewItem = memoize((state, guid) => {
  const itemData = state.itemsById.get(guid);
  const itemFlags = state.itemsFlags.get(guid);
  return new ViewItemRecord({ guid: itemData.guid, text: itemData.text, isEdited: itemFlags.isEdited });
});

export { selectViewItem };
