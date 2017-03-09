import React = require('react');
import { List as ImmutableList } from 'immutable';

import { ListItemContainer } from '../containers/ListItemContainer';
import { CreateListItem } from './CreateListItem';
import { IAction } from '../interfaces/IAction';

interface IListProps {
  itemsOrder: ImmutableList<string>;
  onListItemAdd: (text: string) => IAction;
}

class List extends React.PureComponent<IListProps, undefined> {

  static displayName = 'List';

  render() {
    const listItems = this.props.itemsOrder.map((key) =>
      <li key={key} className="list-group-item">
        <ListItemContainer
          id={key as string}
        />
      </li>
    );

    return (
      <ul className="list-group">
        {listItems}
        <li key="CreateListItemKey" className="list-group-item">
          <CreateListItem onListItemAdd={this.props.onListItemAdd} />
        </li>
      </ul>
    );
  }
}

export { List };
