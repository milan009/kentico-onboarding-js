import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import ListItem from './ListItem';
import { CreateListItemContainer } from '../containers/CreateListItemContainer';

class List extends Component {

  static propTypes = {
    items: ImmutablePropTypes.mapOf(
      ImmutablePropTypes.recordOf({
        id: React.PropTypes.string.isRequired,
        text: React.PropTypes.string.isRequired,
        formDisplayed: React.PropTypes.bool.isRequired,
      }),
      React.PropTypes.string.isRequired
    ),
    itemsOrder: ImmutablePropTypes.listOf(
      React.PropTypes.string.isRequired,
    ),
  };

  render() {
    const listItems = this.props.itemsOrder.map((key) =>
      <li key={key} className="list-group-item">
        <ListItem
          item={this.props.items.get(key)}
        />
      </li>
    );

    return (
      <ul className="list-group">
        {listItems}
        <li key="CreateListItemKey" className="list-group-item">
          <CreateListItemContainer />
        </li>
      </ul>
    );
  }
}

export default List;
