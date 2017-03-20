import React = require('react');
import { List as ImmutableList } from 'immutable';

import { ListItemContainer } from '../containers/ListItemContainer';
import { CreateListItem } from './CreateListItem';
import { IAction } from '../interfaces/IAction';

interface IListProps {
  itemsOrder: ImmutableList<string>;
  isFetching: boolean;
  error: string;
  successMessage: string;
  onListItemAdd: (text: string) => IAction;
  onListMount: () => IAction;
}

class List extends React.PureComponent<IListProps, undefined> {

  static displayName = 'List';

  componentWillMount() {
    this.props.onListMount();
  }

  render() {
    if (this.props.isFetching) {
      return (
        <div className="angryLoaderMain">
          <div className="load">Loading...</div>
          <div className="hands"></div>
          <div className="body"></div>
          <div className="head">
            <div className="eye"></div>
          </div>
        </div>
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
