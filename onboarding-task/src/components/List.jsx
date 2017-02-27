import React, { Component } from 'react';
import ImmutableProptypes from 'react-immutable-proptypes';

import ListItem from './ListItem';
import { CreateListItemContainer } from '../containers/CreateListItemContainer';

class List extends Component {

  static propTypes = {
    items: ImmutableProptypes.mapOf(
      ImmutableProptypes.recordOf({
        id: React.PropTypes.string.isRequired,
        text: React.PropTypes.string.isRequired,
        formDisplayed: React.PropTypes.bool.isRequired,
      }),
      React.PropTypes.string.isRequired
    ),
    itemsOrder: ImmutableProptypes.listOf(
      React.PropTypes.string.isRequired,
    ),
  };

  render() {
    const listItems = this.props.itemsOrder.map((key, index) =>
      <li key={key} className="list-group-item">
        <ListItem
          id={key}
          formDisplayed={this.props.items.get(key).formDisplayed}
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
