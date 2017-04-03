import React = require('react');
import { List as ImmutableList } from 'immutable';

import { ListItemContainer } from '../containers/ListItemContainer';
import { CreateListItem } from './CreateListItem';
import { IAction } from '../interfaces/IAction';
import { Loader } from './Loader';
import { StatusMessage } from './StatusMessage';

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

      return (
        <div>
          <StatusMessage successMessage={this.props.successMessage} error={this.props.error} />
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
