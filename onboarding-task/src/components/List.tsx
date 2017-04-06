import * as React from 'react';
const ImmutablePropTypes = require('react-immutable-proptypes');
import { OrderedSet, OrderedMap } from 'immutable';

import { Item } from '../containers/Item';
import { AddForm } from './AddForm';
import { ErrorNotification } from './ErrorNotification';
import { IAction } from '../actions/IAction';
import { IErrorMessage } from '../models/ErrorMessage';

interface IListProps {
  itemIds: OrderedSet<string>;
  addItem: (text: string) => Promise<IAction>;
  errorMessages: OrderedMap<string, IErrorMessage>;
  deleteErrorMessage: (text: string) => IAction;
}

class List extends React.PureComponent<IListProps, undefined> {
  static displayName = 'List';

  static propTypes = {
    itemIds: ImmutablePropTypes.orderedSetOf(React.PropTypes.string).isRequired,
    addItem: React.PropTypes.func.isRequired,
    errorMessages: React.PropTypes.object,
    deleteErrorMessage: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="row">
        <ErrorNotification errorMessages={this.props.errorMessages} deleteErrorMessage={this.props.deleteErrorMessage} />
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <ul className="list-group">
            {this.props.itemIds.valueSeq().map((id: string, index: number) =>
              <li className="list-group-item" key={id}>
                <Item index={index} id={id} />
              </li>
            )}
            <li className="list-group-item">
              <AddForm onAdd={this.props.addItem} />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export { List };
