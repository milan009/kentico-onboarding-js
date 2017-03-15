import * as Immutable from 'immutable';
import { generateGuid } from './generateGuid';
import { ItemRecord } from '../models/ItemRecord';
import {IListState} from "../containers/List";

function getInitialState(): IListState {
  const firstItem = new ItemRecord({ guid: generateGuid(), text: 'serus' });
  const secondItem = new ItemRecord({ guid: generateGuid(), text: 'soj' });
  const thirdItem = new ItemRecord({ guid: generateGuid(), text: 'nazdar' });

  const initState: IListState = {
    itemsById: Immutable.Map({
      [firstItem.guid]: firstItem,
      [secondItem.guid]: secondItem,
      [thirdItem.guid]: thirdItem,
    }),
    itemsFlags: Immutable.Map({
      [firstItem.guid]: { isEdited: true },
      [secondItem.guid]: { isEdited: false },
      [thirdItem.guid]: { isEdited: false },
    }),
    itemsOrder: Immutable.OrderedSet([firstItem.guid, secondItem.guid, thirdItem.guid]),
  };
  return initState;
}
export { getInitialState };
