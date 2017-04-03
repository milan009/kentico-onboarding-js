import React = require('react');
import { List as ImmutableList } from 'immutable';

import { ListItemContainer } from '../containers/ListItemContainer';
import { CreateListItem } from './CreateListItem';
import { IAction } from '../interfaces/IAction';
import { Loader } from './Loader';

interface IListProps {
  readonly itemsOrder: ImmutableList<string>;
  readonly isFetching: boolean;
  readonly error: string;
  readonly successMessage: string;
  readonly onListItemAdd: (text: string) => Promise<IAction>;
  readonly onListMount: () => Promise<IAction>;
}

class List extends React.PureComponent<IListProps, undefined> {

  static displayName = 'List';

  componentWillMount() {
    this.props.onListMount();
  }

  render() {
    if (this.props.isFetching) {
      return (
        <Loader />
      );
    } else {
      const listItems = this.props.itemsOrder.map((key) =>
        <li key={key} className="list-group-item">
          <ListItemContainer
            id={key as string}
          />
        </li>
      );

      const error = this.props.error && this.props.error !== ''
        ? (<div className="alert alert-danger" role="alert">
          <strong>Error!</strong> {this.props.error}
        </div> )
        : '';

      const successMessage = this.props.successMessage && this.props.successMessage !== ''
        ? (<div className="alert alert-success" role="alert">
          <strong>Success!</strong> {this.props.successMessage}
        </div> )
        : '';

      return (
        <div>
          {error}
          {successMessage}
          <ul className="list-group">

            {listItems}
            <li key="CreateListItemKey" className="list-group-item">
              <CreateListItem onListItemAdd={this.props.onListItemAdd}/>
            </li>
          </ul>
        </div>
      );
    }
  }
}

export { List };
