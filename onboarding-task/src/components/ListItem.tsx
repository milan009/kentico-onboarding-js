import * as React from 'react';
import { ListItemEditable } from './ListItemEditable';
import { ListItemStatic } from './ListItemStatic';
import { IItemView } from '../models/IItemView';
import { IAction } from '../actions/IAction';

interface IListItemProps {
  item: IItemView;
  index: number;
  onToggleEditMode: () => IAction;
  onUpdateText: (text: string) => IAction;
  onDelete: () => IAction;
}

const ListItem: React.StatelessComponent<IListItemProps> = (props: IListItemProps) => (
(props.item.isEdited) ?
  <ListItemEditable
    key={props.item.guid}
    item={props.item}
    onUpdateText={props.onUpdateText}
    onToggleEditMode={props.onToggleEditMode}
    onDelete={props.onDelete}
    index={props.index}
  />
  : <ListItemStatic
    key={props.item.guid}
    item={props.item}
    onToggleEditMode={props.onToggleEditMode}
    index={props.index}
  />
);

ListItem.propTypes = {
  item: React.PropTypes.shape({
    guid: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    isEdited: React.PropTypes.bool.isRequired,
  }),
  index: React.PropTypes.number.isRequired,
  onToggleEditMode: React.PropTypes.func.isRequired,
  onUpdateText: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
};

export { ListItem };
