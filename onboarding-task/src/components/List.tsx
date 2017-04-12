import * as React from 'react';
const ImmutablePropTypes = require('react-immutable-proptypes');
import { OrderedSet, OrderedMap } from 'immutable';

import { Item } from '../containers/Item';
import { AddForm } from './AddForm';
import { ErrorNotification } from './ErrorNotification';
import { IAction } from '../actions/IAction';
import { IErrorMessage } from '../models/ErrorMessage';

interface IListDataProps {
  itemIds: OrderedSet<string>;
  errorMessages: OrderedMap<string, IErrorMessage>;
}

interface IListCallbackProps {
  addItem: (text: string) => Promise<IAction>;
  deleteErrorMessage: (text: string) => IAction;
}

const List: React.StatelessComponent<IListDataProps & IListCallbackProps> = ({ itemIds, errorMessages, addItem, deleteErrorMessage}) => (
  <div className="row">
    <ErrorNotification errorMessages={errorMessages} deleteErrorMessage={deleteErrorMessage} />
    <div className="col-sm-12 col-md-offset-2 col-md-8">
      <ul className="list-group">
        {itemIds.valueSeq().map((id: string, index: number) =>
          <li className="list-group-item" key={id}>
            <Item index={index} id={id} />
          </li>
        )}
        <li className="list-group-item">
          <AddForm onAdd={addItem} />
        </li>
      </ul>
    </div>
  </div>
);

List.displayName = 'List';

List.propTypes = {
  itemIds: ImmutablePropTypes.orderedSetOf(React.PropTypes.string).isRequired,
  addItem: React.PropTypes.func.isRequired,
  errorMessages: ImmutablePropTypes.orderedMapOf(
    ImmutablePropTypes.recordOf({
      id: React.PropTypes.string.isRequired,
      message: React.PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteErrorMessage: React.PropTypes.func.isRequired,
};

export { List };
