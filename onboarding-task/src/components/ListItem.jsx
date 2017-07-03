import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ViewItem } from './ViewItem';
import { EditItem } from './EditItem';
import { Item } from '../models/Item';

class ListItem extends PureComponent {

  static displayName = 'ListItem';

  static propTypes = {
    index: PropTypes.number.isRequired,
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      isEdited: PropTypes.bool.isRequired,
    }).isRequired,
    onSave: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  };

  _removeItem = () =>
    this.props.onRemove(this.props.item.id);

  _saveChange = (newText) =>
    this.props.onSave(new Item({
      id: this.props.item.id,
      text: newText,
    }));

  _toggleEditing = () => {
    this.props.onSave(new Item({
      id: this.props.item.id,
      text: this.props.item.text,
      isEdited: !this.props.item.isEdited,
    }));
  }

  render() {
    let item;
    if (this.props.item.isEdited) {
      item = (<EditItem
        index={this.props.index}
        item={this.props.item}
        onRemove={this._removeItem}
        onCancel={this._toggleEditing}
        onSave={this._saveChange}
      />);
    }
    else {
      item = (<ViewItem
        index={this.props.index}
        item={this.props.item}
        onClick={this._toggleEditing}
      />);
    }

    return (
      <li className="list-group-item">
        {item}
      </li>);
  }
}

export { ListItem };
