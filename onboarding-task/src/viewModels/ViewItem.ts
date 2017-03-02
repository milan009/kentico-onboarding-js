import { Record } from 'immutable';

interface IViewItem {
  id?: string;
  text: string;
  isEdited: boolean;
}

const defaultValues: IViewItem = {
  id: undefined,
  text: '',
  isEdited: false,
};

class ViewItem extends Record(defaultValues) implements IViewItem {
  id: string;
  text: string;
  isEdited: boolean;
}

export { IViewItem, ViewItem };
