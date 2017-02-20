/**
 * Created by IvanJ on 20.2.2017.
 */
import Immutable from 'immutable';
import { generateGuid } from './generateGuid';
import { itemRecord } from './itemRecord';

function getInitialState() {
  const firstItem = itemRecord({ guid: generateGuid(), text: 'serus', isEdited: false });
  const secondItem = itemRecord({ guid: generateGuid(), text: 'soj', isEdited: false });
  const thirdItem = itemRecord({ guid: generateGuid(), text: 'nazdar', isEdited: false });

  return {
    items: Immutable.Map({
      [firstItem.get('guid')]: firstItem,
      [secondItem.get('guid')]: secondItem,
      [thirdItem.get('guid')]: thirdItem,
    }),
  };
}
export { getInitialState };
