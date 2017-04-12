import * as Immutable from 'immutable';
import { generateGuid } from './generateGuid';
import { ItemRecord } from '../models/ItemRecord';
import {IAppState} from '../models/IAppState';

function getInitialState(): IAppState {
  const firstItem = new ItemRecord({ guid: generateGuid(), text: 'serus' });
  const secondItem = new ItemRecord({ guid: generateGuid(), text: 'soj' });
  const thirdItem = new ItemRecord({ guid: generateGuid(), text: 'nazdar' });

  const initState: IAppState = {
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
    loaded: true,
    errors: Immutable.Set<Error>(),
  };
  return initState;
}
export { getInitialState };
