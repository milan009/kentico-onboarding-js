import { selectViewItem } from '../../src/containers/ListItem.jsx';
import { ViewItemRecord } from '../../src/utils/itemRecord.ts';

describe('list item container', () => {
  it('should return valid view item record', () => {
    const actualItem = selectViewItem({guid:'00000',text: 'test'}, { isEdited:false });
    const expectedItem = new ViewItemRecord({ guid: '00000', text: 'test', isEdited: false });
    expect(actualItem).toEqual(expectedItem);
  });
});
