import { Record } from 'immutable';

interface IViewItem {
  readonly id: string;
  readonly text: string;
  readonly isEdited: boolean;
}

const defaultValues: IViewItem = {
  id: '',
  text: '',
  isEdited: false,
};

class ViewItem extends Record(defaultValues) implements IViewItem {
  readonly id: string;
  readonly text: string;
  readonly isEdited: boolean;
}

export { IViewItem, ViewItem };
