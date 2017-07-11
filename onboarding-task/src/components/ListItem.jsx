import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ViewItem } from '../components/ViewItem';
import { EditItem } from '../components/EditItem';

class ListItem extends PureComponent {

  static displayName = 'ListItem';

  static propTypes = {
    item: PropTypes.shape({
      index: PropTypes.number.isRequired,
      isEdited: PropTypes.bool.isRequired,
    }).isRequired,

    onClick: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  render() {
    let item;
    if (this.props.item.isEdited) {
      item = (<EditItem
        item={this.props.item}
        onDelete={this.props.onDelete}
        onSave={this.props.onSave}
        onCancel={this.props.onCancel}
      />);
    }
    else {
      item = (<ViewItem
        item={this.props.item}
        onClick={this.props.onClick}
      />);
    }

    return (
      <li className="list-group-item">
        {item}
      </li>);
  }
}

export { ListItem };
