import { Record } from 'immutable';

interface IViewItem {
  readonly text: string;
  readonly isEdited: boolean;
  readonly index: number;
}

const defaultValues: IViewItem = {
  text: '',
  isEdited: false,
  index: 0,
};

class ViewItem extends Record(defaultValues) implements IViewItem {
  readonly index: number;
  readonly text: string;
  readonly isEdited: boolean;
}

export { IViewItem, ViewItem };
