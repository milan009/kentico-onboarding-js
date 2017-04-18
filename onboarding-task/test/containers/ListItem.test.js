import { selectViewItem } from '../../src/containers/ListItem.jsx';

describe('list item container', () => {
  it('should return valid view item record', () => {
    const actualItem = selectViewItem({ guid: '00000', text: 'test'}, { isEdited: false });
    const expectedItem = ({ guid: '00000', text: 'test', isEdited: false });
    expect(actualItem).toEqual(expectedItem);
  });
});
