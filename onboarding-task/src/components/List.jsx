import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { ListItemContainer } from '../containers/ListItemContainer.ts';
import { CreateListItem } from './CreateListItem.tsx';

class List extends PureComponent {

  static propTypes = {
    itemsOrder: ImmutablePropTypes.listOf(
      React.PropTypes.string.isRequired,
    ),
    onListItemAdd: React.PropTypes.func.isRequired,
  };

  render() {
    const listItems = this.props.itemsOrder.map((key) =>
      <li key={key} className="list-group-item">
        <ListItemContainer
          id={key}
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
