import { selectViewItem } from '../../src/containers/ListItem.tsx';

describe('list item container', () => {
  it('should return valid view item record', () => {
    const actualItem = selectViewItem({ guid: '00000', text: 'test' }, { isEdited: false }, 1);
    const expectedItem = ({ guid: '00000', text: 'test', isEdited: false, index: 1 });
    expect(actualItem).toEqual(expectedItem);
  });
});
