import Immutable from 'immutable';
import { generateGuid } from './generateGuid';
import { itemRecord } from './itemRecord';

function getInitialState() {
  const firstItem = new itemRecord({ guid: generateGuid(), text: 'serus', isEdited: false });
  const secondItem = new itemRecord({ guid: generateGuid(), text: 'soj', isEdited: false });
  const thirdItem = new itemRecord({ guid: generateGuid(), text: 'nazdar', isEdited: false });

  const initState = {
    items: Immutable.Map({
      [firstItem.guid]: firstItem,
      [secondItem.guid]: secondItem,
      [thirdItem.guid]: thirdItem,
    }),
  };
  return initState;
}
export { getInitialState };
