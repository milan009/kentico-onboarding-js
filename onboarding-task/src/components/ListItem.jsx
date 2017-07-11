import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ViewItem from './ViewItem';
import { EditItem } from '../containers/EditItemContainer';

class ListItem extends PureComponent {

  static displayName = 'ListItem';

  static propTypes = {
    index: PropTypes.number.isRequired,
    item: PropTypes.shape({
      isEdited: PropTypes.bool.isRequired,
    }).isRequired,
  };

  render() {
    let item;
    if (this.props.item.isEdited) {
      item = (<EditItem
        index={this.props.index}
        item={this.props.item}
      />);
    }
    else {
      item = (<ViewItem
        index={this.props.index}
        item={this.props.item}
      />);
    }

    return (
      <li className="list-group-item">
        {item}
      </li>);
  }
}

export { ListItem };
