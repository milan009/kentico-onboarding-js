import * as React from 'react';
import * as PropTypes from 'prop-types';

import { ViewItem } from './ViewItem';
import { EditItem } from './EditItem';
import { IViewItem } from '../models/ViewItem';

export interface IListItemDataProps {
  item: IViewItem;
}

export interface IListItemCallbackProps {
  onClick: () => void;
  onDelete: () => void;
  onSave: (text: string) => void;
  onCancel: () => void;
}

const ListItem: React.StatelessComponent<IListItemDataProps & IListItemCallbackProps> = (props) => (
  <div>
    {props.item.isStored ? null :
      <div className="alert alert-warning">
        <span className="glyphicon glyphicon-warning-sign" />
        <span> This item has not yet been saved to the database</span>
      </div>}
    {props.item.isBeingEdited ? (
      <EditItem
        item={props.item}
        onDelete={props.onDelete}
        onSave={props.onSave}
        onCancel={props.onCancel}
      />
    ) : (
      <ViewItem
        item={props.item}
        onClick={props.onClick}
      />)}
  </div>
);

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  item: PropTypes.shape({
    index: PropTypes.number.isRequired,
    isBeingEdited: PropTypes.bool.isRequired,
  }).isRequired,

  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export { ListItem };
