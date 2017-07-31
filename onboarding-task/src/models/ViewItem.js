const defaultViewItem = {
  id: '00000000-0000-0000-0000-000000000000',
  index: 0,
  text: '',
  isBeingEdited: false,
};

export class ViewItem {
  constructor(props = defaultViewItem) {
    return { ...props };
  }
}
